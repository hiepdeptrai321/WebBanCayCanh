import { API_BASE_URL } from "./productService";

const AUTH_API_URL = `${API_BASE_URL}/auth`;

export const authService = {
  // Đăng ký tài khoản
  register: async (userData) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(data.message || "Đăng ký thất bại");
        if (data.fieldErrors && typeof data.fieldErrors === "object") {
          error.fieldErrors = data.fieldErrors;
        }
        error.status = response.status;
        throw error;
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Không thể kết nối đến server");
    }
  },

  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Lỗi kết nối đăng nhập");
    }
  },

  loginWithGoogle: async (googlePayload) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(googlePayload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập Google thất bại");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Lỗi kết nối đăng nhập Google");
    }
  },

  // Đặt lại mật khẩu (PHẦN THÊM MỚI ĐỂ FIX LỖI)
  resetPassword: async (resetData) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/reset-password`, {
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
      const response = await fetch(`${AUTH_API_URL}/me`, {
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
