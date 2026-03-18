function ProductSort({ sortValue, onSortChange }) {
    const sortOptions = [
        { label: "Hàng mới về", value: "newest" },
        { label: "Hàng cũ nhất", value: "oldest" },
        { label: "Giá tăng dần", value: "price-asc" },
        { label: "Giá giảm dần", value: "price-desc" },
    ];

    return (
        <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-[#e5e9e2] pb-4">
            <span className="text-sm font-medium text-[#2f3e2f]">Ưu tiên xem:</span>

            {sortOptions.map((option) => (
                <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                >
                    <input
                        type="radio"
                        name="product-sort"
                        value={option.value}
                        checked={sortValue === option.value}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="h-4 w-4 accent-[#6b8f71]"
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
}

export default ProductSort;