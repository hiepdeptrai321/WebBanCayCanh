function formatPrice(value) {
  return `${new Intl.NumberFormat("vi-VN").format(value)}đ`;
}

function FilterChip({ label, onRemove }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm text-green-700 transition hover:border-green-600 hover:text-green-800"
    >
      <span>{label}</span>
      <span className="text-base leading-none">×</span>
    </button>
  );
}

function ProductsActiveFilters({
  categoryName = "",
  priceRange = [0, 5000000],
  inStockOnly = false,
  onSaleOnly = false,
  searchKeyword = "",
  onClearCategory = () => {},
  onClearPrice = () => {},
  onClearInStock = () => {},
  onClearOnSale = () => {},
  onClearSearch = () => {},
  hasFilters = false,
}) {
  if (!hasFilters) return null;

  return (
    <div className="rounded-3xl border border-green-100 bg-green-50/60 px-4 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-green-800">
          Đang áp dụng:
        </span>

        {categoryName ? (
          <FilterChip
            label={`Danh mục: ${categoryName}`}
            onRemove={onClearCategory}
          />
        ) : null}

        {(priceRange && priceRange[0] !== 0) ||
        (priceRange && priceRange[1] !== 5000000) ? (
          <FilterChip
            label={`Giá: ${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`}
            onRemove={onClearPrice}
          />
        ) : null}

        {inStockOnly ? (
          <FilterChip label="Chỉ còn hàng" onRemove={onClearInStock} />
        ) : null}

        {onSaleOnly ? (
          <FilterChip label="Đang giảm giá" onRemove={onClearOnSale} />
        ) : null}

        {searchKeyword.trim() ? (
          <FilterChip
            label={`Từ khóa: ${searchKeyword.trim()}`}
            onRemove={onClearSearch}
          />
        ) : null}
      </div>
    </div>
  );
}

export default ProductsActiveFilters;
