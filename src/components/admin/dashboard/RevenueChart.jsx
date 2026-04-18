import { formatCurrency } from '../../../utils/formatCurrency'

function RevenueChart({ data }) {
  const maxValue = Math.max(...data.map((item) => item.revenue), 1)
  const dayCount = data.length

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Doanh thu theo ngày</h3>
          <p className="mt-1 text-sm text-slate-500">Biểu đồ doanh thu {dayCount} ngày gần nhất.</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{dayCount} days</span>
      </div>

      <div className="mt-6 space-y-4">
        {data.map((item) => {
          const barWidth = `${Math.max((item.revenue / maxValue) * 100, 8)}%`

          return (
            <div key={item.label} className="grid grid-cols-[3rem_1fr_auto] items-center gap-3">
              <p className="text-sm font-semibold text-slate-600">{item.label}</p>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-500"
                  style={{ width: barWidth }}
                />
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{formatCurrency(item.revenue)}</p>
                <p className="text-xs text-slate-500">{item.value} orders</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RevenueChart
