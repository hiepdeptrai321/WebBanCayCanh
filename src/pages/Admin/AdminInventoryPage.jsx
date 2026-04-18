import { useEffect, useMemo, useState } from 'react'
import { createInventoryLog, getAllInventoryLogs } from '../../services/inventoryService'
import { getAllProducts } from '../../services/productService'

const actionOptions = ['Nhập kho', 'Xuất kho', 'Điều chỉnh']

const defaultForm = {
  productId: '',
  actionType: 'Nhập kho',
  quantityBefore: '',
  quantityAfter: '',
  note: '',
}

function AdminInventoryPage() {
  const [logs, setLogs] = useState([])
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [formValues, setFormValues] = useState(defaultForm)
  const [actionFilter, setActionFilter] = useState('Tất cả')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        setPageError('')
        const [logsData, productsData] = await Promise.all([getAllInventoryLogs(), getAllProducts()])
        setLogs(logsData)
        setProducts(productsData)
        setFormValues((current) => ({
          ...current,
          productId: current.productId || productsData[0]?.id || '',
        }))
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Không thể tải dữ liệu tồn kho.')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredLogs = useMemo(() => {
    const nextKeyword = keyword.trim().toLowerCase()

    return logs.filter((log) => {
      const matchAction = actionFilter === 'Tất cả' || log.actionType === actionFilter
      const matchKeyword = !nextKeyword || log.productName.toLowerCase().includes(nextKeyword)
      return matchAction && matchKeyword
    })
  }, [logs, actionFilter, keyword])

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const quantityBefore = Number(formValues.quantityBefore)
    const quantityAfter = Number(formValues.quantityAfter)

    if (!formValues.productId) {
      setPageError('Vui lòng chọn sản phẩm.')
      return
    }

    if (Number.isNaN(quantityBefore) || Number.isNaN(quantityAfter)) {
      setPageError('Số lượng trước/sau phải là số hợp lệ.')
      return
    }

    try {
      const nextLog = await createInventoryLog({
        productId: formValues.productId,
        actionType: formValues.actionType,
        quantityBefore,
        quantityAfter,
        quantityChanged: quantityAfter - quantityBefore,
        note: formValues.note,
      })

      setLogs((prev) => [nextLog, ...prev])
      setFormValues((prev) => ({ ...defaultForm, productId: prev.productId || defaultForm.productId }))
      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Không thể tạo log tồn kho.')
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Lịch sử tồn kho</h2>
        <p className="mt-1 text-sm text-slate-500">Theo dõi nhập/xuất/điều chỉnh và cập nhật số lượng tồn kho sản phẩm.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm font-medium text-slate-700">
          Sản phẩm
          <select value={formValues.productId} onChange={handleChange('productId')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3">
            {products.map((product) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Loại thao tác
          <select value={formValues.actionType} onChange={handleChange('actionType')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3">
            {actionOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Số lượng trước
          <input type="number" value={formValues.quantityBefore} onChange={handleChange('quantityBefore')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Số lượng sau
          <input type="number" value={formValues.quantityAfter} onChange={handleChange('quantityAfter')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
        </label>

        <label className="text-sm font-medium text-slate-700 md:col-span-2">
          Ghi chú
          <input type="text" value={formValues.note} onChange={handleChange('note')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
        </label>

        <div className="flex items-end">
          <button type="submit" className="h-11 w-full rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700">
            Lưu log tồn kho
          </button>
        </div>
      </form>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Lọc theo thao tác
          <select value={actionFilter} onChange={(event) => setActionFilter(event.target.value)} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3">
            <option value="Tất cả">Tất cả</option>
            {actionOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Tìm theo sản phẩm
          <input type="text" value={keyword} onChange={(event) => setKeyword(event.target.value)} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" placeholder="Nhập tên sản phẩm..." />
        </label>
      </div>

      {isLoading ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">Đang tải dữ liệu tồn kho...</div> : null}
      {pageError ? <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div> : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Sản phẩm</th>
                <th className="px-4 py-3">Thao tác</th>
                <th className="px-4 py-3">Thay đổi</th>
                <th className="px-4 py-3">Trước</th>
                <th className="px-4 py-3">Sau</th>
                <th className="px-4 py-3">Thời gian</th>
                <th className="px-4 py-3">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-4 py-3 font-semibold text-slate-900">{log.productName}</td>
                  <td className="px-4 py-3">{log.actionType}</td>
                  <td className="px-4 py-3">{log.quantityChanged}</td>
                  <td className="px-4 py-3">{log.quantityBefore}</td>
                  <td className="px-4 py-3">{log.quantityAfter}</td>
                  <td className="px-4 py-3">{log.createdAt}</td>
                  <td className="px-4 py-3">{log.note || 'Không có'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminInventoryPage
