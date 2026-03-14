import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, totalPrice, setCartItems } = useCart();
  const navigate = useNavigate();
  const SHIPPING_FEE = 30000;

  const [orderInfo, setOrderInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    recipientName: '',
    recipientPhone: '',
    province: '',
    district: '',
    ward: '',
    streetAddress: '',
    paymentMethod: 'COD', // Giá trị mặc định ban đầu
    note: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOrder = {
      orderCode: `ORD${Date.now()}`,
      userId: null,
      customerInfo: {
        fullName: orderInfo.fullName,
        phone: orderInfo.phone,
        email: orderInfo.email
      },
      shippingAddress: {
        recipientName: orderInfo.recipientName || orderInfo.fullName,
        phone: orderInfo.recipientPhone || orderInfo.phone,
        province: orderInfo.province,
        district: orderInfo.district,
        ward: orderInfo.ward,
        streetAddress: orderInfo.streetAddress
      },
      items: cartItems.map(item => ({
        productId: item.productId,
        productName: item.name,
        unitPrice: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      })),
      pricing: {
        subtotal: totalPrice,
        shippingFee: SHIPPING_FEE,
        discountAmount: 0,
        totalAmount: totalPrice + SHIPPING_FEE
      },
      payment: {
        method: orderInfo.paymentMethod, // Sẽ gửi đi: "COD" | "bank_transfer" | "momo"
        status: "pending",
        transactionCode: null,
        paidAt: null
      },
      status: "pending_confirmation",
      note: orderInfo.note,
      orderedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await createOrder(finalOrder);
      alert("Đặt hàng thành công!");
      if (setCartItems) setCartItems([]);
      navigate('/');
    } catch (err) {
      alert("Lỗi kết nối: " + err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        {/* ... (Các phần Input thông tin cá nhân và địa chỉ giữ nguyên như bản trước) ... */}

        <div className="pt-4 border-t">
          <h3 className="font-bold mb-3 text-gray-700">Phương thức thanh toán</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50 transition">
              <input type="radio" name="paymentMethod" value="COD"
                checked={orderInfo.paymentMethod === 'COD'} onChange={handleInputChange} />
              <div>
                <p className="font-medium text-gray-800">Thanh toán khi nhận hàng (COD)</p>
                <p className="text-xs text-gray-500">Thanh toán bằng tiền mặt khi shipper giao cây đến.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50 transition">
              <input type="radio" name="paymentMethod" value="bank_transfer"
                checked={orderInfo.paymentMethod === 'bank_transfer'} onChange={handleInputChange} />
              <div>
                <p className="font-medium text-gray-800">Chuyển khoản ngân hàng</p>
                <p className="text-xs text-gray-500">Chuyển khoản trực tiếp vào số tài khoản của Hiệp Garden.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50 transition">
              <input type="radio" name="paymentMethod" value="momo"
                checked={orderInfo.paymentMethod === 'momo'} onChange={handleInputChange} />
              <div>
                <p className="font-medium text-gray-800">Ví điện tử MoMo</p>
                <p className="text-xs text-gray-500">Quét mã QR để thanh toán nhanh qua ứng dụng MoMo.</p>
              </div>
            </label>
          </div>
        </div>

        <button type="submit" className="w-full bg-green-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition shadow-lg uppercase tracking-wide">
          Xác nhận đặt hàng
        </button>
      </form>

      {/* ... (Phần tóm tắt đơn hàng bên phải giữ nguyên) ... */}
    </div>
  );
};

export default CheckoutPage;