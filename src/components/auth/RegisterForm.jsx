import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Calendar,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  Mail,
  Lock,
} from "lucide-react";

export default function RegisterForm() {
  const { register, setModalTab } = useAuth();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    province: "",
    district: "",
    ward: "",
    streetAddress: "",
    agreeTerms: false,
  });

  // Fetch dữ liệu Tỉnh/Thành
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch Quận/Huyện
  useEffect(() => {
    if (formData.province) {
      const selectedProv = provinces.find((p) => p.name === formData.province);
      if (selectedProv) {
        fetch(
          `https://provinces.open-api.vn/api/p/${selectedProv.code}?depth=2`,
        )
          .then((res) => res.json())
          .then((data) => {
            setDistricts(data.districts);
            setWards([]);
          });
      }
    }
  }, [formData.province, provinces]);

  // Fetch Phường/Xã
  useEffect(() => {
    if (formData.district) {
      const selectedDist = districts.find((d) => d.name === formData.district);
      if (selectedDist) {
        fetch(
          `https://provinces.open-api.vn/api/d/${selectedDist.code}?depth=2`,
        )
          .then((res) => res.json())
          .then((data) => setWards(data.wards));
      }
    }
  }, [formData.district, districts]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      alert("Đăng ký thành công!");
    } catch (err) {
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Class dùng chung để đồng nhất với LoginForm
  const inputBaseClass =
    "w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm text-base";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-2 bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hàng 1: Họ tên + SĐT */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Họ và tên
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={inputBaseClass}
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Số điện thoại
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputBaseClass}
              placeholder="09xx xxx xxx"
            />
          </div>
        </div>

        {/* Hàng 2: Tỉnh + Huyện + Xã  */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold mb-1 text-gray-500 uppercase">
              Tỉnh/Thành
            </label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className={`${inputBaseClass} py-3 text-sm`}
            >
              <option value="">Chọn Tỉnh</option>
              {provinces.map((p, i) => (
                <option key={i} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1 text-gray-500 uppercase">
              Quận/Huyện
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!formData.province}
              required
              className={`${inputBaseClass} py-3 text-sm`}
            >
              <option value="">Chọn Huyện</option>
              {districts.map((d, i) => (
                <option key={i} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1 text-gray-500 uppercase">
              Phường/Xã
            </label>
            <select
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              disabled={!formData.district}
              required
              className={`${inputBaseClass} py-3 text-sm`}
            >
              <option value="">Chọn Xã</option>
              {wards.map((w, i) => (
                <option key={i} value={w.name}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Địa chỉ cụ thể & Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Địa chỉ cụ thể
            </label>
            <input
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className={inputBaseClass}
              placeholder="Số nhà, tên đường..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={inputBaseClass}
              placeholder="example@gmail.com"
            />
          </div>
        </div>

        {/* Hàng: Giới tính + Ngày sinh  */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Giới tính
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`${inputBaseClass} h-[54px]`}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Ngày sinh
            </label>
            <div className="relative">
              <input
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`${inputBaseClass} h-[54px]`}
              />
            </div>
          </div>
        </div>

        {/* Mật khẩu & Xác nhận (Có icon ẩn hiện) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className={`${inputBaseClass} pr-12`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Xác nhận
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`${inputBaseClass} pr-12`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="pt-2 flex flex-col items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 accent-emerald-600"
            />
            Tôi đồng ý với điều khoản dịch vụ
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-2xl text-lg font-bold shadow-md active:scale-[0.99] transition-all"
          >
            {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ NGAY"}
          </button>

          <p className="text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <button
              type="button"
              onClick={() => setModalTab("login")}
              className="text-emerald-700 font-bold hover:underline"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
