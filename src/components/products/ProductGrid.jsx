import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products = [], categoryMap = {} }) {
    if (!products.length) {
        return (
            <div className="rounded-2xl border border-dashed border-[#d8dfd3] bg-white px-6 py-14 text-center">
                <p className="text-lg font-medium text-[#2f3e2f]">
                    Không tìm thấy sản phẩm phù hợp
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    Hãy thử thay đổi bộ lọc hoặc cách sắp xếp.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    categoryMap={categoryMap}
                />
            ))}
        </div>
    );
}

export default ProductGrid;