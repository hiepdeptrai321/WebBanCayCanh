import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../../services/productService";
import { formatCurrency } from "../../../utils/formatCurrency";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80";

function mapProductToCard(product) {
  const primaryImage = product?.images?.find((img) => img?.isPrimary)?.url;
  const firstImage = product?.images?.[0]?.url;
  const image = primaryImage || firstImage || product?.image || FALLBACK_IMAGE;
  const finalPrice = Number(product?.discountPrice ?? product?.price ?? 0);
  const originalPrice = product?.discountPrice ? Number(product?.price ?? 0) : null;

  return {
    id: product?._id,
    image,
    name: product?.name || "San pham",
    price: formatCurrency(finalPrice),
    originalPrice: originalPrice ? formatCurrency(originalPrice) : null,
  };
}

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const data = await getAllProducts({ featured: false, limit: 10 });
        const mappedProducts = Array.isArray(data) ? data.map(mapProductToCard).slice(0, 10) : [];
        setProducts(mappedProducts);
      } catch (err) {
        setError(err?.message || "Khong the tai san pham noi bat");
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerView));

  useEffect(() => {
    setActivePage((currentPage) => Math.min(currentPage, totalPages - 1));
  }, [totalPages]);

  function goPrev() {
    setActivePage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }

  function goNext() {
    setActivePage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-green-600 font-medium text-sm uppercase tracking-widest">
              Bán chạy nhất
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
              Sản phẩm nổi bật
            </h2>
            <div className="w-16 h-1 bg-green-500 rounded-full mt-4"></div>
          </div>
          <button className="text-green-600 hover:text-green-700 font-semibold text-sm border border-green-600 hover:bg-green-50 px-5 py-2.5 rounded-full transition-colors duration-300 shrink-0">
            Xem tất cả →
          </button>
        </div>

        {/* Carousel */}
        {isLoading ? (
          <p className="text-gray-500">Dang tai san pham...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">Chua co san pham noi bat.</p>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activePage * 100}%)` }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="px-3"
                    style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-start justify-between pt-25 px-1 sm:px-2">
              <button
                type="button"
                onClick={goPrev}
                className="pointer-events-auto -translate-x-3 w-13 h-13 rounded-full bg-green-700/80 hover:bg-green-800/80 transition-colors flex items-center justify-center shadow-lg"
                aria-label="Trang truoc"
              >
                <span className="w-0 h-0 border-y-[7px] border-y-transparent border-r-11 border-r-white -ml-0.5"></span>
              </button>
              <button
                type="button"
                onClick={goNext}
                className="pointer-events-auto translate-x-3 w-13 h-13 rounded-full bg-green-700/80 hover:bg-green-800/80 transition-colors flex items-center justify-center shadow-lg"
                aria-label="Trang sau"
              >
                <span className="w-0 h-0 border-y-[7px] border-y-transparent border-l-11 border-l-white -mr-0.5"></span>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  type="button"
                  onClick={() => setActivePage(pageIndex)}
                  className={`h-2.5 rounded-full transition-all ${
                    pageIndex === activePage ? "w-8 bg-green-600" : "w-2.5 bg-green-200"
                  }`}
                  aria-label={`Den trang ${pageIndex + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
