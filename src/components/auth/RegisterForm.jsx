import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,64}$/;

const INITIAL_FORM_DATA = {
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
};

function getMaxBirthDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 13);
  return date.toISOString().split("T")[0];
}

function getAge(dateString) {
  const birthDate = new Date(dateString);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDelta = today.getMonth() - birthDate.getMonth();

  if (
    monthDelta < 0 ||
    (monthDelta === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function validateField(name, value, formData) {
  const textValue = String(value ?? "").trim();

  switch (name) {
    case "fullName":
      if (!textValue) return "Vui lòng nhập họ và tên.";
      if (textValue.length < 2) return "Họ và tên phải có ít nhất 2 ký tự.";
      if (textValue.length > 80)
        return "Họ và tên không được vượt quá 80 ký tự.";
      return "";

    case "phone":
      if (!textValue) return "Vui lòng nhập số điện thoại.";
      if (!PHONE_REGEX.test(textValue)) {
        return "Số điện thoại không hợp lệ (VD: 09xxxxxxxx).";
      }
      return "";

    case "email":
      if (!textValue) return "Vui lòng nhập email.";
      if (!EMAIL_REGEX.test(textValue)) return "Email không đúng định dạng.";
      return "";

    case "password":
      if (!value) return "Vui lòng nhập mật khẩu.";
      if (!PASSWORD_REGEX.test(String(value))) {
        return "Mật khẩu cần ít nhất 8 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
      }
      return "";

    case "confirmPassword":
      if (!value) return "Vui lòng xác nhận mật khẩu.";
      if (String(value) !== String(formData.password || "")) {
        return "Mật khẩu xác nhận không khớp.";
      }
      return "";

    case "dateOfBirth": {
      if (!textValue) return "Vui lòng chọn ngày sinh.";
      const age = getAge(textValue);
      if (age === null) return "Ngày sinh không hợp lệ.";
      if (age < 13) return "Bạn phải từ 13 tuổi trở lên để đăng ký.";
      if (age > 120) return "Ngày sinh không hợp lệ.";
      return "";
    }

    case "gender":
      if (!textValue) return "Vui lòng chọn giới tính.";
      return "";

    case "province":
      if (!textValue) return "Vui lòng chọn tỉnh/thành.";
      return "";

    case "district":
      if (!textValue) return "Vui lòng chọn quận/huyện.";
      return "";

    case "ward":
      if (!textValue) return "Vui lòng chọn phường/xã.";
      return "";

    case "streetAddress":
      if (!textValue) return "Vui lòng nhập địa chỉ cụ thể.";
      if (textValue.length < 5)
        return "Địa chỉ cụ thể phải có ít nhất 5 ký tự.";
      if (textValue.length > 200)
        return "Địa chỉ cụ thể không được vượt quá 200 ký tự.";
      return "";

    case "agreeTerms":
      if (!value) return "Bạn cần đồng ý với điều khoản dịch vụ.";
      return "";

    default:
      return "";
  }
}

function validateForm(formData) {
  const fieldNames = [
    "fullName",
    "phone",
    "email",
    "password",
    "confirmPassword",
    "dateOfBirth",
    "gender",
    "province",
    "district",
    "ward",
    "streetAddress",
    "agreeTerms",
  ];

  const nextErrors = {};

  fieldNames.forEach((fieldName) => {
    const message = validateField(fieldName, formData[fieldName], formData);
    if (message) {
      nextErrors[fieldName] = message;
    }
  });

  return nextErrors;
}

export default function RegisterForm() {
  const { register, setModalTab } = useAuth();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const maxBirthDate = getMaxBirthDate();

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
    const nextValue = type === "checkbox" ? checked : value;
    const nextFormData = {
      ...formData,
      [name]: nextValue,
      ...(name === "province" ? { district: "", ward: "" } : {}),
      ...(name === "district" ? { ward: "" } : {}),
    };

    setFormData(nextFormData);

    setErrors((prev) => {
      const nextErrors = { ...prev };

      const applyValidation = (fieldName) => {
        const message = validateField(
          fieldName,
          nextFormData[fieldName],
          nextFormData,
        );

        if (message) {
          nextErrors[fieldName] = message;
        } else {
          delete nextErrors[fieldName];
        }
      };

      if (touched[name] || prev[name]) {
        applyValidation(name);
      }

      if (name === "password" || name === "confirmPassword") {
        if (
          touched.confirmPassword ||
          prev.confirmPassword ||
          nextFormData.confirmPassword
        ) {
          applyValidation("confirmPassword");
        }
      }

      if (name === "province") {
        if (touched.district || prev.district) {
          applyValidation("district");
        }
        if (touched.ward || prev.ward) {
          applyValidation("ward");
        }
      }

      if (name === "district" && (touched.ward || prev.ward)) {
        applyValidation("ward");
      }

      if (prev.form) {
        delete nextErrors.form;
      }

      return nextErrors;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => {
      const nextErrors = { ...prev };
      const message = validateField(name, formData[name], formData);

      if (message) {
        nextErrors[name] = message;
      } else {
        delete nextErrors[name];
      }

      return nextErrors;
    });
  };

  const getFieldError = (fieldName) => {
    if (!touched[fieldName] && !errors[fieldName]) {
      return "";
    }

    return errors[fieldName] || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = Object.keys(INITIAL_FORM_DATA).reduce(
      (result, key) => ({ ...result, [key]: true }),
      {},
    );
    const nextErrors = validateForm(formData);

    setTouched(allTouched);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      setTouched({});
    } catch (err) {
      const serverFieldErrors = err?.fieldErrors;

      if (serverFieldErrors && typeof serverFieldErrors === "object") {
        setErrors((prev) => ({ ...prev, ...serverFieldErrors }));
        setTouched((prev) =>
          Object.keys(serverFieldErrors).reduce(
            (result, key) => ({ ...result, [key]: true }),
            { ...prev },
          ),
        );
      } else {
        setErrors({
          form: err?.message || "Đăng ký thất bại. Vui lòng thử lại.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Class dùng chung để đồng nhất với LoginForm
  const inputBaseClass =
    "w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm text-base";

  const inputErrorClass = "border-rose-400 focus:border-rose-500 focus:ring-rose-300";
  const getInputClassName = (fieldName, extraClassName = "") => {
    const hasError = Boolean(getFieldError(fieldName));
    return `${inputBaseClass} ${hasError ? inputErrorClass : ""} ${extraClassName}`.trim();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-2 bg-white">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {errors.form ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errors.form}
          </p>
        ) : null}

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
              onBlur={handleBlur}
              required
              minLength={2}
              maxLength={80}
              className={getInputClassName("fullName")}
              placeholder="Nguyễn Văn A"
            />
            {getFieldError("fullName") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("fullName")}</p>
            ) : null}
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Số điện thoại
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={11}
              className={getInputClassName("phone")}
              placeholder="09xx xxx xxx"
            />
            {getFieldError("phone") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("phone")}</p>
            ) : null}
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
              onBlur={handleBlur}
              required
              className={getInputClassName("province", "py-3 text-sm")}
            >
              <option value="">Chọn Tỉnh</option>
              {provinces.map((p, i) => (
                <option key={i} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            {getFieldError("province") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("province")}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-xs font-bold mb-1 text-gray-500 uppercase">
              Quận/Huyện
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!formData.province}
              required
              className={getInputClassName("district", "py-3 text-sm")}
            >
              <option value="">Chọn Huyện</option>
              {districts.map((d, i) => (
                <option key={i} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            {getFieldError("district") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("district")}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-xs font-bold mb-1 text-gray-500 uppercase">
              Phường/Xã
            </label>
            <select
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!formData.district}
              required
              className={getInputClassName("ward", "py-3 text-sm")}
            >
              <option value="">Chọn Xã</option>
              {wards.map((w, i) => (
                <option key={i} value={w.name}>
                  {w.name}
                </option>
              ))}
            </select>
            {getFieldError("ward") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("ward")}</p>
            ) : null}
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
              onBlur={handleBlur}
              required
              minLength={5}
              maxLength={200}
              className={getInputClassName("streetAddress")}
              placeholder="Số nhà, tên đường..."
            />
            {getFieldError("streetAddress") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("streetAddress")}</p>
            ) : null}
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
              onBlur={handleBlur}
              required
              className={getInputClassName("email")}
              placeholder="example@gmail.com"
            />
            {getFieldError("email") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("email")}</p>
            ) : null}
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
              onBlur={handleBlur}
              required
              className={getInputClassName("gender", "h-13.5")}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            {getFieldError("gender") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("gender")}</p>
            ) : null}
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
                onBlur={handleBlur}
                required
                max={maxBirthDate}
                className={getInputClassName("dateOfBirth", "h-13.5")}
              />
            </div>
            {getFieldError("dateOfBirth") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("dateOfBirth")}</p>
            ) : null}
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
                onBlur={handleBlur}
                required
                minLength={8}
                className={getInputClassName("password", "pr-12")}
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
            {getFieldError("password") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("password")}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
                Mật khẩu: tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
              </p>
            )}
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
                onBlur={handleBlur}
                required
                className={getInputClassName("confirmPassword", "pr-12")}
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
            {getFieldError("confirmPassword") ? (
              <p className="mt-1 text-xs text-rose-600">{getFieldError("confirmPassword")}</p>
            ) : null}
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
              onBlur={handleBlur}
              className="w-4 h-4 accent-emerald-600"
            />
            Tôi đồng ý với điều khoản dịch vụ
          </label>
          {getFieldError("agreeTerms") ? (
            <p className="-mt-1 text-xs text-rose-600">{getFieldError("agreeTerms")}</p>
          ) : null}

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
