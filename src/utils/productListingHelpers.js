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
  // Ưu tiên dùng discountPrice nếu có, không thì dùng price
  return product.discountPrice > 0 ? product.discountPrice : product.price || 0;
}

export function getDiscountPercent(product) {
  const { price = 0, discountPrice = 0 } = product || {};
  if (!(discountPrice > 0 && price > discountPrice)) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
}

/**
 * Chuẩn hóa dữ liệu từ API để phù hợp với Logic Frontend
 * Xử lý trường hợp categoryId là Object và tính toán sẵn giá cuối cùng
 */
export function normalizeProducts(products = []) {
  return products.map((product) => {
    // Xử lý categoryId (nếu là object thì lấy _id hoặc $oid, nếu là string thì giữ nguyên)
    let catId = "";
    if (product.categoryId) {
      if (typeof product.categoryId === "object") {
        // Nếu có _id thì lấy _id, không thì lấy $oid (từ MongoDB export)
        catId = product.categoryId._id || product.categoryId.$oid || "";
      } else {
        catId = product.categoryId;
      }
    }

    // Lấy tên danh mục để phục vụ tìm kiếm
    const catName =
      product.categoryId && typeof product.categoryId === "object"
        ? product.categoryId.name || ""
        : "";

    return {
      ...product,
      _id: String(product._id?.$oid || product._id || ""),
      categoryId: String(catId || ""),
      categoryName: String(catName || ""), // Lưu tên danh mục vào một trường phẳng
      finalPrice: getFinalPrice(product),
      imageUrl: getProductImage(product),
      discountPercent: getDiscountPercent(product),
      stockQuantity: Number(product.stockQuantity ?? 0),
    };
  });
}

/**
 * Hàm lọc sản phẩm chính
 */
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

  // 1. Lọc theo danh mục
  if (selectedCategory !== "all") {
    result = result.filter(
      (product) => String(product.categoryId) === String(selectedCategory),
    );
  }

  // 2. Lọc theo khoảng giá (Dựa trên finalPrice đã tính ở normalize)
  result = result.filter((product) => {
    const price = product.finalPrice ?? getFinalPrice(product);
    return price >= priceRange[0] && price <= priceRange[1];
  });

  // 3. Lọc theo từ khóa tìm kiếm (Tên, Danh mục, Mô tả ngắn)
  const normalizedSearch = searchKeyword.trim().toLowerCase();
  if (normalizedSearch) {
    console.log(
      `🔎 Trước khi lọc từ khóa "${searchKeyword}":`,
      result.length,
      "sản phẩm",
    );
    console.log(
      "📝 Ví dụ sản phẩm:",
      result
        .slice(0, 3)
        .map((p) => ({ name: p.name, desc: p.shortDescription })),
    );

    result = result.filter((product) => {
      const name = String(product.name || "").toLowerCase();
      const categoryName = String(product.categoryName || "").toLowerCase();
      const shortDescription = String(
        product.shortDescription || "",
      ).toLowerCase();

      return (
        name.includes(normalizedSearch) ||
        categoryName.includes(normalizedSearch) ||
        shortDescription.includes(normalizedSearch)
      );
    });

    console.log(`✅ Sau khi lọc từ khóa:`, result.length, "sản phẩm");
  }

  // 4. Lọc trạng thái kho hàng
  if (inStockOnly) {
    result = result.filter((product) => Number(product.stockQuantity || 0) > 0);
  }

  // 5. Lọc sản phẩm đang giảm giá
  if (onSaleOnly) {
    result = result.filter(
      (product) => Number(product.discountPercent || 0) > 0,
    );
  }

  // 6. Sắp xếp dữ liệu
  switch (sortValue) {
    case "oldest":
      result.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
      );
      break;
    case "price-asc":
      result.sort((a, b) => (a.finalPrice || 0) - (b.finalPrice || 0));
      break;
    case "price-desc":
      result.sort((a, b) => (b.finalPrice || 0) - (a.finalPrice || 0));
      break;
    case "name-asc":
      result.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""), "vi"),
      );
      break;
    case "name-desc":
      result.sort((a, b) =>
        String(b.name || "").localeCompare(String(a.name || ""), "vi"),
      );
      break;
    case "discount-desc":
      result.sort(
        (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0),
      );
      break;
    case "newest":
    default:
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
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
  const inStock = products.filter(
    (item) => Number(item.stockQuantity || 0) > 0,
  ).length;
  const onSale = products.filter(
    (item) => Number(item.discountPercent || 0) > 0,
  ).length;
  return { total, inStock, onSale };
}
