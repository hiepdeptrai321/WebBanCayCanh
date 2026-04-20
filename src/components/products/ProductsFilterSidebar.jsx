import PriceRangeSlider from "./PriceRangeSlider";

function FilterSection({ title, children }) {
  return (
    <section className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
        {title}
      </h3>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function RadioOption({ checked, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm transition ${
        checked
          ? "border-green-600 bg-green-50 text-green-800 shadow-sm"
          : "border-green-100 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50/50"
      }`}
    >
      <span>{label}</span>
      <span
        className={`h-4 w-4 rounded-full border ${
          checked ? "border-green-600 bg-green-600" : "border-green-200 bg-white"
        }`}
      />
    </button>
  );
}

function ToggleOption({ checked, label, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-green-100 px-3 py-3 text-sm text-gray-700 transition hover:bg-green-50/50">
      <span>{label}</span>
      <span className="relative inline-flex items-center">
        <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
        <span className="h-6 w-11 rounded-full bg-green-100 transition peer-checked:bg-green-600" />
        <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

function ProductsFilterSidebar({
  categories = [],
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  inStockOnly,
  onInStockChange,
  onSaleOnly,
  onSaleChange,
  onClearFilters,
}) {
  return (
    <aside className="space-y-4">
      <div className="flex items-center justify-between rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 to-white px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-green-800">Bộ lọc sản phẩm</p>
          <p className="mt-1 text-xs text-gray-500">Tinh chỉnh nhanh theo nhu cầu của bạn</p>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className=" text-sm font-medium text-green-600 transition hover:text-green-700"
        >
          Đặt lại
        </button>
      </div>

      <FilterSection title="Khoảng giá">
        <PriceRangeSlider value={priceRange} onChange={onPriceChange} />
      </FilterSection>

      <FilterSection title="Danh mục">
        <RadioOption
          checked={selectedCategory === "all"}
          label="Tất cả danh mục"
          onClick={() => onCategoryChange("all")}
        />
        {categories.map((category) => (
          <RadioOption
            key={category._id}
            checked={String(selectedCategory) === String(category._id)}
            label={category.name}
            onClick={() => onCategoryChange(category._id)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Ưu tiên hiển thị">
        <ToggleOption
          checked={inStockOnly}
          onChange={onInStockChange}
          label="Chỉ hiện sản phẩm còn hàng"
        />
        <ToggleOption
          checked={onSaleOnly}
          onChange={onSaleChange}
          label="Chỉ hiện sản phẩm đang giảm giá"
        />
      </FilterSection>
    </aside>
  );
}

export default ProductsFilterSidebar;
