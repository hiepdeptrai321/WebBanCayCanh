function SidebarFilter({
                           categories = [],
                           selectedCategory,
                           onCategoryChange,
                       }) {
    return (
        <div className="space-y-8 border-r border-[#edf1ea] pr-6">
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