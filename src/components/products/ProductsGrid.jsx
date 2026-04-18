import ProductCardPro from "./ProductCardPro";

function ProductsGrid({ products = [], categoryMap = {} }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCardPro
          key={product._id}
          product={product}
          categoryName={categoryMap[String(product.categoryId)] || product.categoryName || "Cây cảnh"}
        />
      ))}
    </div>
  );
}

export default ProductsGrid;
