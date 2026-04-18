import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../../services/adminAuth'

function AdminHeader({ pageTitle, onMenuToggle }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutAdmin()
    navigate('/admin/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <span className="text-xl leading-none">☰</span>
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Admin Panel</p>
            <h1 className="text-lg font-semibold text-slate-900">{pageTitle}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
          >
            Đăng xuất
          </button>
          <Link
            to="/"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
