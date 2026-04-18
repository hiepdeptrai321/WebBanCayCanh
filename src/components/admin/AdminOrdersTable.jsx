import { formatCurrency } from '../../utils/formatCurrency'

function OrderStatusBadge({ status }) {
  const classesByStatus = {
    'Chờ xác nhận': 'bg-amber-100 text-amber-700',
    'Đang xử lý': 'bg-sky-100 text-sky-700',
    'Đang giao': 'bg-indigo-100 text-indigo-700',
    'Hoàn tất': 'bg-emerald-100 text-emerald-700',
    'Đã hủy': 'bg-rose-100 text-rose-700',
  }

  const className = classesByStatus[status] || 'bg-slate-200 text-slate-700'

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{status}</span>
}

function PaymentStatusBadge({ status }) {
  const classesByStatus = {
    'Chưa thanh toán': 'bg-rose-100 text-rose-700',
    'Đã thanh toán': 'bg-emerald-100 text-emerald-700',
    'Hoàn tiền': 'bg-slate-200 text-slate-700',
  }

  const className = classesByStatus[status] || 'bg-slate-200 text-slate-700'

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{status}</span>
}

function AdminOrdersTable({
  orders,
  selectedOrderId,
  onViewDetail,
  onUpdateOrderStatus,
  orderStatusOptions,
}) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Không có đơn hàng phù hợp bộ lọc.
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden overflow-x-auto lg:block">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Mã đơn</th>
                <th className="px-4 py-3">Khách hàng</th>
                <th className="px-4 py-3">Ngày đặt</th>
                <th className="px-4 py-3">Tổng tiền</th>
                <th className="px-4 py-3">Order status</th>
                <th className="px-4 py-3">Payment status</th>
                <th className="px-4 py-3">Cập nhật trạng thái</th>
                <th className="px-4 py-3 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-700">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className={selectedOrderId === order.id ? 'bg-emerald-50/40' : ''}
                >
                  <td className="px-4 py-3 font-semibold text-slate-900">{order.code || order.id}</td>
                  <td className="px-4 py-3">{order.customerName}</td>
                  <td className="px-4 py-3">{order.createdAt}</td>
                  <td className="px-4 py-3">{formatCurrency(order.total)}</td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.orderStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.orderStatus}
                      onChange={(event) => onUpdateOrderStatus(order.id, event.target.value)}
                      className="h-9 rounded-lg border border-slate-300 px-2 text-xs outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
                    >
                      {orderStatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onViewDetail(order.id)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 p-4 lg:hidden">
          {orders.map((order) => (
            <article
              key={order.id}
              className={`rounded-xl border p-4 ${
                selectedOrderId === order.id ? 'border-emerald-300 bg-emerald-50/40' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">{order.code || order.id}</p>
                  <p className="text-xs text-slate-500">{order.customerName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onViewDetail(order.id)}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  Xem chi tiết
                </button>
              </div>

              <div className="mt-3 grid gap-2 text-xs text-slate-600">
                <p>Ngày đặt: {order.createdAt}</p>
                <p>Tổng tiền: {formatCurrency(order.total)}</p>
                <div className="flex flex-wrap gap-2">
                  <OrderStatusBadge status={order.orderStatus} />
                  <PaymentStatusBadge status={order.paymentStatus} />
                </div>
              </div>

              <label className="mt-3 block text-xs font-semibold text-slate-700">
                Cập nhật trạng thái
                <select
                  value={order.orderStatus}
                  onChange={(event) => onUpdateOrderStatus(order.id, event.target.value)}
                  className="mt-1 h-10 w-full rounded-lg border border-slate-300 px-2 text-xs outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
                >
                  {orderStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export default AdminOrdersTable
