import { useMemo, useState } from "react";
import { CheckCircle2, SendHorizontal, TriangleAlert } from "lucide-react";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const subjectOptions = [
  "Tư vấn chọn cây",
  "Theo dõi đơn hàng",
  "Vận chuyển & giao nhận",
  "Đổi trả & bảo hành",
  "Hỗ trợ chăm sóc cây",
  "Khác",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+84|0)\d{9,10}$/;

function validate(values) {
  const nextErrors = {};

  if (!values.fullName.trim()) {
    nextErrors.fullName = "Vui lòng nhập họ và tên.";
  }

  if (!values.email.trim()) {
    nextErrors.email = "Vui lòng nhập email.";
  } else if (!emailRegex.test(values.email.trim())) {
    nextErrors.email = "Email chưa đúng định dạng.";
  }

  const compactPhone = values.phone.replace(/\s+/g, "");
  if (!compactPhone) {
    nextErrors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!phoneRegex.test(compactPhone)) {
    nextErrors.phone = "Số điện thoại chưa hợp lệ.";
  }

  if (!values.subject) {
    nextErrors.subject = "Vui lòng chọn chủ đề hỗ trợ.";
  }

  if (!values.message.trim()) {
    nextErrors.message = "Vui lòng nhập nội dung yêu cầu.";
  } else if (values.message.trim().length < 20) {
    nextErrors.message = "Nội dung cần ít nhất 20 ký tự để hỗ trợ tốt hơn.";
  }

  return nextErrors;
}

function SupportRequestForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("error");
      setSubmitMessage("Vui lòng kiểm tra lại các trường thông tin.");
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (typeof navigator !== "undefined" && !navigator.onLine) {
            reject(new Error("Không có kết nối mạng."));
            return;
          }
          resolve();
        }, 900);
      });

      setValues(initialValues);
      setSubmitState("success");
      setSubmitMessage(
        "Yêu cầu đã được gửi thành công. Đội ngũ hỗ trợ sẽ liên hệ sớm nhất.",
      );
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Gửi yêu cầu thất bại. Vui lòng thử lại sau.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (fieldName) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${
      errors[fieldName] ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-white"
    }`;

  return (
    <section id="support-form" className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.2fr] lg:gap-10">
          <div className="rounded-3xl border border-emerald-100 bg-[#f8fbf5] p-8">
            <h2 className="text-3xl font-bold text-emerald-900 md:text-4xl">
              Gửi yêu cầu hỗ trợ
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Điền thông tin để nhận tư vấn theo nhu cầu cụ thể của bạn. Đội ngũ
              Góc Xanh sẽ phản hồi nhanh qua điện thoại hoặc email.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                Tư vấn chọn cây theo không gian nhà ở, văn phòng, quán cafe.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                Hỗ trợ tình trạng đơn hàng và thời gian giao nhận.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                Hướng dẫn chăm sóc cây sau mua theo từng loại cụ thể.
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleFieldChange}
                    className={fieldClass("fullName")}
                    placeholder="Nhập họ và tên"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleFieldChange}
                    className={fieldClass("email")}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleFieldChange}
                    className={fieldClass("phone")}
                    placeholder="09xxxxxxxx"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Chủ đề hỗ trợ
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleFieldChange}
                    className={fieldClass("subject")}
                  >
                    <option value="">Chọn chủ đề</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Nội dung yêu cầu
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleFieldChange}
                  rows={5}
                  className={fieldClass("message")}
                  placeholder="Mô tả chi tiết yêu cầu để đội ngũ hỗ trợ nhanh và chính xác hơn"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              {(submitState === "success" || submitState === "error") && (
                <div
                  className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
                    submitState === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                  role="status"
                >
                  {submitState === "success" ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  ) : (
                    <TriangleAlert size={18} className="mt-0.5 shrink-0" />
                  )}
                  <span>{submitMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <SendHorizontal size={18} />
                {isSubmitting ? "Đang gửi yêu cầu..." : "Gửi yêu cầu"}
              </button>

              {hasErrors && (
                <p className="text-xs text-gray-500">
                  Vui lòng điền đầy đủ thông tin để đội ngũ hỗ trợ xử lý chính
                  xác hơn.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportRequestForm;
