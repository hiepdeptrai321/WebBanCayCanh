import { useEffect, useMemo, useState } from "react";
import {
    API_BASE_URL,
    getAllProducts,
} from "../../services/productService";
import ProductsHero from "../../components/products/ProductsHero";
import ProductsFilterSidebar from "../../components/products/ProductsFilterSidebar";
import ProductsToolbar from "../../components/products/ProductsToolbar";
import ProductsStats from "../../components/products/ProductsStats";
import ProductsActiveFilters from "../../components/products/ProductsActiveFilters";
import ProductsGrid from "../../components/products/ProductsGrid";
import ProductsSkeleton from "../../components/products/ProductsSkeleton";
import ProductsEmptyState from "../../components/products/ProductsEmptyState";
import {
    applyProductFilters,
    buildCategoryMap,
    getProductStats,
    normalizeProducts,
} from "../../utils/productListingHelpers";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortValue, setSortValue] = useState("newest");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [priceRange, setPriceRange] = useState([0, 5000000]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [onSaleOnly, setOnSaleOnly] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const categoryMap = useMemo(() => buildCategoryMap(categories), [categories]);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const [productResult, categoryResult] = await Promise.allSettled([
                    getAllProducts({ featured: false, limit: 100 }),
                    fetch(`${API_BASE_URL}/categories`),
                ]);

                if (productResult.status !== "fulfilled") {
                    throw productResult.reason;
                }

                setProducts(normalizeProducts(productResult.value));

                if (categoryResult.status === "fulfilled" && categoryResult.value.ok) {
                    const categoryData = await categoryResult.value.json();
                    setCategories(Array.isArray(categoryData) ? categoryData : []);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                console.error(err);
                setError("Không thể tải dữ liệu sản phẩm. Hãy kiểm tra backend API ở cổng 5000.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const filteredProducts = useMemo(
        () =>
            applyProductFilters(products, {
                selectedCategory,
                priceRange,
                sortValue,
                searchKeyword,
                inStockOnly,
                onSaleOnly,
            }),
        [products, selectedCategory, priceRange, sortValue, searchKeyword, inStockOnly, onSaleOnly]
    );

    const stats = useMemo(() => getProductStats(products), [products]);
    const selectedCategoryName =
        selectedCategory !== "all"
            ? categoryMap[String(selectedCategory)] || "Danh mục đã chọn"
            : "";

    const hasFilters =
        selectedCategory !== "all" ||
        priceRange[0] !== 0 ||
        priceRange[1] !== 5000000 ||
        searchKeyword.trim() !== "" ||
        inStockOnly ||
        onSaleOnly;

    function clearAllFilters() {
        setSelectedCategory("all");
        setPriceRange([0, 5000000]);
        setSearchKeyword("");
        setInStockOnly(false);
        setOnSaleOnly(false);
        setSortValue("newest");
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50/50 text-gray-800">
            <ProductsHero />

            <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                {error ? (
                    <div className="rounded-[28px] border border-red-200 bg-red-50 px-5 py-4 text-red-700 shadow-sm">
                        {error}
                    </div>
                ) : null}

                <ProductsStats stats={stats} />

                <ProductsToolbar
                    searchKeyword={searchKeyword}
                    onSearchChange={setSearchKeyword}
                    sortValue={sortValue}
                    onSortChange={setSortValue}
                    visibleCount={filteredProducts.length}
                    totalCount={products.length}
                />

                <ProductsActiveFilters
                    categoryName={selectedCategoryName}
                    priceRange={priceRange}
                    inStockOnly={inStockOnly}
                    onSaleOnly={onSaleOnly}
                    searchKeyword={searchKeyword}
                    hasFilters={hasFilters}
                    onClearCategory={() => setSelectedCategory("all")}
                    onClearPrice={() => setPriceRange([0, 5000000])}
                    onClearInStock={() => setInStockOnly(false)}
                    onClearOnSale={() => setOnSaleOnly(false)}
                    onClearSearch={() => setSearchKeyword("")}
                />

                <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
                    <ProductsFilterSidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                        inStockOnly={inStockOnly}
                        onInStockChange={() => setInStockOnly((prev) => !prev)}
                        onSaleOnly={onSaleOnly}
                        onSaleChange={() => setOnSaleOnly((prev) => !prev)}
                        onClearFilters={clearAllFilters}
                    />

                    <section>
                        {loading ? (
                            <ProductsSkeleton />
                        ) : filteredProducts.length ? (
                            <ProductsGrid products={filteredProducts} categoryMap={categoryMap} />
                        ) : (
                            <ProductsEmptyState onReset={clearAllFilters} />
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default ProductsPage;
