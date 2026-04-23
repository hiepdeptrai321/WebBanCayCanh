import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { isAdminUser } from "../../services/adminAuth";

const defaultValues = {
  username: "",
  password: "",
};

function AdminLoginPage() {
  const { user, setAuthSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState(defaultValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath = useMemo(
    () => location.state?.from || "/admin/dashboard",
    [location.state],
  );

  if (isAdminUser(user)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const data = await authService.loginAdmin(values);
      setAuthSession(data);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Đăng nhập thất bại.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
          Đăng nhập quản trị
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Đăng nhập quản trị
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Tài khoản quản trị mặc định là admin và mật khẩu là admin123.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-700">
          Tài khoản quản trị
          <input
            type="text"
            value={values.username}
            onChange={handleChange("username")}
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
            placeholder="admin"
            required
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Mật khẩu
          <input
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
            placeholder="admin123"
            required
          />
        </label>

        {errorMessage ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập quản trị"}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-500">
        <Link
          to="/login"
          className="font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Đăng nhập khách hàng
        </Link>
        <Link
          to="/"
          className="font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </section>
  );
}

export default AdminLoginPage;
