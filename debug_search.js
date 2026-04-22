// Script để debug tìm kiếm
// Chạy trong console DevTools để kiểm tra

const testProducts = [
  {
    name: "Sen đá mix chậu sứ",
    shortDescription: "Bộ sen đá nhỏ gọn, tối giản, hợp bàn làm việc.",
    categoryName: "",
  },
  {
    name: "Cây kim tiền",
    shortDescription: "Cây phong thủy dễ chăm, phù hợp văn phòng.",
    categoryName: "",
  },
];

const searchKeyword = "sen đá";
const normalizedSearch = searchKeyword.trim().toLowerCase();

console.log("🔍 Tìm kiếm:", normalizedSearch);
console.log("📦 Tổng sản phẩm:", testProducts.length);

const result = testProducts.filter((product) => {
  const name = String(product.name || "").toLowerCase();
  const categoryName = String(product.categoryName || "").toLowerCase();
  const shortDescription = String(product.shortDescription || "").toLowerCase();

  const matches =
    name.includes(normalizedSearch) ||
    categoryName.includes(normalizedSearch) ||
    shortDescription.includes(normalizedSearch);

  console.log(`
    Sản phẩm: ${product.name}
    - Name include: ${name.includes(normalizedSearch)}
    - Category include: ${categoryName.includes(normalizedSearch)}
    - Description include: ${shortDescription.includes(normalizedSearch)}
    - Match: ${matches}
  `);

  return matches;
});

console.log("✅ Kết quả:", result);
