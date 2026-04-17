import { API_BASE_URL } from './productService';

// Hàm tạo đơn hàng mới (Gửi dữ liệu lên Server)
export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    // Cố gắng lấy thông báo lỗi từ backend (nếu có)
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Lỗi khi tạo đơn hàng. Vui lòng thử lại sau.');
  }

  return response.json();
}

// Hàm lấy thông tin đơn hàng theo ID (Dùng cho trang Chi tiết đơn hàng/Cảm ơn)
export async function getOrderById(id) {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`);

  if (!response.ok) {
    throw new Error(`Không tìm thấy thông tin đơn hàng (${response.status})`);
  }

  return response.json();
}