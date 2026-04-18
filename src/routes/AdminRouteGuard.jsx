import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAdminLoggedIn } from '../services/adminAuth'

function AdminRouteGuard() {
  const location = useLocation()

  if (isAdminLoggedIn()) {
    return <Outlet />
  }

  return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
}

export default AdminRouteGuard
