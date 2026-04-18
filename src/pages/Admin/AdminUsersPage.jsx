import { useEffect, useMemo, useState } from 'react'
import UsersTable from '../../components/admin/users/UsersTable'
import { getAllUsers, toggleUserLock, toggleUserRole } from '../../services/userService'

const roleOptions = ['Tất cả', 'user', 'admin']
const statusOptions = ['Tất cả', 'active', 'locked']

function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('Tất cả')
  const [statusFilter, setStatusFilter] = useState('Tất cả')

  useEffect(() => {
    async function loadUsers() {
      try {
        setIsLoading(true)
        setPageError('')
        const data = await getAllUsers()
        setUsers(data)
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Không thể tải danh sách người dùng.')
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword)
      const matchesRole = roleFilter === 'Tất cả' || user.role === roleFilter
      const matchesStatus = statusFilter === 'Tất cả' || user.accountStatus === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchTerm, roleFilter, statusFilter])

  const handleToggleRole = async (user) => {
    try {
      const updatedUser = await toggleUserRole(user.id)
      setUsers((prevUsers) =>
        prevUsers.map((item) => (item.id === user.id ? updatedUser : item))
      )
      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Cập nhật vai trò thất bại.')
    }
  }

  const handleToggleLock = async (user) => {
    try {
      const updatedUser = await toggleUserLock(user.id)
      setUsers((prevUsers) =>
        prevUsers.map((item) => (item.id === user.id ? updatedUser : item))
      )
      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Cập nhật trạng thái tài khoản thất bại.')
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quản lý người dùng</h2>
          <p className="mt-1 text-sm text-slate-500">Quản lý vai trò, trạng thái tài khoản và danh sách người dùng hệ thống.</p>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 lg:col-span-1">
          Tìm kiếm theo tên hoặc email
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Nhập tên hoặc email..."
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Lọc theo vai trò
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Lọc theo trạng thái
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">Đang tải dữ liệu người dùng...</div>
      ) : null}

      {pageError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div>
      ) : null}

      <UsersTable users={filteredUsers} onToggleRole={handleToggleRole} onToggleLock={handleToggleLock} />
    </section>
  )
}

export default AdminUsersPage
