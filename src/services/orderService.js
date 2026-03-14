const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';


export async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Không thể gửi đơn hàng về server');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi tại orderService (createOrder):", error.message);
    throw error;
  }
}


export async function getOrderById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Không thể tải chi tiết đơn hàng');
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi tại orderService (getOrderById):", error.message);
    throw error;
  }
}