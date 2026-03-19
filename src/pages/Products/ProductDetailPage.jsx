import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGallery from "../../components/products/ProductGallery";
import ProductInfo from "../../components/products/ProductInfo";
import ProductDescription from "../../components/products/ProductDescription";
import ReviewList from "../../components/products/ReviewList";
import { getProductById } from "../../services/productService";
import TopPage from "../../components/products/TopPage.jsx";
import TopDetailPage from "../../components/products/TopDetailPage.jsx";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const categoryName = useMemo(() => {
        if (!product || !categories.length) return "Cây cảnh";

        const found = categories.find(
            (category) => String(category._id) === String(product.categoryId)
        );

        return found?.name || "Cây cảnh";
    }, [product, categories]);

    useEffect(() => {
        async function loadDetail() {
            try {
                setLoading(true);

                // 1. Lấy sản phẩm trước
                const productData = await getProductById(id);
                setProduct(productData);

                // 2. Lấy category
                const categoryResponse = await fetch(`${API_BASE_URL}/categories`);

                if (!categoryResponse.ok) {
                    throw new Error("Khong the tai danh muc");
                }

                const categoryData = await categoryResponse.json();
                setCategories(categoryData);

                // 3. Tạm thời chưa gọi reviews thật
                setReviews([]);
            } catch (err) {
                console.error(err);
                setError("Không thể tải chi tiết sản phẩm");
            } finally {
                setLoading(false);
            }
        }

        loadDetail();
    }, [id]);

    if (loading) {
        return <p className="py-20 text-center">Đang tải chi tiết sản phẩm...</p>;
    }

    if (error) {
        return <p className="py-20 text-center text-red-500">{error}</p>;
    }

    if (!product) {
        return <p className="py-20 text-center">Không tìm thấy sản phẩm.</p>;
    }

    return (
        <div className="bg-[#fafafa]">
            <TopDetailPage/>
            <section className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    <ProductGallery product={product} />

                    <ProductInfo
                        product={product}
                        categoryName={categoryName}
                    />
                </div>

                <ProductDescription product={product} />
                <ReviewList reviews={reviews} />
            </section>
        </div>
    );
}

export default ProductDetailPage;