import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { openModal } = useAuth();

  useEffect(() => {
    openModal("register");
  }, [openModal]);

  return null;
}
