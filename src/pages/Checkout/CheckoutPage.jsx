import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/orderService";

function CheckoutPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    paymentMethod: "cod"
  });

  const subTotal = cartItems.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);
  const shippingFee = 30000;
  const discount = 0;
  const totalAmount = subTotal + shippingFee - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customerInfo: formData,
        items: cartItems,
        totalAmount: totalAmount,
        status: "pending"
      };

      // Gọi API tạo đơn hàng
      await createOrder(orderData);

      alert("🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");

      // Thanh toán xong thì làm trống giỏ hàng
      clearCart();

      navigate("/");

    } catch (error) {
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng kiểm tra lại kết nối Backend.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        Chưa có sản phẩm để thanh toán. <Link to="/products" className="text-green-600 underline">Quay lại mua hàng</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Thanh toán</h1>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Cột thông tin khách hàng */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Thông tin nhận hàng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Họ và tên *</label>
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Số điện thoại *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="0901234567" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="email@example.com" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Địa chỉ giao hàng *</label>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ví dụ: Đường Phan Văn Trị, TP.HCM..." />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Ghi chú đơn hàng</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ghi chú thêm về thời gian giao hàng..."></textarea>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Phương thức thanh toán</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition">
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="w-5 h-5 text-green-600" />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition">
                  <input type="radio" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={handleChange} className="w-5 h-5 text-green-600" />
                  <span>Chuyển khoản ngân hàng</span>
                </label>
              </div>
            </div>
          </div>

          {/* Cột tóm tắt đơn hàng */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-4">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Đơn hàng của bạn</h2>

            <div className="space-y-4 mb-6 border-b pb-6">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600 flex-1 pr-4">{item.name} <span className="text-gray-400 font-medium">x{item.quantity}</span></span>
                  <span className="font-medium text-gray-800">{((item.price || 0) * (item.quantity || 1)).toLocaleString('vi-VN')} ₫</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 border-b pb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-medium">{(subTotal).toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí giao hàng</span>
                <span className="font-medium">{(shippingFee).toLocaleString('vi-VN')} ₫</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span className="font-medium">-{(discount).toLocaleString('vi-VN')} ₫</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-gray-800">Tổng cộng</span>
              <span className="text-2xl font-bold text-green-600">{(totalAmount).toLocaleString('vi-VN')} ₫</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white font-bold py-3 rounded-md transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;