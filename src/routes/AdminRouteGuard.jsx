import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAdminUser } from "../services/adminAuth";

function AdminRouteGuard() {
  const { user } = useAuth();
  const location = useLocation();

  if (isAdminUser(user)) {
    return <Outlet />;
  }

  return (
    <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  );
}

export default AdminRouteGuard;
