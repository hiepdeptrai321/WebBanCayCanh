function ProductsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-green-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(187,247,208,0.28),_transparent_30%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 text-white sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            Bộ sưu tập cây cảnh cho không gian sống xanh
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Tất cả sản phẩm
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            Khám phá các mẫu cây để bàn, cây nội thất, chậu trang trí và phụ kiện chăm cây
            được tuyển chọn theo phong cách hiện đại, dễ chăm và phù hợp nhiều không gian.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row">
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Chất lượng</p>
            <p className="mt-2 text-lg font-semibold">Chọn lọc kỹ</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Dịch vụ</p>
            <p className="mt-2 text-lg font-semibold">Tư vấn tận tâm</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductsHero;
