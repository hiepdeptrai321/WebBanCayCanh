import { SORT_OPTIONS } from "../../utils/productListingHelpers";

function ProductsToolbar({
  searchKeyword,
  onSearchChange,
  sortValue,
  onSortChange,
  visibleCount,
  totalCount,
}) {
  return (
    <div className="rounded-[28px] border border-green-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              value={searchKeyword}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Tìm theo tên cây, danh mục hoặc mô tả ngắn..."
              className="h-12 w-full rounded-2xl border border-green-100 bg-green-50/40 pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </label>

          <label className="flex h-12 min-w-[220px] items-center gap-3 rounded-2xl border border-green-100 bg-green-50/40 px-4 text-sm text-gray-700">
            <span className="font-medium text-green-800">Sắp xếp</span>
            <select
              value={sortValue}
              onChange={(event) => onSortChange(event.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
          Đang hiển thị <span className="font-semibold text-green-800">{visibleCount}</span> /{" "}
          <span className="font-semibold text-green-800">{totalCount}</span> sản phẩm
        </div>
      </div>
    </div>
  );
}

export default ProductsToolbar;
