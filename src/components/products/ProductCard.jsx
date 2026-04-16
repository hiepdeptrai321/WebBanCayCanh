import { Link } from "react-router-dom";

function formatPrice(price) {
    if (typeof price !== "number") return "Liên hệ";
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

function ProductCard({ product, categoryMap = {} }) {
    const primaryImage =
        product.images?.find((img) => img.isPrimary)?.url ||
        product.images?.[0]?.url ||
        "";

    const finalPrice =
        product.discountPrice > 0 ? product.discountPrice : product.price;

    const hasDiscount =
        typeof product.discountPrice === "number" &&
        product.discountPrice > 0 &&
        product.discountPrice < product.price;

    const discountPercent = hasDiscount
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;

    const categoryName = categoryMap[String(product.categoryId)] || "Cây cảnh";
    const isOutOfStock = product.stockQuantity <= 0;

    return (
        <div className="group overflow-hidden rounded-2xl border border-[#e7ece3] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Link to={`/products/${product._id}`} className="block">
                <div className="relative overflow-hidden bg-[#f6f8f4]">
                    <img
                        src={primaryImage}
                        alt={product.name}
                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-3 top-3 flex flex-col gap-2">
                        {hasDiscount && (
                            <span className="rounded-full bg-[#6b8f71] px-3 py-1 text-xs font-medium text-white">
                -{discountPercent}%
              </span>
                        )}

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                isOutOfStock
                                    ? "bg-red-100 text-red-600"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >
              {isOutOfStock ? "Hết hàng" : "Còn hàng"}
            </span>
                    </div>
                </div>
            </Link>

            <div className="space-y-3 p-4">
                <p className="text-sm text-[#6b8f71]">{categoryName}</p>

                <h3 className="min-h-[56px] text-lg font-semibold leading-7 text-[#2f3e2f]">
                    {product.name}
                </h3>

                <p className="min-h-[40px] text-sm leading-6 text-gray-500">
                    {product.shortDescription}
                </p>

                <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-[#2f3e2f]">
            {formatPrice(finalPrice)}
          </span>

                    {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
                    )}
                </div>

                <Link
                    to={`/products/${product._id}`}
                    className="block w-full rounded-xl border border-[#6b8f71] px-4 py-2.5 text-center text-sm font-medium text-[#6b8f71] transition hover:bg-[#6b8f71] hover:text-white"
                >
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;