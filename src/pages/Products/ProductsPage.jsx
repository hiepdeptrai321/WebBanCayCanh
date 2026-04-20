import { useEffect, useMemo, useState } from "react";
import {
    API_BASE_URL,
    getAllProducts,
} from "../../services/productService";

import TopPage from "../../components/products/TopPage"
import ProductsFilterSidebar from "../../components/products/ProductsFilterSidebar";
import ProductsToolbar from "../../components/products/ProductsToolbar";
import ProductsActiveFilters from "../../components/products/ProductsActiveFilters";
import ProductsGrid from "../../components/products/ProductsGrid";
import ProductsSkeleton from "../../components/products/ProductsSkeleton";
import ProductsEmptyState from "../../components/products/ProductsEmptyState";

import {
    applyProductFilters,
    buildCategoryMap,
    normalizeProducts,
} from "../../utils/productListingHelpers";

const ITEMS_PER_PAGE = 9;

function roundUpPrice(value) {
    if (!value || value <= 0) return 5000000;
    const step = 50000;
    return Math.ceil(value / step) * step;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
    }

    return (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-xl border border-green-200 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Trước
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        currentPage === page
                            ? "bg-green-600 text-white shadow"
                            : "border border-green-200 text-green-700 hover:bg-green-50"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-xl border border-green-200 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Sau
            </button>
        </div>
    );
}

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortValue, setSortValue] = useState("newest");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [onSaleOnly, setOnSaleOnly] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [priceBounds, setPriceBounds] = useState([0, 5000000]);
    const [priceRange, setPriceRange] = useState([0, 5000000]);

    const [currentPage, setCurrentPage] = useState(1);

    const categoryMap = useMemo(() => buildCategoryMap(categories), [categories]);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const [productResult, categoryResult] = await Promise.allSettled([
                    getAllProducts({ featured: false, limit: 0 }),
                    fetch(`${API_BASE_URL}/categories`),
                ]);

                if (productResult.status !== "fulfilled") {
                    throw productResult.reason;
                }

                const normalized = normalizeProducts(productResult.value || []);
                setProducts(normalized);

                const highestPrice = roundUpPrice(
                    Math.max(...normalized.map((item) => Number(item.finalPrice || 0)), 0)
                );

                setPriceBounds([0, highestPrice]);
                setPriceRange([0, highestPrice]);

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

    const filteredProducts = useMemo(() => {
        return applyProductFilters(products, {
            selectedCategory,
            priceRange,
            sortValue,
            searchKeyword,
            inStockOnly,
            onSaleOnly,
        });
    }, [
        products,
        selectedCategory,
        priceRange,
        sortValue,
        searchKeyword,
        inStockOnly,
        onSaleOnly,
    ]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, priceRange, searchKeyword, inStockOnly, onSaleOnly, sortValue]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const selectedCategoryName =
        selectedCategory !== "all"
            ? categoryMap[String(selectedCategory)] || "Danh mục đã chọn"
            : "";

    const hasFilters =
        selectedCategory !== "all" ||
        priceRange[0] !== priceBounds[0] ||
        priceRange[1] !== priceBounds[1] ||
        searchKeyword.trim() !== "" ||
        inStockOnly ||
        onSaleOnly;

    function clearAllFilters() {
        setSelectedCategory("all");
        setPriceRange(priceBounds);
        setSearchKeyword("");
        setInStockOnly(false);
        setOnSaleOnly(false);
        setSortValue("newest");
        setCurrentPage(1);
    }

    return (
        <section className="bg-[#f7fbf6] pb-16">
            <TopPage/>
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                {error ? (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}


                <ProductsActiveFilters
                    categoryName={selectedCategoryName}
                    priceRange={priceRange}
                    inStockOnly={inStockOnly}
                    onSaleOnly={onSaleOnly}
                    searchKeyword={searchKeyword}
                    hasFilters={hasFilters}
                    onClearCategory={() => setSelectedCategory("all")}
                    onClearPrice={() => setPriceRange(priceBounds)}
                    onClearInStock={() => setInStockOnly(false)}
                    onClearOnSale={() => setOnSaleOnly(false)}
                    onClearSearch={() => setSearchKeyword("")}
                />

                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <aside>
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
                    </aside>

                    <div>
                        <ProductsToolbar
                            searchKeyword={searchKeyword}
                            onSearchChange={setSearchKeyword}
                            sortValue={sortValue}
                            onSortChange={setSortValue}
                            visibleCount={paginatedProducts.length}
                            totalCount={filteredProducts.length}
                        />

                        {!loading && filteredProducts.length > 0 ? (
                            <div className="mb-4 mt-4 text-sm text-gray-600">
                                Trang <span className="font-semibold">{currentPage}</span> /{" "}
                                <span className="font-semibold">{totalPages}</span>
                            </div>
                        ) : null}

                        {loading ? (
                            <ProductsSkeleton />
                        ) : filteredProducts.length ? (
                            <>
                                <ProductsGrid
                                    products={paginatedProducts}
                                    categoryMap={categoryMap}
                                />

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        ) : (
                            <ProductsEmptyState onReset={clearAllFilters} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductsPage;