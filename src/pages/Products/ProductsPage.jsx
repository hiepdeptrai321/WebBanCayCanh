import { useEffect, useMemo, useState } from "react";
import SidebarFilter from "../../components/products/SidebarFilter";
import ProductSort from "../../components/products/ProductSort";
import ProductGrid from "../../components/products/ProductGrid";
import { getAllProducts } from "../../services/productService";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortValue, setSortValue] = useState("newest");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const categoryMap = useMemo(() => {
        const map = {};
        categories.forEach((category) => {
            map[String(category._id)] = category.name;
        });
        return map;
    }, [categories]);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const [productData, categoryResponse] = await Promise.all([
                    getAllProducts({ featured: false, limit: 100 }),
                    fetch(`${API_BASE_URL}/categories`),
                ]);

                if (!categoryResponse.ok) {
                    throw new Error("Khong the tai danh muc");
                }

                const categoryData = await categoryResponse.json();

                setProducts(productData);
                setCategories(categoryData);
            } catch (err) {
                console.error(err);
                setError("Không thể tải dữ liệu sản phẩm");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== "all") {
            result = result.filter(
                (product) => String(product.categoryId) === String(selectedCategory)
            );
        }

        switch (sortValue) {
            case "oldest":
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;

            case "price-asc":
                result.sort((a, b) => {
                    const priceA = a.discountPrice > 0 ? a.discountPrice : a.price;
                    const priceB = b.discountPrice > 0 ? b.discountPrice : b.price;
                    return priceA - priceB;
                });
                break;

            case "price-desc":
                result.sort((a, b) => {
                    const priceA = a.discountPrice > 0 ? a.discountPrice : a.price;
                    const priceB = b.discountPrice > 0 ? b.discountPrice : b.price;
                    return priceB - priceA;
                });
                break;

            case "newest":
            default:
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }

        return result;
    }, [products, selectedCategory, sortValue]);

    if (loading) {
        return <p className="py-20 text-center">Đang tải sản phẩm...</p>;
    }

    if (error) {
        return <p className="py-20 text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-white">
            <section className="relative h-[220px] overflow-hidden bg-[#f4f7f1]">
                <img
                    src="https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=1600&q=80"
                    alt="Banner sản phẩm"
                    className="h-full w-full object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4">
                    <div className="mb-3 flex items-center gap-2 text-sm text-white/90">
                        <span>Trang chủ</span>
                        <span>›</span>
                        <span>Tất cả sản phẩm</span>
                    </div>

                    <h1 className="text-4xl font-bold text-white md:text-5xl">
                        Tất cả sản phẩm
                    </h1>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
                    <aside>
                        <SidebarFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />
                    </aside>

                    <div>
                        <ProductSort
                            sortValue={sortValue}
                            onSortChange={setSortValue}
                        />

                        <ProductGrid
                            products={filteredAndSortedProducts}
                            categoryMap={categoryMap}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductsPage;