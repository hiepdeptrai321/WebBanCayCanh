import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../../components/auth/AuthModal";

export default function Register() {
  const { openModal } = useAuth();

  useEffect(() => {
    openModal("register");
  }, [openModal]);

  return <AuthModal />;
}
