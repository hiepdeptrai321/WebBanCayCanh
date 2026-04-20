function RoleBadge({ role }) {
  const className = role === 'admin' ? 'bg-sky-100 text-sky-700' : 'bg-slate-200 text-slate-700'
  const label = role === 'admin' ? 'Quản trị viên' : 'Khách hàng'

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{label}</span>
}

function AccountStatusBadge({ status }) {
  const className =
    status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
  const label = status === 'active' ? 'Đang hoạt động' : 'Đã khóa'

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{label}</span>
}

function UsersTable({ users, onToggleRole, onToggleLock }) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Không tìm thấy người dùng phù hợp.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Họ tên</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Số điện thoại</th>
              <th className="px-4 py-3">Vai trò</th>
              <th className="px-4 py-3">Trạng thái tài khoản</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-700">
            {users.map((user) => (
              <tr key={user.id} className="align-top">
                <td className="px-4 py-3 font-semibold text-slate-900">{user.fullName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-4 py-3">
                  <AccountStatusBadge status={user.accountStatus} />
                </td>
                <td className="px-4 py-3">{user.createdAt}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleRole(user)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      {user.role === 'admin' ? 'Chuyển thành khách hàng' : 'Chuyển thành quản trị viên'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleLock(user)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        user.accountStatus === 'active'
                          ? 'border border-amber-200 text-amber-700 hover:bg-amber-50'
                          : 'border border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      {user.accountStatus === 'active' ? 'Khóa' : 'Mở khóa'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersTable
