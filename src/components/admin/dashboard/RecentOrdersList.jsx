import { formatCurrency } from '../../../utils/formatCurrency'

function RecentOrdersList({ orders }) {
  const statusClasses = {
    'Chờ xác nhận': 'bg-amber-100 text-amber-700',
    'Đang xử lý': 'bg-sky-100 text-sky-700',
    'Đang giao': 'bg-indigo-100 text-indigo-700',
    'Hoàn tất': 'bg-emerald-100 text-emerald-700',
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Đơn hàng gần đây</h3>
          <p className="mt-1 text-sm text-slate-500">5 đơn mới nhất trong hệ thống.</p>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Mã đơn</th>
                <th className="px-4 py-3">Khách hàng</th>
                <th className="px-4 py-3">Tổng tiền</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-semibold text-slate-900">{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{order.customerName}</p>
                    <p className="text-xs text-slate-500">{order.date}</p>
                  </td>
                  <td className="px-4 py-3">{formatCurrency(order.amount)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusClasses[order.status] || 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default RecentOrdersList
