export const SORT_OPTIONS = [
    { label: "Mới nhất", value: "newest" },
    { label: "Cũ nhất", value: "oldest" },
    { label: "Giá tăng dần", value: "price-asc" },
    { label: "Giá giảm dần", value: "price-desc" },
    { label: "Tên A-Z", value: "name-asc" },
    { label: "Tên Z-A", value: "name-desc" },
    { label: "Ưu đãi tốt nhất", value: "discount-desc" },
];

export function formatPrice(price) {
    if (typeof price !== "number" || Number.isNaN(price)) return "Liên hệ";
    return `${new Intl.NumberFormat("vi-VN").format(price)}đ`;
}

export function getProductImage(product) {
    if (!product) return "";
    return (
        product.images?.find((img) => img?.isPrimary)?.url ||
        product.images?.[0]?.url ||
        product.image ||
        ""
    );
}

export function getFinalPrice(product) {
    if (!product) return 0;
    return product.discountPrice > 0 ? product.discountPrice : product.price || 0;
}

export function getDiscountPercent(product) {
    const { price = 0, discountPrice = 0 } = product || {};
    if (!(discountPrice > 0 && price > discountPrice)) return 0;
    return Math.round(((price - discountPrice) / price) * 100);
}

export function normalizeProducts(products = []) {
    return products.map((product) => ({
        ...product,
        _id: String(product._id || ""),
        categoryId: String(product.categoryId || ""),
        finalPrice: getFinalPrice(product),
        imageUrl: getProductImage(product),
        discountPercent: getDiscountPercent(product),
        stockQuantity: Number(product.stockQuantity ?? 0),
    }));
}

export function applyProductFilters(products, filters) {
    let result = [...products];
    const {
        selectedCategory = "all",
        priceRange = [0, 5000000],
        sortValue = "newest",
        searchKeyword = "",
        inStockOnly = false,
        onSaleOnly = false,
    } = filters;

    if (selectedCategory !== "all") {
        result = result.filter(
            (product) => String(product.categoryId) === String(selectedCategory)
        );
    }

    result = result.filter((product) => {
        const finalPrice = product.finalPrice ?? getFinalPrice(product);
        return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });

    const normalizedSearch = searchKeyword.trim().toLowerCase();
    if (normalizedSearch) {
        result = result.filter((product) => {
            const categoryName = String(product.categoryName || "").toLowerCase();
            const shortDescription = String(product.shortDescription || "").toLowerCase();
            const name = String(product.name || "").toLowerCase();
            return (
                name.includes(normalizedSearch) ||
                categoryName.includes(normalizedSearch) ||
                shortDescription.includes(normalizedSearch)
            );
        });
    }

    if (inStockOnly) {
        result = result.filter((product) => Number(product.stockQuantity || 0) > 0);
    }

    if (onSaleOnly) {
        result = result.filter((product) => Number(product.discountPercent || 0) > 0);
    }

    switch (sortValue) {
        case "oldest":
            result.sort(
                (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
            );
            break;
        case "price-asc":
            result.sort((a, b) => (a.finalPrice || 0) - (b.finalPrice || 0));
            break;
        case "price-desc":
            result.sort((a, b) => (b.finalPrice || 0) - (a.finalPrice || 0));
            break;
        case "name-asc":
            result.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "vi"));
            break;
        case "name-desc":
            result.sort((a, b) => String(b.name || "").localeCompare(String(a.name || ""), "vi"));
            break;
        case "discount-desc":
            result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
            break;
        case "newest":
        default:
            result.sort(
                (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            );
            break;
    }

    return result;
}

export function buildCategoryMap(categories = []) {
    return categories.reduce((acc, category) => {
        acc[String(category._id)] = category.name;
        return acc;
    }, {});
}

export function getProductStats(products = []) {
    const total = products.length;
    const inStock = products.filter((item) => Number(item.stockQuantity || 0) > 0).length;
    const onSale = products.filter((item) => Number(item.discountPercent || 0) > 0).length;
    return { total, inStock, onSale };
}
