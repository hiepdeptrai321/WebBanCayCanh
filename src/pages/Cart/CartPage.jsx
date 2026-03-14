import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <span className="text-6xl mb-6">🛒</span>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Giỏ hàng</h1>
        <Link to="/" className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full transition-colors duration-300">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8 text-green-800 flex items-center gap-3">
        Giỏ hàng của bạn <span className="text-sm font-normal text-gray-500">({cart.length} sản phẩm)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.productId} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{item.productName}</h3>
                <p className="text-green-700 font-semibold">{item.unitPrice.toLocaleString()}đ</p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 border-r"
                    >-</button>
                    <span className="px-4 py-1 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 border-l"
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-400 hover:text-red-600 text-sm transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <p className="font-bold text-gray-800">
                  {(item.unitPrice * item.quantity).toLocaleString()}đ
                </p>
              </div>
            </div>
          ))}

          <Link to="/products" className="inline-block text-green-600 hover:underline mt-4">
            ← Tiếp tục mua sắm
          </Link>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl h-fit border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Tóm tắt đơn hàng</h2>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính</span>
              <span className="font-medium text-gray-900">{totalPrice.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Phí vận chuyển</span>
              <span className="text-sm italic">Tính ở trang thanh toán</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Tổng cộng</span>
              <span className="text-2xl font-bold text-red-600">{totalPrice.toLocaleString()}đ</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block w-full text-center bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1"
          >
            ĐẶT HÀNG NGAY
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;