import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // 1. IMPORT KHO CHỨA

function CartPage() {
  const navigate = useNavigate();

  // 2. LẤY DỮ LIỆU VÀ HÀM XỬ LÝ TỪ KHO CHỨA THẬT
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = (id, amount) => {
    updateQuantity(id, amount);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const subTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#fafafa]">
        <span className="text-6xl mb-6">🛒</span>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Giỏ hàng trống</h1>
        <p className="text-gray-500 mb-8">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
        <Link to="/products" className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-md transition">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Giỏ hàng của bạn</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Cột danh sách sản phẩm */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="pb-4 font-medium">Sản phẩm</th>
                  <th className="pb-4 font-medium text-center">Số lượng</th>
                  <th className="pb-4 font-medium text-right">Tạm tính</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b last:border-0">
                    <td className="py-4 flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md border" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.price?.toLocaleString('vi-VN')} ₫</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleUpdateQuantity(item._id, -1)} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200">-</button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item._id, 1)} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200">+</button>
                      </div>
                    </td>
                    <td className="py-4 text-right font-semibold text-gray-800">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                    </td>
                    <td className="py-4 text-right">
                      <button onClick={() => handleRemoveItem(item._id)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6">
              <Link to="/products" className="text-green-600 hover:text-green-700 text-sm font-medium">
                &larr; Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Cột tổng kết */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Tổng đơn hàng</h2>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Tạm tính:</span>
              <span className="font-medium">{(subTotal).toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="border-t pt-4 mb-6 flex justify-between items-center">
              <span className="font-bold text-gray-800">Tổng tiền:</span>
              <span className="text-2xl font-bold text-green-600">{(subTotal).toLocaleString('vi-VN')} ₫</span>
            </div>
            <p className="text-xs text-gray-500 mb-6 text-center">Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition"
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;