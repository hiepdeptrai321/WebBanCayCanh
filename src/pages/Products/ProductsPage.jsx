import { useEffect, useMemo, useState } from "react";
import SidebarFilter from "../../components/products/SidebarFilter";
import ProductSort from "../../components/products/ProductSort";
import ProductGrid from "../../components/products/ProductGrid";
import { API_BASE_URL, getAllProducts } from "../../services/productService";

import TopPage from "../../components/products/TopPage.jsx";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortValue, setSortValue] = useState("newest");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedPrice, setSelectedPrice] = useState("all");
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
                setError("");

                const [productResult, categoryResult] = await Promise.allSettled([
                    getAllProducts({ featured: false, limit: 100 }),
                    fetch(`${API_BASE_URL}/categories`),
                ]);

                if (productResult.status !== "fulfilled") {
                    throw productResult.reason;
                }

                setProducts(productResult.value);

                if (categoryResult.status === "fulfilled" && categoryResult.value.ok) {
                    const categoryData = await categoryResult.value.json();
                    setCategories(categoryData);
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

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // Lọc theo phân loại
        if (selectedCategory !== "all") {
            result = result.filter(
                (product) => String(product.categoryId) === String(selectedCategory)
            );
        }

        // Lọc theo giá
        if (selectedPrice !== "all") {
            result = result.filter((product) => {
                const finalPrice =
                    product.discountPrice > 0 ? product.discountPrice : product.price;

                switch (selectedPrice) {
                    case "under-100k":
                        return finalPrice < 100000;
                    case "100k-500k":
                        return finalPrice >= 100000 && finalPrice <= 500000;
                    case "500k-2m":
                        return finalPrice > 500000 && finalPrice <= 2000000;
                    case "over-2m":
                        return finalPrice > 2000000;
                    default:
                        return true;
                }
            });
        }

        // Sắp xếp
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
    }, [products, selectedCategory, selectedPrice, sortValue]);

    if (loading) {
        return <p className="py-20 text-center">Đang tải sản phẩm...</p>;
    }

    if (error) {
        return <p className="py-20 text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-white">
        <TopPage/>

            <section className="mx-auto max-w-7xl px-4 py-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
                    <aside>
                        <SidebarFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            selectedPrice={selectedPrice}
                            onPriceChange={setSelectedPrice}
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