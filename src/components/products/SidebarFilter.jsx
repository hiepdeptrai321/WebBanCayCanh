function SidebarFilter({
                           categories = [],
                           selectedCategory,
                           onCategoryChange,
                           selectedPrice,
                           onPriceChange,
                       }) {
    const priceOptions = [
        { label: "Giá dưới 100.000đ", value: "under-100k" },
        { label: "100.000đ - 500.000đ", value: "100k-500k" },
        { label: "500.000đ - 2.000.000đ", value: "500k-2m" },
        { label: "Giá trên 2.000.000đ", value: "over-2m" },
    ];

    return (
        <div className="space-y-8 border-r border-[#edf1ea] pr-6">
            {/* Khoảng giá */}
            <div>
                <h3 className="mb-3 text-lg font-semibold text-[#2f3e2f]">
                    Khoảng giá
                </h3>

                <div className="space-y-3 text-sm text-gray-700">
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            type="radio"
                            name="price"
                            checked={selectedPrice === "all"}
                            onChange={() => onPriceChange("all")}
                        />
                        Tất cả
                    </label>

                    {priceOptions.map((option) => (
                        <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-2"
                        >
                            <input
                                type="radio"
                                name="price"
                                checked={selectedPrice === option.value}
                                onChange={() => onPriceChange(option.value)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            </div>

            {/* Phân loại */}
            <div>
                <h3 className="mb-3 text-lg font-semibold text-[#2f3e2f]">
                    Phân loại
                </h3>

                <div className="space-y-3 text-sm text-gray-700">
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === "all"}
                            onChange={() => onCategoryChange("all")}
                        />
                        Tất cả
                    </label>

                    {categories.map((category) => (
                        <label
                            key={category._id}
                            className="flex cursor-pointer items-center gap-2"
                        >
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === category._id}
                                onChange={() => onCategoryChange(category._id)}
                            />
                            {category.name}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SidebarFilter;