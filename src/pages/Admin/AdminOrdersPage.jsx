import { useEffect, useMemo, useState } from 'react'
import { formatCurrency } from '../../utils/formatCurrency'
import AdminOrdersTable from '../../components/admin/AdminOrdersTable'
import { getAllOrders, updateOrderStatus } from '../../services/orderService'

const orderStatusOptions = ['Tất cả', 'Chờ xác nhận', 'Đang xử lý', 'Đang giao', 'Hoàn tất', 'Đã hủy']
const paymentStatusOptions = ['Tất cả', 'Chưa thanh toán', 'Đã thanh toán', 'Hoàn tiền']

function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [orderStatusFilter, setOrderStatusFilter] = useState('Tất cả')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('Tất cả')
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  useEffect(() => {
    async function loadOrders() {
      try {
        setIsLoading(true)
        setPageError('')
        const data = await getAllOrders()
        setOrders(data)
        setSelectedOrderId((currentId) => currentId || data[0]?.id || null)
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Không thể tải danh sách đơn hàng.')
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesOrderStatus = orderStatusFilter === 'Tất cả' || order.orderStatus === orderStatusFilter
      const matchesPaymentStatus = paymentStatusFilter === 'Tất cả' || order.paymentStatus === paymentStatusFilter

      return matchesOrderStatus && matchesPaymentStatus
    })
  }, [orders, orderStatusFilter, paymentStatusFilter])

  const selectedOrder = useMemo(() => {
    const firstFiltered = filteredOrders[0] || null
    const found = filteredOrders.find((order) => order.id === selectedOrderId)
    return found || firstFiltered
  }, [filteredOrders, selectedOrderId])

  const handleViewDetail = (orderId) => {
    setSelectedOrderId(orderId)
  }

  const handleUpdateOrderStatus = async (orderId, nextStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, nextStatus)
      setOrders((prevOrders) => prevOrders.map((order) => (order.id === orderId ? updatedOrder : order)))
      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Cập nhật trạng thái đơn hàng thất bại.')
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-2xl font-bold text-slate-900">Quản lý đơn hàng</h2>
        <p className="mt-1 text-sm text-slate-500">Theo dõi trạng thái xử lý, thanh toán và xem thông tin chi tiết từng đơn.</p>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">Đang tải dữ liệu đơn hàng...</div>
      ) : null}

      {pageError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div>
      ) : null}

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Lọc theo trạng thái đơn hàng
          <select
            value={orderStatusFilter}
            onChange={(event) => setOrderStatusFilter(event.target.value)}
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          >
            {orderStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Lọc theo trạng thái thanh toán
          <select
            value={paymentStatusFilter}
            onChange={(event) => setPaymentStatusFilter(event.target.value)}
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          >
            {paymentStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <AdminOrdersTable
        orders={filteredOrders}
        selectedOrderId={selectedOrder?.id || null}
        onViewDetail={handleViewDetail}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        orderStatusOptions={orderStatusOptions.filter((status) => status !== 'Tất cả')}
      />

      {selectedOrder ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Chi tiết đơn {selectedOrder.code || selectedOrder.id}</h3>
              <p className="text-sm text-slate-500">Khách hàng: {selectedOrder.customerName}</p>
            </div>
            <p className="text-sm text-slate-500">Ngày đặt: {selectedOrder.createdAt}</p>
          </div>

          <div className="mt-4 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Sản phẩm</h4>
              <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Tên sản phẩm</th>
                      <th className="px-4 py-3">Số lượng</th>
                      <th className="px-4 py-3">Đơn giá</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={`${selectedOrder.id}-${item.name}-${index}`}>
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3">{item.quantity}</td>
                        <td className="px-4 py-3">{formatCurrency(item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Thông tin giao hàng</h4>
              <p className="text-sm text-slate-700">SĐT: {selectedOrder.phone}</p>
              <p className="text-sm text-slate-700">Địa chỉ: {selectedOrder.address}</p>
              <p className="text-sm text-slate-700">Ghi chú: {selectedOrder.note || 'Không có'}</p>

              <div className="border-t border-slate-200 pt-3">
                <p className="text-sm text-slate-600">Tổng thanh toán</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(selectedOrder.total)}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </section>
  )
}

export default AdminOrdersPage
