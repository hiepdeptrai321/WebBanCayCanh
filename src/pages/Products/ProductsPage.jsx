import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_BASE_URL, getAllProducts } from "../../services/productService";

// Import Helpers của bạn
import {
  applyProductFilters,
  buildCategoryMap,
  normalizeProducts,
} from "../../utils/productListingHelpers";

import ShopPageHeader from "../../components/products/ShopPageHeader";
import ProductsFilterSidebar from "../../components/products/ProductsFilterSidebar";
import ProductsToolbar from "../../components/products/ProductsToolbar";
import ProductsActiveFilters from "../../components/products/ProductsActiveFilters";
import ProductsGrid from "../../components/products/ProductsGrid";
import ProductsSkeleton from "../../components/products/ProductsSkeleton";
import ProductsEmptyState from "../../components/products/ProductsEmptyState";
import headerPlantImage from "../../assets/images/homeBackground.jpeg";



const ITEMS_PER_PAGE = 9;

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Dữ liệu gốc
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // States bộ lọc - Lấy trực tiếp từ URL SearchParams để đồng bộ với Trang Chủ
  const [sortValue, setSortValue] = useState(
    searchParams.get("sort") || "newest",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get("search") || "",
  );
  const [inStockOnly, setInStockOnly] = useState(
    searchParams.get("stock") === "true",
  );
  const [onSaleOnly, setOnSaleOnly] = useState(
    searchParams.get("sale") === "true",
  );

  const [priceBounds, setPriceBounds] = useState([0, 5000000]);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [currentPage, setCurrentPage] = useState(1);

  // --- BƯỚC QUAN TRỌNG: ĐỒNG BỘ TỪ KHÓA TỪ URL ---
  useEffect(() => {
    const keywordFromUrl = searchParams.get("search") || "";
    const categoryFromUrl = searchParams.get("category") || "all";

    // Cập nhật state để useMemo lọc lại sản phẩm
    setSearchKeyword(keywordFromUrl);
    setSelectedCategory(categoryFromUrl);

    // Nếu có tìm kiếm mới, luôn đưa về trang 1
    setCurrentPage(1);
  }, [searchParams]);

  // Load Data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [productResult, categoryResult] = await Promise.allSettled([
          getAllProducts({ featured: false, limit: 0 }),
          fetch(`${API_BASE_URL}/categories`),
        ]);

        if (productResult.status !== "fulfilled") throw productResult.reason;

        const normalized = normalizeProducts(productResult.value || []);
        setProducts(normalized);

        // Tính toán khoảng giá lớn nhất
        const highest =
          Math.ceil(
            Math.max(...normalized.map((i) => i.finalPrice || 0), 5000000) /
              50000,
          ) * 50000;
        setPriceBounds([0, highest]);
        setPriceRange([0, highest]);

        if (categoryResult.status === "fulfilled" && categoryResult.value.ok) {
          setCategories(await categoryResult.value.json());
        }
      } catch {
        setError("Không thể tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const categoryMap = useMemo(() => buildCategoryMap(categories), [categories]);

  // Hàm cập nhật URL
  const updateUrl = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (!value || value === "all") params.delete(key);
    else params.set(key, value);
    setSearchParams(params);
  };

  // --- LOGIC LỌC CHÍNH ---
  const filteredProducts = useMemo(() => {
    const result = applyProductFilters(products, {
      selectedCategory,
      priceRange,
      sortValue,
      searchKeyword,
      inStockOnly,
      onSaleOnly,
    });

    return result;
  }, [
    products,
    selectedCategory,
    priceRange,
    sortValue,
    searchKeyword,
    inStockOnly,
    onSaleOnly,
  ]);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);
  const hasActiveFilters =
    searchKeyword !== "" ||
    selectedCategory !== "all" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== priceBounds[1] ||
    inStockOnly ||
    onSaleOnly;

  return (
    <section className="min-h-screen bg-[#f7fbf6] pb-16 pt-10 sm:pt-12 lg:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ShopPageHeader
          title="Tất cả sản phẩm"
          subtitle="Khám phá bộ sưu tập cây cảnh phù hợp với mọi không gian sống."
          breadcrumbItems={[
            { label: "Trang chủ", to: "/" },
            { label: "Sản phẩm" },
          ]}
          decorativeImage={headerPlantImage}
          rightContent={
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0FA34A]/15 bg-white/80 px-3.5 py-2 text-sm font-semibold text-[#0F7F3A] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#0FA34A]" />
              {loading ? "Đang tải..." : `${products.length} sản phẩm`}
            </div>
          }
        />

        {error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {hasActiveFilters ? (
          <div className="mt-6">
            <ProductsActiveFilters
              searchKeyword={searchKeyword}
              onClearSearch={() => updateUrl("search", "")}
              categoryName={categoryMap[selectedCategory]?.name || ""}
              onClearCategory={() => updateUrl("category", "all")}
              priceRange={priceRange}
              onClearPrice={() => setPriceRange([0, priceBounds[1]])}
              inStockOnly={inStockOnly}
              onClearInStock={() => {
                setInStockOnly(false);
                searchParams.delete("stock");
                setSearchParams(searchParams);
              }}
              onSaleOnly={onSaleOnly}
              onClearOnSale={() => {
                setOnSaleOnly(false);
                searchParams.delete("sale");
                setSearchParams(searchParams);
              }}
              hasFilters={hasActiveFilters}
            />
          </div>
        ) : null}

        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <ProductsFilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(id) => updateUrl("category", id)}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </aside>

          <div className="space-y-6">
            <ProductsToolbar
              searchKeyword={searchKeyword}
              onSearchChange={(val) => updateUrl("search", val)}
              sortValue={sortValue}
              onSortChange={(val) => {
                setSortValue(val);
                updateUrl("sort", val);
              }}
              visibleCount={paginatedProducts.length}
              totalCount={filteredProducts.length}
            />

            {loading ? (
              <ProductsSkeleton />
            ) : filteredProducts.length > 0 ? (
              <>
                <ProductsGrid
                  products={paginatedProducts}
                  categoryMap={categoryMap}
                />
                {/* Thanh phân trang đơn giản */}
                <div className="mt-10 flex justify-center gap-2">
                  {Array.from(
                    {
                      length: Math.ceil(
                        filteredProducts.length / ITEMS_PER_PAGE,
                      ),
                    },
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg font-bold ${currentPage === i + 1 ? "bg-green-600 text-white" : "bg-white text-green-700 border"}`}
                      >
                        {i + 1}
                      </button>
                    ),
                  )}
                </div>
              </>
            ) : (
              <ProductsEmptyState onReset={() => setSearchParams({})} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductsPage;
