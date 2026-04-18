import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function ForgotPasswordForm() {
  const { setModalTab, resetPassword } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Bước 1: Gửi yêu cầu kiểm tra email (Nếu bạn không dùng OTP thì bước này chỉ để xác nhận email tồn tại)
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập chuyển bước (Hoặc gọi API check email nếu muốn)
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 800);
  };

  // Tìm đến hàm handleResetPassword trong ForgotPasswordForm.jsx
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({
        email: formData.email,
        newPassword: formData.newPassword,
      });
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-2">
      {/* Nút quay lại */}
      <button
        onClick={() => (step === 1 ? setModalTab("login") : setStep(1))}
        className="flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={18} />
        {step === 1 ? "Quay lại đăng nhập" : "Quay lại bước trước"}
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {step === 1 ? "Quên mật khẩu?" : "Thiết lập mật khẩu mới"}
        </h2>
        <p className="text-gray-500 text-sm mt-2 px-4">
          {step === 1
            ? "Nhập email đã đăng ký để hệ thống xác nhận tài khoản của bạn."
            : "Vui lòng nhập mật khẩu mới để tiếp tục mua sắm tại shop."}
        </p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleSendOTP} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Email khôi phục
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm"
                placeholder="example@gmail.com"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl text-lg font-bold shadow-lg shadow-emerald-900/10 transition-all disabled:opacity-50"
          >
            TIẾP TỤC
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* Mật khẩu mới */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Mật khẩu mới
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showPass ? "text" : "password"}
                name="newPassword"
                required
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showPass ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl text-lg font-bold shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "UPDATING..." : "CONFIRM PASSWORD CHANGE"}
          </button>
        </form>
      )}

      <div className="mt-8 text-center text-xs text-gray-400 px-6">
        Bằng cách nhấn xác nhận, bạn đồng ý với các quy định về bảo mật tài
        khoản của Góc Xanh Shop.
      </div>
    </div>
  );
}
