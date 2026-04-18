import { User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";

export default function AccountButton() {
  const { user, openModal, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 p-3 rounded-md hover:bg-green-50 transition-colors group"
          aria-label="Tài khoản"
        >
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200">
            <User size={20} className="text-emerald-700" />
          </div>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 z-50 border border-emerald-100">
            <div className="px-4 py-3 border-b">
              <p className="font-medium text-gray-800">
                {user.fullName || user.name}
              </p>
              <p className="text-xs text-gray-500">
                {user.email || user.phone}
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                setShowDropdown(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-3"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => openModal("login")}
      className="flex items-center gap-2 p-3 rounded-md hover:bg-green-50 transition-colors group"
      aria-label="Đăng nhập"
    >
      <User
        size={24}
        className="text-gray-700 group-hover:text-emerald-600 transition-colors"
      />
    </button>
  );
}
