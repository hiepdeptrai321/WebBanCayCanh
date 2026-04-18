function LowStockProductsList({ products }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Sản phẩm sắp hết hàng</h3>
          <p className="mt-1 text-sm text-slate-500">Các sản phẩm cần bổ sung tồn kho sớm.</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {products.map((product) => {
          const urgent = product.stock <= 3
          return (
            <article
              key={product.id}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                urgent ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div>
                <p className="font-semibold text-slate-900">{product.name}</p>
                <p className="text-xs text-slate-500">{product.category}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  urgent ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                Còn {product.stock}
              </span>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default LowStockProductsList
