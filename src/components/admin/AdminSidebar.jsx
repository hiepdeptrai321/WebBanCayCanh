import { NavLink } from 'react-router-dom'
import { adminNavItems } from './adminNavItems'

function AdminSidebar({ isOpen, onClose }) {
  return (
    <>
      <aside className="hidden w-72 border-r border-slate-200 bg-slate-900 text-slate-100 lg:flex lg:flex-col">
        <div className="border-b border-slate-700 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">WebBanCayCanh</p>
          <h2 className="mt-2 text-xl font-bold">Bảng điều khiển quản trị</h2>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      >
        <aside
          className={`h-full w-72 bg-slate-900 p-3 text-slate-100 transition-transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-3 flex items-center justify-between border-b border-slate-700 px-3 py-4">
            <h2 className="text-lg font-semibold">Bảng điều khiển quản trị</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              aria-label="Đóng menu"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-1">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </>
  )
}

export default AdminSidebar
