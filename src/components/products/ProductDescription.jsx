function ProductDescription({ product }) {
    return (
        <div className="mt-14 border-t border-[#e5ebe1] pt-10">
            <h2 className="mb-8 text-5xl font-bold text-[#0f172a]">Thông tin</h2>

            <div className="border-t border-[#e5ebe1] pt-6">
                <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#00b386]">
                    Giới thiệu sản phẩm
                </p>

                <p className="leading-8 text-gray-700">
                    {product.description || "Thông tin sản phẩm đang được cập nhật."}
                </p>
            </div>

            {product.attributes?.length > 0 && (
                <div className="mt-8">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#00b386]">
                        Thuộc tính
                    </p>

                    <ul className="space-y-2 text-gray-700">
                        {product.attributes.map((item, index) => (
                            <li key={index}>
                                <strong>{item.name}:</strong> {item.value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ProductDescription;