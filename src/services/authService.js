const API_URL = "http://localhost:5001/api/auth";

export const authService = {
  // Đăng ký tài khoản
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng ký thất bại");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Không thể kết nối đến server");
    }
  },

  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Lỗi kết nối đăng nhập");
    }
  },

  // Đặt lại mật khẩu (PHẦN THÊM MỚI ĐỂ FIX LỖI)
  resetPassword: async (resetData) => {
    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData), // Gửi object chứa email và newPassword
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Cập nhật mật khẩu thất bại");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Lỗi kết nối khi đặt lại mật khẩu");
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async (token) => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Không thể lấy thông tin user");
      return await response.json();
    } catch (error) {
      console.error("Auth GetUser Error:", error);
      return null;
    }
  },
};
