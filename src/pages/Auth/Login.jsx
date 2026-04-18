import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../../components/auth/AuthModal";

export default function Login() {
  const { openModal } = useAuth();

  useEffect(() => {
    // Tự động mở modal khi vào trang /login
    openModal("login");
  }, [openModal]);

  return <AuthModal />;
}
