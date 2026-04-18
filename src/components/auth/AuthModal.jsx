import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "../../pages/Auth/ForgotPasswordForm";
import BrandLeafIcon from "../common/BrandLeafIcon";
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
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
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
            <div className="flex items-center justify-between px-6 pt-6 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600">
                  <BrandLeafIcon size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-tight text-emerald-900">
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
              <div className="flex border-b px-6">
                {["login", "register"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setModalTab(tab)}
                    className={`flex-1 py-3.5 text-base font-medium transition-all ${
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
            <div
              className={`max-h-[85vh] overflow-y-auto custom-scrollbar ${
                modalTab === "register" ? "p-8" : "p-6"
              }`}
            >
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
