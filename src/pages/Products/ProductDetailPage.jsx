import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { API_BASE_URL, getAllProducts, getProductById, getReviewsByProduct } from "../../services/productService";
import { useCart } from "../../context/CartContext";

import TopDetailPage from "../../components/products/TopDetailPage";
import ProductBreadcrumbs from "../../components/products/detail/ProductBreadcrumbs";
import ProductDetailSkeleton from "../../components/products/detail/ProductDetailSkeleton";
import ProductDetailTabs from "../../components/products/detail/ProductDetailTabs";
import ProductHighlights from "../../components/products/detail/ProductHighlights";
import ProductImageGallery from "../../components/products/detail/ProductImageGallery";
import ProductInfoPanel from "../../components/products/detail/ProductInfoPanel";
import RelatedProducts from "../../components/products/detail/RelatedProducts";

import {
    calculateDiscountPercent,
    calculateFinalPrice,
    getProductImage,
    getProductImages,
    hasValidDiscount,
    normalizeReviewRating,
} from "../../utils/productDetailHelpers";

function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const images = useMemo(() => getProductImages(product), [product]);

    const categoryName = useMemo(() => {
        if (!product) return "Cây cảnh";
        if (product.categoryName) return product.categoryName;

        const found = categories.find(
            (category) => String(category?._id) === String(product?.categoryId)
        );

        return found?.name || "Cây cảnh";
    }, [product, categories]);

    const finalPrice = useMemo(() => calculateFinalPrice(product), [product]);
    const hasDiscount = useMemo(() => hasValidDiscount(product), [product]);
    const discountPercent = useMemo(() => calculateDiscountPercent(product), [product]);

    const stockQuantity = Number(product?.stockQuantity ?? 0);
    const isInStock = stockQuantity > 0;

    const specs = useMemo(() => {
        if (!product) return [];

        const baseSpecs = [
            { label: "Danh mục", value: categoryName },
            { label: "Mã sản phẩm", value: product.sku || product._id || "Đang cập nhật" },
            { label: "Tình trạng", value: isInStock ? "Còn hàng" : "Tạm hết hàng" },
            { label: "Số lượng tồn", value: isInStock ? `${stockQuantity} sản phẩm` : "Hết hàng" },
            {
                label: "Kích thước chậu",
                value: product?.dimensions?.potSizeCm ? `${product.dimensions.potSizeCm} cm` : "Đang cập nhật",
            },
            {
                label: "Chiều cao",
                value: product?.dimensions?.heightCm ? `${product.dimensions.heightCm} cm` : "Đang cập nhật",
            },
            { label: "Ánh sáng", value: product?.careInfo?.lightRequirement || "Đang cập nhật" },
            { label: "Nước", value: product?.careInfo?.waterRequirement || "Đang cập nhật" },
            { label: "Độ ẩm", value: product?.careInfo?.humidityRequirement || "Đang cập nhật" },
            { label: "Độ khó chăm", value: product?.careInfo?.difficultyLevel || "Đang cập nhật" },
        ];

        return baseSpecs.filter((item) => item.value);
    }, [product, categoryName, isInStock, stockQuantity]);

    const averageRating = useMemo(() => {
        if (!reviews.length) return 0;
        const total = reviews.reduce((sum, review) => sum + normalizeReviewRating(review), 0);
        return total / reviews.length;
    }, [reviews]);

    useEffect(() => {
        if (!images.length) {
            setSelectedImage("");
            return;
        }

        const primary = images.find((item) => item.isPrimary)?.url || images[0]?.url || "";
        setSelectedImage(primary);
    }, [images]);

    useEffect(() => {
        setQuantity(1);
        setActiveTab("description");
    }, [id]);

    useEffect(() => {
        async function loadDetail() {
            try {
                setLoading(true);
                setError("");

                const [productData, categoryResponse, reviewData, allProducts] = await Promise.all([
                    getProductById(id),
                    fetch(`${API_BASE_URL}/categories`),
                    getReviewsByProduct(id).catch(() => []),
                    getAllProducts().catch(() => []),
                ]);

                setProduct(productData);

                if (!categoryResponse.ok) {
                    throw new Error("Không thể tải danh mục");
                }

                const categoryData = await categoryResponse.json();
                setCategories(Array.isArray(categoryData) ? categoryData : []);
                setReviews(Array.isArray(reviewData) ? reviewData : []);

                const related = Array.isArray(allProducts)
                    ? allProducts
                        .filter((item) => String(item?._id) !== String(productData?._id))
                        .filter((item) => String(item?.categoryId) === String(productData?.categoryId))
                        .slice(0, 4)
                    : [];

                setRelatedProducts(related);
            } catch (err) {
                console.error(err);
                setError("Không thể tải chi tiết sản phẩm.");
            } finally {
                setLoading(false);
            }
        }

        loadDetail();
    }, [id]);

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => {
            const max = isInStock ? stockQuantity : 1;
            return Math.min(max || 1, prev + 1);
        });
    };

    const handleAddToCart = () => {
        if (!product || !isInStock) return;

        const image = selectedImage || getProductImage(product);

        addToCart(
            {
                _id: product._id,
                name: product.name,
                price: finalPrice,
                image,
            },
            quantity
        );

        alert(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`);
    };

    if (loading) {
        return <ProductDetailSkeleton />;
    }

    if (error) {
        return (
            <div className="bg-[#f7f8f4]">
                <TopDetailPage />
                <section className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6 lg:px-8">
                    <div className="mx-auto max-w-xl rounded-[28px] border border-red-100 bg-white p-10 shadow-sm">
                        <p className="text-lg font-semibold text-red-500">{error}</p>
                        <p className="mt-3 text-gray-500">Vui lòng thử lại sau hoặc kiểm tra lại đường dẫn sản phẩm.</p>
                        <Link
                            to="/products"
                            className="mt-6 inline-flex rounded-full bg-[#0f5132] px-6 py-3 font-medium text-white transition hover:bg-[#0b3d26]"
                        >
                            Quay lại trang sản phẩm
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="bg-[#f7f8f4]">
                <TopDetailPage />
                <section className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6 lg:px-8">
                    <div className="mx-auto max-w-xl rounded-[28px] bg-white p-10 shadow-sm">
                        <p className="text-lg font-semibold text-[#163020]">Không tìm thấy sản phẩm.</p>
                        <Link
                            to="/products"
                            className="mt-6 inline-flex rounded-full bg-[#0f5132] px-6 py-3 font-medium text-white transition hover:bg-[#0b3d26]"
                        >
                            Xem các sản phẩm khác
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="bg-[#f7f8f4] text-[#1d2a1f]">
            <TopDetailPage />

            <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
                <ProductBreadcrumbs productName={product.name} />

                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <ProductImageGallery
                        product={product}
                        images={images}
                        selectedImage={selectedImage}
                        onSelectImage={setSelectedImage}
                        hasDiscount={hasDiscount}
                        discountPercent={discountPercent}
                        isInStock={isInStock}
                    />

                    <div className="space-y-6">
                        <ProductInfoPanel
                            product={product}
                            categoryName={categoryName}
                            averageRating={averageRating}
                            reviewsCount={reviews.length}
                            finalPrice={finalPrice}
                            hasDiscount={hasDiscount}
                            isInStock={isInStock}
                            quantity={quantity}
                            stockQuantity={stockQuantity}
                            onDecrease={handleDecreaseQuantity}
                            onIncrease={handleIncreaseQuantity}
                            onAddToCart={handleAddToCart}
                        />

                        <ProductHighlights specs={specs} />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-8 md:px-6 lg:px-8">
                <ProductDetailTabs
                    product={product}
                    specs={specs}
                    reviews={reviews}
                    averageRating={averageRating}
                    activeTab={activeTab}
                    onChangeTab={setActiveTab}
                />
            </section>

            <RelatedProducts relatedProducts={relatedProducts} fallbackCategoryName={categoryName} />
        </div>
    );
}

export default ProductDetailPage;
