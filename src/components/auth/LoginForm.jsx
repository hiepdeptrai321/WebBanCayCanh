import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { RefreshCw, Eye, EyeOff, Mail, Lock } from "lucide-react";
import GoogleGmailLogin from "./GoogleGmailLogin";
export default function LoginForm() {
  const { login, loginWithGoogle, setModalTab } = useAuth();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const generateCaptcha = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptchaCode(code);
    setUserCaptcha("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptcha !== captchaCode) {
      alert("Mã xác nhận (CAPTCHA) không chính xác!");
      return;
    }

    setLoading(true);
    try {
      // Gửi dữ liệu qua context/AuthContext.js
      await login(formData);
      // AuthContext thường sẽ xử lý alert thành công và đóng Modal
    } catch (error) {
      alert(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại!");
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = useCallback(
    async (credential) => {
      setGoogleLoading(true);
      try {
        await loginWithGoogle(credential);
      } finally {
        setGoogleLoading(false);
      }
    },
    [loginWithGoogle],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Input Tài khoản */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Tài khoản (Email đã đăng ký hoặc số điện thoại)
        </label>
        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-gray-200 py-3 pl-11 pr-4 text-sm shadow-sm transition-all outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Nhập email đã đăng ký hoặc số điện thoại"
          />
        </div>
      </div>

      {/* Input Mật khẩu */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Mật khẩu
        </label>
        <div className="relative">
          <Lock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-gray-200 py-3 pl-11 pr-12 text-sm shadow-sm transition-all outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Ghi nhớ & Quên mật khẩu */}
      <div className="flex items-center justify-between px-1">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 accent-emerald-600 rounded border-gray-300"
          />
          Duy trì đăng nhập
        </label>
        <button
          type="button"
          onClick={() => setModalTab("forgot")}
          className="text-emerald-700 text-sm font-semibold hover:text-emerald-800"
        >
          Quên mật khẩu?
        </button>
      </div>

      {/* CAPTCHA */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2.5">
          <div className="w-28 select-none rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50 py-1.5 text-center font-mono text-base font-bold italic tracking-[0.2em] text-emerald-800">
            {captchaCode}
          </div>
          <button
            type="button"
            onClick={generateCaptcha}
            className="rounded-2xl border border-emerald-100 p-2.5 text-emerald-600 transition-colors hover:bg-emerald-100"
          >
            <RefreshCw size={16} />
          </button>
          <input
            type="text"
            maxLength={6}
            placeholder="Mã xác thực"
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value.toUpperCase())}
            className="h-10 flex-1 rounded-2xl border border-gray-200 px-3 text-center text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      {/* Nút đăng nhập */}
      <button
        type="submit"
        disabled={loading || googleLoading}
        className="w-full rounded-2xl bg-emerald-700 py-3 text-base font-bold text-white shadow-lg transition-all hover:bg-emerald-800 disabled:opacity-50"
      >
        {loading ? "PROCESSING..." : "LOG IN"}
      </button>

      {/* Chuyển sang Đăng ký */}
      <p className="text-center text-sm text-gray-600">
        Bạn là thành viên mới?{" "}
        <button
          type="button"
          onClick={() => setModalTab("register")}
          className="text-emerald-700 font-bold hover:underline"
        >
          Tạo tài khoản ngay
        </button>
      </p>

      {/* Social login */}
      <div className="relative flex items-center py-1">
        <div className="grow border-t border-gray-100"></div>
        <span className="shrink mx-3 text-[10px] uppercase tracking-[0.18em] text-gray-400">
          Hoặc dùng Gmail
        </span>
        <div className="grow border-t border-gray-100"></div>
      </div>

      <GoogleGmailLogin
        onCredential={handleGoogleCredential}
        disabled={loading || googleLoading}
      />

      {googleLoading ? (
        <p className="text-center text-xs text-emerald-700">
          Verifying Gmail...
        </p>
      ) : null}
    </form>
  );
}
