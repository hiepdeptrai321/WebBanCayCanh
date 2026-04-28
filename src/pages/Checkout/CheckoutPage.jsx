import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder, getOrderPaymentStatus } from "../../services/orderService";

function formatCurrency(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")} đ`;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sepayOrder, setSepayOrder] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);

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
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
      clearCart();
      navigate("/");
    } catch (error) {
      alert(
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
      } else {
        alert("Hệ thống chưa ghi nhận thanh toán. Bạn vui lòng chờ thêm một chút.");
      }
    } catch (error) {
      alert(error.message || "Không thể kiểm tra trạng thái thanh toán.");
    } finally {
      setIsCheckingPayment(false);
    }
  };

  if (sepayOrder) {
    const payment = sepayOrder.payment || {};
    const isPaid = paymentStatus === "paid";

    return (
      <div className="min-h-screen bg-[#fafafa] py-10">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Thanh toán SePay
            </p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              Đơn hàng {sepayOrder.orderCode}
            </h1>
          </div>

          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              {payment.qrUrl ? (
                <img
                  src={payment.qrUrl}
                  alt={`QR thanh toán đơn ${sepayOrder.orderCode}`}
                  className="mx-auto aspect-square w-full max-w-[280px] rounded-md border border-gray-100"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-md bg-gray-100 text-sm text-gray-500">
                  Chưa có mã QR
                </div>
              )}

              <div
                className={`mt-5 rounded-md px-4 py-3 text-sm font-semibold ${
                  isPaid
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {isPaid
                  ? "Thanh toán thành công"
                  : "Đang chờ khách chuyển khoản"}
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Thông tin chuyển khoản
              </h2>

              <div className="mt-5 divide-y divide-gray-100 rounded-md border border-gray-100">
                <div className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <span className="text-gray-500">Ngân hàng</span>
                  <span className="font-semibold text-gray-900">
                    {payment.bankCode || "Chưa cấu hình"}
                  </span>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <span className="text-gray-500">Số tài khoản</span>
                  <span className="font-semibold text-gray-900">
                    {payment.accountNumber || "Chưa cấu hình"}
                  </span>
                </div>
                {payment.accountName ? (
                  <div className="flex justify-between gap-4 px-4 py-3 text-sm">
                    <span className="text-gray-500">Chủ tài khoản</span>
                    <span className="font-semibold text-gray-900">
                      {payment.accountName}
                    </span>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <span className="text-gray-500">Số tiền</span>
                  <span className="font-semibold text-green-700">
                    {formatCurrency(sepayOrder.pricing?.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <span className="text-gray-500">Nội dung</span>
                  <span className="font-semibold text-gray-900">
                    {payment.transferContent || sepayOrder.orderCode}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Sau khi bạn chuyển khoản đúng số tiền và nội dung, hệ thống sẽ tự
                cập nhật trạng thái thanh toán.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {isPaid ? (
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="rounded-md bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    Về trang chủ
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleManualPaymentCheck}
                    disabled={isCheckingPayment}
                    className="rounded-md bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {isCheckingPayment
                      ? "Đang kiểm tra..."
                      : "Tôi đã thanh toán, kiểm tra lại"}
                  </button>
                )}

                <Link
                  to="/products"
                  className="rounded-md border border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
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
      <div className="py-20 text-center text-gray-500">
        Chưa có sản phẩm để thanh toán.{" "}
        <Link to="/products" className="text-green-600 underline">
          Quay lại mua hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-2xl font-bold text-gray-800">Thanh toán</h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1fr_400px]"
        >
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-800">
                Thông tin nhận hàng
              </h2>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-gray-600">
                    Họ và tên *
                  </label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-600">
                    Số điện thoại *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0901234567"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="email@example.com"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm text-gray-600">
                  Địa chỉ giao hàng *
                </label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ví dụ: Đường Phan Văn Trị, TP.HCM..."
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Ghi chú đơn hàng
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ghi chú thêm về thời gian giao hàng..."
                />
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-800">
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 transition hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="h-5 w-5 text-green-600"
                  />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 transition hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleChange}
                    className="h-5 w-5 text-green-600"
                  />
                  <span>Chuyển khoản ngân hàng</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 transition hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="sepay"
                    checked={formData.paymentMethod === "sepay"}
                    onChange={handleChange}
                    className="h-5 w-5 text-green-600"
                  />
                  <span>Thanh toán QR tự động qua SePay</span>
                </label>
              </div>
            </div>
          </div>

          <div className="sticky top-4 h-fit rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-gray-800">
              Đơn hàng của bạn
            </h2>

            <div className="mb-6 space-y-4 border-b pb-6">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id || item.productId}
                  className="flex justify-between text-sm"
                >
                  <span className="flex-1 pr-4 text-gray-600">
                    {item.name}{" "}
                    <span className="font-medium text-gray-400">
                      x{item.quantity}
                    </span>
                  </span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency((item.price || 0) * (item.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-6 space-y-3 border-b pb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-medium">{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí giao hàng</span>
                <span className="font-medium">
                  {formatCurrency(shippingFee)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span className="font-medium">
                    -{formatCurrency(discount)}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-8 flex items-center justify-between">
              <span className="font-bold text-gray-800">Tổng cộng</span>
              <span className="text-2xl font-bold text-green-600">
                {formatCurrency(totalAmount)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-md py-3 font-bold text-white transition ${
                isSubmitting
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting
                ? "Đang xử lý..."
                : formData.paymentMethod === "sepay"
                  ? "Tạo mã QR SePay"
                  : "Xác nhận đơn hàng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
