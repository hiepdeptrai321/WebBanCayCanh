import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("login");
  const [loading, setLoading] = useState(true); // Thêm trạng thái chờ check token

  // 1. Tự động đăng nhập khi F5 trang web
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const openModal = (tab = "login") => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const persistSession = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  // 2. Hàm Đăng nhập
  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      persistSession(data);
      toast.success("Chào mừng bạn quay lại với Góc Xanh Shop!");
      closeModal();
    } catch (err) {
      toast.error(err.message || "Tài khoản hoặc mật khẩu chưa đúng");
      throw err; // Ném lỗi để LoginForm nhận diện và reset CAPTCHA
    }
  };

  const loginWithGoogle = async (credential) => {
    try {
      const data = await authService.loginWithGoogle({ credential });
      persistSession(data);
      toast.success("Đăng nhập Gmail thành công!");
      closeModal();
    } catch (err) {
      toast.error(err.message || "Đăng nhập Gmail thất bại");
      throw err;
    }
  };

  // 3. Hàm Đăng ký
  const register = async (formData) => {
    await authService.register(formData);
    toast.success("Đăng ký thành công! Vui lòng đăng nhập");
    setModalTab("login");
  };

  // 4. Hàm Quên mật khẩu (Thêm mới)
  const resetPassword = async (resetData) => {
    try {
      const data = await authService.resetPassword(resetData);
      toast.success("Mật khẩu đã được cập nhật thành công! 🔓");
      setModalTab("login");
      return data;
    } catch (err) {
      toast.error(err.message || "Không thể đặt lại mật khẩu");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    toast.success("Đã đăng xuất khỏi hệ thống");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isModalOpen,
        modalTab,
        openModal,
        closeModal,
        login,
        loginWithGoogle,
        register,
        resetPassword,
        logout,
        setModalTab,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
