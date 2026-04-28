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

const result = testProducts.filter((product) => {
  const name = String(product.name || "").toLowerCase();
  const categoryName = String(product.categoryName || "").toLowerCase();
  const shortDescription = String(product.shortDescription || "").toLowerCase();

  return (
    name.includes(normalizedSearch) ||
    categoryName.includes(normalizedSearch) ||
    shortDescription.includes(normalizedSearch)
  );
});

export default result;
