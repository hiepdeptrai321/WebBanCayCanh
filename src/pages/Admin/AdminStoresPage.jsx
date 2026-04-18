import { useEffect, useMemo, useState } from 'react'
import {
  createBranch,
  deleteBranch,
  getStoreProfile,
  updateBranch,
  updateStoreProfile,
} from '../../services/storeService'

const defaultBranchValues = {
  name: '',
  phone: '',
  province: '',
  district: '',
  ward: '',
  streetAddress: '',
  openingHours: '',
  mapUrl: '',
}

function AdminStoresPage() {
  const [store, setStore] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [branchValues, setBranchValues] = useState(defaultBranchValues)
  const [editingBranchId, setEditingBranchId] = useState(null)

  useEffect(() => {
    async function loadStore() {
      try {
        setIsLoading(true)
        setPageError('')
        const data = await getStoreProfile()
        setStore(data)
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Không thể tải thông tin cửa hàng.')
      } finally {
        setIsLoading(false)
      }
    }

    loadStore()
  }, [])

  const branchTitle = useMemo(() => (editingBranchId ? 'Cập nhật chi nhánh' : 'Thêm chi nhánh'), [editingBranchId])

  const handleStoreChange = (field) => (event) => {
    setStore((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSaveStore = async () => {
    try {
      const savedStore = await updateStoreProfile(store)
      setStore(savedStore)
      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Không thể cập nhật cửa hàng.')
    }
  }

  const handleBranchChange = (field) => (event) => {
    setBranchValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmitBranch = async (event) => {
    event.preventDefault()

    try {
      const savedStore = editingBranchId
        ? await updateBranch(editingBranchId, branchValues)
        : await createBranch(branchValues)

      setStore(savedStore)
      setBranchValues(defaultBranchValues)
      setEditingBranchId(null)
      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Không thể lưu chi nhánh.')
    }
  }

  const handleEditBranch = (branch) => {
    setEditingBranchId(branch.id)
    setBranchValues(branch)
  }

  const handleDeleteBranch = async (branch) => {
    if (!window.confirm(`Bạn có chắc muốn xóa chi nhánh "${branch.name}"?`)) {
      return
    }

    try {
      const savedStore = await deleteBranch(branch.id)
      setStore(savedStore)
      if (editingBranchId === branch.id) {
        setEditingBranchId(null)
        setBranchValues(defaultBranchValues)
      }
      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Không thể xóa chi nhánh.')
    }
  }

  if (isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">Loading store data...</div>
  }

  if (!store) {
    return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">Không tìm thấy dữ liệu cửa hàng.</div>
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Quản lý cửa hàng và chi nhánh</h2>
        <p className="mt-1 text-sm text-slate-500">Cập nhật thông tin cửa hàng chính và các chi nhánh đang hoạt động.</p>
      </div>

      {pageError ? <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div> : null}

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">Tên cửa hàng
          <input value={store.name} onChange={handleStoreChange('name')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
        </label>
        <label className="text-sm font-medium text-slate-700">Slug
          <input value={store.slug} onChange={handleStoreChange('slug')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
        </label>
        <label className="text-sm font-medium text-slate-700 md:col-span-2">Mô tả
          <textarea value={store.description} onChange={handleStoreChange('description')} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-slate-700">Trạng thái
          <select value={store.status} onChange={handleStoreChange('status')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3">
            <option value="Đang hoạt động">Đang hoạt động</option>
            <option value="Tạm ẩn">Tạm ẩn</option>
          </select>
        </label>
        <div className="flex items-end">
          <button type="button" onClick={handleSaveStore} className="h-11 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700">Lưu thông tin cửa hàng</button>
        </div>
      </div>

      <form onSubmit={handleSubmitBranch} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-3">
        <h3 className="md:col-span-2 lg:col-span-3 text-lg font-bold text-slate-900">{branchTitle}</h3>
        <label className="text-sm font-medium text-slate-700">Tên chi nhánh<input value={branchValues.name} onChange={handleBranchChange('name')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required /></label>
        <label className="text-sm font-medium text-slate-700">Điện thoại<input value={branchValues.phone} onChange={handleBranchChange('phone')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required /></label>
        <label className="text-sm font-medium text-slate-700">Tỉnh/Thành phố<input value={branchValues.province} onChange={handleBranchChange('province')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required /></label>
        <label className="text-sm font-medium text-slate-700">Quận/Huyện<input value={branchValues.district} onChange={handleBranchChange('district')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required /></label>
        <label className="text-sm font-medium text-slate-700">Phường/Xã<input value={branchValues.ward} onChange={handleBranchChange('ward')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required /></label>
        <label className="text-sm font-medium text-slate-700">Địa chỉ<input value={branchValues.streetAddress} onChange={handleBranchChange('streetAddress')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required /></label>
        <label className="text-sm font-medium text-slate-700">Giờ mở cửa<input value={branchValues.openingHours} onChange={handleBranchChange('openingHours')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required /></label>
        <label className="text-sm font-medium text-slate-700 md:col-span-2 lg:col-span-2">Link bản đồ<input value={branchValues.mapUrl} onChange={handleBranchChange('mapUrl')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" /></label>
        <div className="flex items-end gap-2">
          <button type="submit" className="h-11 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700">{editingBranchId ? 'Cập nhật' : 'Thêm'}</button>
          {editingBranchId ? <button type="button" onClick={() => { setEditingBranchId(null); setBranchValues(defaultBranchValues) }} className="h-11 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700">Hủy</button> : null}
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Chi nhánh</th>
                <th className="px-4 py-3">Địa chỉ</th>
                <th className="px-4 py-3">Điện thoại</th>
                <th className="px-4 py-3">Giờ mở cửa</th>
                <th className="px-4 py-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {store.branches.map((branch) => (
                <tr key={branch.id}>
                  <td className="px-4 py-3 font-semibold text-slate-900">{branch.name}</td>
                  <td className="px-4 py-3">{`${branch.streetAddress}, ${branch.ward}, ${branch.district}, ${branch.province}`}</td>
                  <td className="px-4 py-3">{branch.phone}</td>
                  <td className="px-4 py-3">{branch.openingHours}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => handleEditBranch(branch)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">Sửa</button>
                      <button type="button" onClick={() => handleDeleteBranch(branch)} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700">Xóa</button>
                    </div>
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

export default AdminStoresPage
