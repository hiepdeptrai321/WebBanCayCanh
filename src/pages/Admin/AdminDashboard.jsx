import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatCurrency'
import DashboardStatCard from '../../components/admin/dashboard/DashboardStatCard'
import RevenueChart from '../../components/admin/dashboard/RevenueChart'
import RecentOrdersList from '../../components/admin/dashboard/RecentOrdersList'
import LowStockProductsList from '../../components/admin/dashboard/LowStockProductsList'
import { getAllOrders } from '../../services/orderService'
import { getAllProducts } from '../../services/productService'

const rangeOptions = [
  { key: '7d', label: '7 ngày', days: 7 },
  { key: '30d', label: '30 ngày', days: 30 },
  { key: '90d', label: '90 ngày', days: 90 },
]

function getDateKey(date) {
  const localDate = new Date(date)
  return `${localDate.getFullYear()}-${localDate.getMonth()}-${localDate.getDate()}`
}

function getAnchorDate(orders) {
  const maxTimestamp = orders.reduce((max, order) => {
    const timestamp = new Date(order.createdAtISO || 0).getTime()
    return Number.isNaN(timestamp) ? max : Math.max(max, timestamp)
  }, 0)

  if (!maxTimestamp) {
    return new Date()
  }

  return new Date(maxTimestamp)
}

function buildRevenueByDay(orders, selectedDays) {
  const now = getAnchorDate(orders)
  const days = []

  for (let index = selectedDays - 1; index >= 0; index -= 1) {
    const date = new Date(now)
    date.setHours(0, 0, 0, 0)
    date.setDate(now.getDate() - index)

    days.push({
      key: getDateKey(date),
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      revenue: 0,
      value: 0,
    })
  }

  const mapByDate = new Map(days.map((day) => [day.key, day]))

  orders.forEach((order) => {
    if (!order.createdAtISO) {
      return
    }

    const dateKey = getDateKey(order.createdAtISO)
    const bucket = mapByDate.get(dateKey)

    if (!bucket) {
      return
    }

    bucket.value += 1
    bucket.revenue += Number(order.total || 0)
  })

  return days
}

function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [rangeKey, setRangeKey] = useState('7d')
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true)
        setPageError('')

        const [productsData, ordersData] = await Promise.all([getAllProducts(), getAllOrders()])
        setProducts(productsData)
        setOrders(ordersData)
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Không thể tải dữ liệu dashboard.')
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const selectedRangeDays = useMemo(
    () => rangeOptions.find((option) => option.key === rangeKey)?.days || 7,
    [rangeKey]
  )

  const filteredOrders = useMemo(() => {
    const endDate = getAnchorDate(orders)
    endDate.setHours(23, 59, 59, 999)

    const startDate = new Date(endDate)
    startDate.setDate(endDate.getDate() - (selectedRangeDays - 1))
    startDate.setHours(0, 0, 0, 0)

    return orders.filter((order) => {
      const createdAt = new Date(order.createdAtISO || 0)
      return !Number.isNaN(createdAt.getTime()) && createdAt >= startDate && createdAt <= endDate
    })
  }, [orders, selectedRangeDays])

  const dashboardSummary = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + Number(order.total || 0), 0)
    const totalProductsSold = filteredOrders.reduce(
      (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + Number(item.quantity || 0), 0),
      0
    )

    return {
      totalRevenue,
      totalOrders: filteredOrders.length,
      totalProductsSold,
    }
  }, [filteredOrders])

  const revenueByDay = useMemo(
    () => buildRevenueByDay(filteredOrders, selectedRangeDays),
    [filteredOrders, selectedRangeDays]
  )

  const lowStockProducts = useMemo(() => {
    return products
      .filter((product) => Number(product.stock) <= 10)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 5)
  }, [products])

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAtISO || 0).getTime() - new Date(a.createdAtISO || 0).getTime())
      .slice(0, 5)
      .map((order) => ({
        id: order.code || order.id,
        customerName: order.customerName,
        date: order.createdAt,
        amount: order.total,
        status: order.orderStatus,
      }))
  }, [orders])

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Admin Dashboard</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Overview for plant shop operations</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Theo dõi doanh thu, đơn hàng, tồn kho và hiệu quả bán hàng trong một màn hình duy nhất.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {rangeOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setRangeKey(option.key)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  rangeKey === option.key
                    ? 'bg-white text-slate-900'
                    : 'border border-white/20 bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                {option.label}
              </button>
            ))}
            <Link
              to="/admin/orders"
              className="rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Xem đơn hàng
            </Link>
            <Link
              to="/admin/products"
              className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Quản lý sản phẩm
            </Link>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">Đang tải dữ liệu dashboard...</div>
      ) : null}

      {pageError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardStatCard
          label="Tổng doanh thu"
          value={formatCurrency(dashboardSummary.totalRevenue)}
          description={`Doanh thu trong ${selectedRangeDays} ngày`}
          accent="emerald"
        />
        <DashboardStatCard
          label="Tổng đơn hàng"
          value={dashboardSummary.totalOrders}
          description={`Đơn hàng trong ${selectedRangeDays} ngày`}
          accent="sky"
        />
        <DashboardStatCard
          label="Tổng sản phẩm bán ra"
          value={dashboardSummary.totalProductsSold}
          description={`Sản phẩm bán ra trong ${selectedRangeDays} ngày`}
          accent="amber"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <RevenueChart data={revenueByDay} />
        <LowStockProductsList products={lowStockProducts} />
      </div>

      <RecentOrdersList orders={recentOrders} />
    </section>
  )
}

export default AdminDashboard
