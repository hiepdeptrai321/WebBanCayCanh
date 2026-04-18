import { X, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "../../pages/Auth/ForgotPasswordForm";
export default function AuthModal() {
  const { isModalOpen, closeModal, modalTab, setModalTab } = useAuth();

  // Hàm xác định chiều rộng dựa trên Tab
  const getModalWidth = () => {
    if (modalTab === "register") return "900px";
    return "500px"; // Cả login và forgot đều dùng 500px
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              width: getModalWidth(),
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl w-full overflow-hidden border border-emerald-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Leaf className="text-emerald-700" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-900 leading-tight">
                    Góc Xanh Shop
                  </h2>
                  <p className="text-emerald-600 text-xs sm:text-sm">
                    Thiên nhiên cho không gian sống
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tab Switch - 2. Ẩn khi đang ở trang quên mật khẩu */}
            {modalTab !== "forgot" && (
              <div className="flex border-b px-8">
                {["login", "register"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setModalTab(tab)}
                    className={`flex-1 py-4 text-lg font-medium transition-all ${
                      modalTab === tab
                        ? "text-emerald-700 border-b-4 border-emerald-700"
                        : "text-gray-400"
                    }`}
                  >
                    {tab === "login" ? "Đăng nhập" : "Đăng ký thành viên"}
                  </button>
                ))}
              </div>
            )}

            {/* Form Area */}
            <div className="p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
              {/* 3. Logic hiển thị 3 trang */}
              {modalTab === "login" && <LoginForm />}
              {modalTab === "register" && <RegisterForm />}
              {modalTab === "forgot" && <ForgotPasswordForm />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
