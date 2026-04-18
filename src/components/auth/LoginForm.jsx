import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { RefreshCw, Eye, EyeOff, Mail, Lock } from "lucide-react";
export default function LoginForm() {
  const { login, setModalTab } = useAuth();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Input Tài khoản */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Tài khoản
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
            className="w-full pl-12 pr-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm"
            placeholder="Email hoặc số điện thoại"
          />
        </div>
      </div>

      {/* Input Mật khẩu */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
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
            className="w-full pl-12 pr-14 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
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
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-32 bg-emerald-50 border-2 border-dashed border-emerald-200 py-2 rounded-2xl font-mono text-lg font-bold tracking-[0.2em] text-emerald-800 text-center select-none italic">
            {captchaCode}
          </div>
          <button
            type="button"
            onClick={generateCaptcha}
            className="p-3 text-emerald-600 hover:bg-emerald-100 rounded-2xl transition-colors border border-emerald-100"
          >
            <RefreshCw size={18} />
          </button>
          <input
            type="text"
            maxLength={6}
            placeholder="Mã xác thực"
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-4 border border-gray-200 rounded-2xl text-center focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
            required
          />
        </div>
      </div>

      {/* Nút đăng nhập */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl text-lg font-bold shadow-lg transition-all disabled:opacity-50"
      >
        {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
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
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-gray-100"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-[10px] uppercase tracking-[0.2em]">
          Hoặc
        </span>
        <div className="flex-grow border-t border-gray-100"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="border border-gray-200 py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-sm"
        >
          <span>G</span>
          Google
        </button>
        <button
          type="button"
          className="border border-gray-200 py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-sm"
        >
          <svg
            className="w-5 h-5 text-[#1877F2]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
      </div>
    </form>
  );
}
