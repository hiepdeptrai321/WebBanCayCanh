function ProductsEmptyState({ onReset }) {
  return (
    <div className="rounded-[32px] border border-dashed border-green-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-gray-800">
        Không tìm thấy sản phẩm phù hợp
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500">
        Hãy thử đổi từ khóa tìm kiếm, chọn mức giá khác hoặc xóa bớt bộ lọc để xem thêm sản phẩm.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        Xóa toàn bộ bộ lọc
      </button>
    </div>
  );
}

export default ProductsEmptyState;
