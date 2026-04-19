export function formatPrice(price) {
    if (typeof price !== "number" || Number.isNaN(price)) return "Liên hệ";
    return `${new Intl.NumberFormat("vi-VN").format(price)}đ`;
}

export function getProductImage(product) {
    const primaryImage = product?.images?.find((item) => item?.isPrimary)?.url;
    return primaryImage || product?.images?.[0]?.url || product?.image || "";
}

export function getProductImages(product) {
    const images = Array.isArray(product?.images) ? product.images : [];

    const normalized = images
        .map((item, index) => {
            if (typeof item === "string") {
                return {
                    url: item,
                    alt: `${product?.name || "product"}-${index}`,
                    isPrimary: index === 0,
                };
            }

            return {
                url: item?.url || item?.path || item?.src || "",
                alt: item?.alt || `${product?.name || "product"}-${index}`,
                isPrimary: Boolean(item?.isPrimary),
            };
        })
        .filter((item) => item.url);

    if (normalized.length > 0) return normalized;

    const fallback = getProductImage(product);
    return fallback
        ? [{ url: fallback, alt: product?.name || "product", isPrimary: true }]
        : [];
}

export function normalizeReviewAuthor(review) {
    return (
        review?.userName ||
        review?.user?.name ||
        review?.author ||
        review?.name ||
        "Khách hàng"
    );
}

export function normalizeReviewDate(review) {
    const raw = review?.createdAt || review?.updatedAt || review?.date;
    if (!raw) return "Chưa cập nhật";

    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return "Chưa cập nhật";

    return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
}

export function normalizeReviewRating(review) {
    const rating = Number(review?.rating || review?.stars || 0);
    if (Number.isNaN(rating)) return 0;
    return Math.max(0, Math.min(5, rating));
}

export function calculateFinalPrice(product) {
    if (!product) return 0;
    return product.discountPrice > 0 ? product.discountPrice : product.price;
}

export function hasValidDiscount(product) {
    if (!product) return false;

    return (
        typeof product.price === "number" &&
        typeof product.discountPrice === "number" &&
        product.discountPrice > 0 &&
        product.discountPrice < product.price
    );
}

export function calculateDiscountPercent(product) {
    if (!hasValidDiscount(product)) return 0;
    return Math.round(((product.price - product.discountPrice) / product.price) * 100);
}
