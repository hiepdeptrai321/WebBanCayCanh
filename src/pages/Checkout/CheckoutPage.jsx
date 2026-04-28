import { createElement, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  Leaf,
  MapPin,
  PackageCheck,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { createOrder, getOrderPaymentStatus } from "../../services/orderService";

const cardClass =
  "rounded-[24px] border border-[#DDEFE3] bg-white p-6 shadow-[0_18px_45px_rgba(23,59,46,0.07)] sm:p-8";

const inputClass =
  "h-[52px] w-full rounded-[14px] border border-[#DDEFE3] bg-white px-4 text-[15px] text-[#173B2E] outline-none transition duration-200 placeholder:text-[#98A59E] focus:border-[#0FA34A] focus:ring-4 focus:ring-emerald-100";

const textareaClass =
  "min-h-[120px] w-full resize-y rounded-[14px] border border-[#DDEFE3] bg-white px-4 py-3 text-[15px] text-[#173B2E] outline-none transition duration-200 placeholder:text-[#98A59E] focus:border-[#0FA34A] focus:ring-4 focus:ring-emerald-100";

const paymentMethods = [
  {
    value: "cod",
    title: "Thanh toán khi nhận hàng (COD)",
    description: "Thanh toán trực tiếp khi nhận cây.",
    icon: Truck,
  },
  {
    value: "bank",
    title: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản thủ công theo thông tin shop cung cấp.",
    icon: Banknote,
  },
  {
    value: "sepay",
    title: "Thanh toán QR tự động qua SePay",
    description: "Quét mã QR và xác nhận thanh toán tự động.",
    icon: QrCode,
  },
];

function formatCurrency(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")} đ`;
}

function RequiredMark() {
  return <span className="text-[#0FA34A]">*</span>;
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="mb-6 flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#0FA34A]">
        {createElement(icon, { size: 21, strokeWidth: 1.8 })}
      </span>
      <div>
        <h2 className="text-xl font-bold text-[#173B2E]">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm leading-6 text-[#6B7A72]">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

function PaymentInfoRow({ label, value, highlight = false }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-[#6B7A72]">{label}</span>
      <span
        className={`font-semibold ${
          highlight ? "text-[#0FA34A]" : "text-[#173B2E]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function CheckoutPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sepayOrder, setSepayOrder] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const hasShownPaymentSuccess = useRef(false);

  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    paymentMethod: "cod",
  });

  const subTotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const shippingFee = 30000;
  const discount = 0;
  const totalAmount = subTotal + shippingFee - discount;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customerInfo: formData,
        payment: {
          method: formData.paymentMethod,
        },
        items: cartItems,
        totalAmount,
        status: "pending",
      };

      const createdOrder = await createOrder(orderData);

      if (formData.paymentMethod === "sepay") {
        setSepayOrder(createdOrder);
        setPaymentStatus(createdOrder.payment?.status || "pending");
        hasShownPaymentSuccess.current = false;
        toast.info("Mã QR SePay đã sẵn sàng. Bạn vui lòng chuyển khoản theo thông tin hiển thị.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      toast.success("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
      clearCart();
      navigate("/");
    } catch (error) {
      toast.error(
        error.message ||
          "Có lỗi xảy ra khi đặt hàng. Vui lòng kiểm tra lại kết nối Backend.",
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!sepayOrder || paymentStatus === "paid") {
      return undefined;
    }

    let isCancelled = false;
    const orderLookupId = sepayOrder.orderCode || sepayOrder._id;

    async function checkStatus() {
      try {
        const data = await getOrderPaymentStatus(orderLookupId);

        if (!isCancelled && data.paymentStatus === "paid") {
          setPaymentStatus("paid");
          clearCart();

          if (!hasShownPaymentSuccess.current) {
            toast.success("Đã ghi nhận thanh toán SePay.");
            hasShownPaymentSuccess.current = true;
          }
        }
      } catch (error) {
        console.error("Không thể kiểm tra trạng thái thanh toán SePay:", error);
      }
    }

    checkStatus();
    const timer = window.setInterval(checkStatus, 3000);

    return () => {
      isCancelled = true;
      window.clearInterval(timer);
    };
  }, [clearCart, paymentStatus, sepayOrder]);

  const handleManualPaymentCheck = async () => {
    if (!sepayOrder) {
      return;
    }

    setIsCheckingPayment(true);

    try {
      const orderLookupId = sepayOrder.orderCode || sepayOrder._id;
      const data = await getOrderPaymentStatus(orderLookupId);

      if (data.paymentStatus === "paid") {
        setPaymentStatus("paid");
        clearCart();

        if (!hasShownPaymentSuccess.current) {
          toast.success("Đã ghi nhận thanh toán SePay.");
          hasShownPaymentSuccess.current = true;
        }
      } else {
        toast.info("Hệ thống chưa ghi nhận thanh toán. Bạn vui lòng chờ thêm một chút.");
      }
    } catch (error) {
      toast.error(error.message || "Không thể kiểm tra trạng thái thanh toán.");
    } finally {
      setIsCheckingPayment(false);
    }
  };

  if (sepayOrder) {
    const payment = sepayOrder.payment || {};
    const isPaid = paymentStatus === "paid";
    const paymentAmount =
      sepayOrder.pricing?.totalAmount ??
      sepayOrder.totalAmount ??
      sepayOrder.totalPrice ??
      payment.amount ??
      0;

    return (
      <div className="min-h-screen bg-linear-to-br from-[#F7FBF8] via-[#FAFCF8] to-[#F3F8EF] py-10 text-[#173B2E]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 rounded-[24px] border border-[#DDEFE3] bg-white/75 p-6 shadow-[0_18px_45px_rgba(23,59,46,0.06)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0FA34A]">
              Thanh toán SePay
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#173B2E]">
              Đơn hàng {sepayOrder.orderCode}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7A72]">
              Quét mã QR hoặc chuyển khoản đúng nội dung để hệ thống tự động xác nhận thanh toán.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <div className={cardClass}>
              <div className="rounded-[22px] bg-[#F7FBF8] p-4 text-center">
                {payment.qrUrl ? (
                  <img
                    src={payment.qrUrl}
                    alt={`QR thanh toán đơn ${sepayOrder.orderCode}`}
                    className="mx-auto aspect-square w-full max-w-[280px] rounded-2xl border border-[#DDEFE3] bg-white p-2"
                  />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-dashed border-[#DDEFE3] bg-white text-sm text-[#6B7A72]">
                    Chưa có mã QR
                  </div>
                )}
              </div>

              <div
                className={`mt-5 flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${
                  isPaid
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                <CheckCircle2 size={18} />
                {isPaid ? "Thanh toán thành công" : "Đang chờ chuyển khoản"}
              </div>
            </div>

            <div className={cardClass}>
              <SectionHeader
                icon={CreditCard}
                title="Thông tin chuyển khoản"
                subtitle="Vui lòng kiểm tra kỹ số tiền và nội dung trước khi chuyển khoản."
              />

              <div className="divide-y divide-[#E6F2EA] overflow-hidden rounded-[18px] border border-[#DDEFE3] bg-[#FBFEFC]">
                <PaymentInfoRow label="Ngân hàng" value={payment.bankCode || "Chưa cấu hình"} />
                <PaymentInfoRow label="Số tài khoản" value={payment.accountNumber || "Chưa cấu hình"} />
                {payment.accountName ? (
                  <PaymentInfoRow label="Chủ tài khoản" value={payment.accountName} />
                ) : null}
                <PaymentInfoRow label="Số tiền" value={formatCurrency(paymentAmount)} highlight />
                <PaymentInfoRow
                  label="Nội dung"
                  value={payment.transferContent || sepayOrder.orderCode}
                />
              </div>

              <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm leading-6 text-[#4F665B]">
                Sau khi bạn chuyển khoản đúng số tiền và nội dung, hệ thống sẽ tự cập nhật trạng thái thanh toán.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {isPaid ? (
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="h-[52px] rounded-[14px] bg-[#0FA34A] px-6 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,163,74,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0B8F3F]"
                  >
                    Về trang chủ
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleManualPaymentCheck}
                    disabled={isCheckingPayment}
                    className="h-[52px] rounded-[14px] bg-[#0FA34A] px-6 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,163,74,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0B8F3F] disabled:cursor-not-allowed disabled:bg-[#AAB7B0] disabled:shadow-none disabled:hover:translate-y-0"
                  >
                    {isCheckingPayment
                      ? "Đang kiểm tra..."
                      : "Tôi đã thanh toán, kiểm tra lại"}
                  </button>
                )}

                <Link
                  to="/products"
                  className="flex h-[52px] items-center justify-center rounded-[14px] border border-[#DDEFE3] px-6 text-sm font-semibold text-[#173B2E] transition duration-200 hover:border-[#0FA34A] hover:bg-emerald-50"
                >
                  Tiếp tục mua hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] bg-linear-to-br from-[#F7FBF8] via-[#FAFCF8] to-[#F3F8EF] px-4 py-20">
        <div className="mx-auto max-w-xl rounded-[24px] border border-[#DDEFE3] bg-white p-8 text-center shadow-[0_18px_45px_rgba(23,59,46,0.07)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#0FA34A]">
            <Leaf size={26} strokeWidth={1.8} />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-[#173B2E]">
            Chưa có sản phẩm để thanh toán
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#6B7A72]">
            Hãy chọn thêm vài chậu cây xanh cho không gian của bạn trước khi đặt hàng.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-[14px] bg-[#0FA34A] px-6 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#0B8F3F]"
          >
            Quay lại mua hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F7FBF8] via-[#FAFCF8] to-[#F3F8EF] py-10 text-[#173B2E] sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[24px] border border-[#DDEFE3] bg-white/70 p-6 shadow-[0_18px_45px_rgba(23,59,46,0.06)] backdrop-blur sm:p-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm font-medium text-[#6B7A72]">
              <Link to="/" className="transition hover:text-[#0FA34A]">
                Trang chủ
              </Link>
              <span>/</span>
              <Link to="/cart" className="transition hover:text-[#0FA34A]">
                Giỏ hàng
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#0FA34A]">Thanh toán</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#173B2E] sm:text-4xl">
              Thanh toán
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B7A72] sm:text-base">
              Hoàn tất thông tin giao hàng và chọn phương thức thanh toán phù hợp.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#CFEBDD] bg-emerald-50 px-4 py-2 text-sm font-semibold text-[#0A7F39]">
            <ShieldCheck size={17} />
            Thanh toán an toàn
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]"
        >
          <div className="space-y-6">
            <section className={cardClass}>
              <SectionHeader
                icon={MapPin}
                title="Thông tin nhận hàng"
                subtitle="Vui lòng nhập chính xác thông tin để shop giao cây đến bạn."
              />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#4F665B]">
                    Họ và tên <RequiredMark />
                  </label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#4F665B]">
                    Số điện thoại <RequiredMark />
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="0901234567"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-[#4F665B]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="email@example.com"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-[#4F665B]">
                  Địa chỉ giao hàng <RequiredMark />
                </label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Ví dụ: Đường Phan Văn Trị, TP.HCM..."
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-[#4F665B]">
                  Ghi chú đơn hàng
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className={textareaClass}
                  placeholder="Ghi chú thêm về thời gian giao hàng..."
                />
              </div>
            </section>

            <section className={cardClass}>
              <SectionHeader
                icon={CreditCard}
                title="Phương thức thanh toán"
                subtitle="Chọn cách thanh toán thuận tiện nhất cho đơn hàng của bạn."
              />

              <div className="space-y-3">
                {paymentMethods.map(({ value, title, description, icon }) => {
                  const isSelected = formData.paymentMethod === value;

                  return (
                    <label
                      key={value}
                      className={`group flex cursor-pointer gap-4 rounded-[18px] border p-4 transition duration-200 ${
                        isSelected
                          ? "border-[#0FA34A] bg-emerald-50/80 shadow-[0_14px_32px_rgba(15,163,74,0.12)]"
                          : "border-[#DDEFE3] bg-white hover:-translate-y-0.5 hover:border-[#BFE5CE] hover:bg-[#FBFEFC]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={value}
                        checked={isSelected}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                          isSelected
                            ? "border-[#0FA34A] bg-[#0FA34A]"
                            : "border-[#B9C9C0] bg-white group-hover:border-[#0FA34A]"
                        }`}
                      >
                        {isSelected ? (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        ) : null}
                      </span>
                      <span className="flex min-w-0 flex-1 gap-3">
                        <span
                          className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:flex ${
                            isSelected
                              ? "bg-white text-[#0FA34A]"
                              : "bg-[#F7FBF8] text-[#6B7A72] group-hover:text-[#0FA34A]"
                          }`}
                        >
                          {createElement(icon, { size: 21, strokeWidth: 1.8 })}
                        </span>
                        <span>
                          <span className="block font-bold text-[#173B2E]">
                            {title}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-[#6B7A72]">
                            {description}
                          </span>
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[24px] border border-[#DDEFE3] bg-white p-6 shadow-[0_22px_55px_rgba(23,59,46,0.09)] lg:sticky lg:top-8 sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#0FA34A]">
                <ReceiptText size={21} strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="text-xl font-bold text-[#173B2E]">
                  Đơn hàng của bạn
                </h2>
                <p className="text-sm text-[#6B7A72]">
                  {cartItems.length} sản phẩm trong giỏ
                </p>
              </div>
            </div>

            <div className="space-y-4 border-b border-[#E6F2EA] pb-6">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id || item.productId}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <div className="min-w-0">
                    <p className="line-clamp-2 font-semibold leading-6 text-[#173B2E]">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-[#6B7A72]">
                      Số lượng: x{item.quantity || 1}
                    </p>
                  </div>
                  <span className="shrink-0 font-bold text-[#173B2E]">
                    {formatCurrency((item.price || 0) * (item.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-b border-[#E6F2EA] py-6 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-[#6B7A72]">Tạm tính</span>
                <span className="font-semibold text-[#173B2E]">
                  {formatCurrency(subTotal)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#6B7A72]">Phí giao hàng</span>
                <span className="font-semibold text-[#173B2E]">
                  {formatCurrency(shippingFee)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between gap-4 text-[#0FA34A]">
                  <span>Giảm giá</span>
                  <span className="font-semibold">
                    -{formatCurrency(discount)}
                  </span>
                </div>
              )}
            </div>

            <div className="py-6">
              <div className="flex items-end justify-between gap-4">
                <span className="text-base font-bold text-[#173B2E]">
                  Tổng cộng
                </span>
                <span className="text-2xl font-extrabold text-[#0FA34A]">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
              <p className="mt-3 rounded-2xl bg-[#F7FBF8] px-4 py-3 text-sm leading-6 text-[#6B7A72]">
                Phí giao hàng có thể được điều chỉnh theo khu vực.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex h-14 w-full items-center justify-center gap-2 rounded-[16px] text-base font-bold text-white transition duration-200 ${
                isSubmitting
                  ? "cursor-not-allowed bg-[#AAB7B0] shadow-none"
                  : "bg-[#0FA34A] shadow-[0_18px_34px_rgba(15,163,74,0.26)] hover:-translate-y-0.5 hover:bg-[#0B8F3F] hover:shadow-[0_22px_38px_rgba(15,163,74,0.32)]"
              }`}
            >
              <PackageCheck size={20} strokeWidth={1.9} />
              {isSubmitting ? "Đang xử lý..." : "Xác nhận đơn hàng"}
            </button>

            <Link
              to="/cart"
              className="mt-4 inline-flex w-full items-center justify-center rounded-[14px] border border-[#DDEFE3] px-4 py-3 text-sm font-semibold text-[#4F665B] transition duration-200 hover:border-[#0FA34A] hover:bg-emerald-50 hover:text-[#0FA34A]"
            >
              Xem lại giỏ hàng
            </Link>
          </aside>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
