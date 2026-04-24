import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BrandLeafIcon from "../common/BrandLeafIcon";

const baseMenuItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Giỏ hàng", href: "/cart" },
  { label: "Các cửa hàng", href: "/stores" },
  { label: "Kiến thức cây cảnh", href: "/blog" },
  { label: "Hỗ trợ", href: "/support" },
  { label: "Về chúng tôi", href: "/about" },
];

function FullscreenMenu({ isOpen, onClose }) {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = isAdmin
    ? [
        ...baseMenuItems,
        { label: "Quản lý cửa hàng", href: "/admin/dashboard" },
      ]
    : baseMenuItems;

  const handleNavigate = (href) => {
    onClose();
    navigate(href);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#f5f5f3] transition-all duration-500 ease-in-out ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute right-[30%] top-4 translate-x-1/2 p-2 text-gray-500 transition-colors duration-200 hover:text-gray-900"
        aria-label="Đóng menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="flex h-full flex-col md:flex-row">
        <div className="flex flex-col items-center justify-center border-b border-gray-200 px-12 py-16 md:w-1/2 md:border-b-0 md:border-r md:py-0">
          <div
            className={`flex flex-col items-center transition-all duration-700 delay-100 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="mb-8 text-center">
              <span className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-green-600">
                <BrandLeafIcon size={52} className="text-white" />
              </span>
              <h1 className="text-3xl font-bold uppercase tracking-[0.2em] text-gray-700">
                Góc Xanh
              </h1>
              <p className="mt-1 text-sm uppercase tracking-[0.35em] text-gray-400">
                Tiệm cây
              </p>
            </div>

            <a
              href="#"
              className="mb-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors duration-200 hover:border-green-500 hover:text-green-600"
              aria-label="Facebook"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>

            <p className="text-center text-xs leading-relaxed text-gray-400">
              Bản quyền &#169; 2026 Góc Xanh Shop.
              <br />
              Bảo lưu mọi quyền.
            </p>
          </div>
        </div>

        <div className="flex items-center px-12 py-12 md:w-1/2 md:px-20 md:py-0">
          <nav className="w-full">
            <ul className="space-y-1">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.href;

                return (
                  <li
                    key={item.href}
                    className={`transition-all duration-500 ${
                      isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isOpen ? `${150 + index * 50}ms` : "0ms",
                    }}
                  >
                    <button
                      onClick={() => handleNavigate(item.href)}
                      className={`block w-full border-b border-gray-100 py-3 text-left text-2xl font-light transition-colors duration-200 sm:text-3xl ${
                        isActive ? "text-green-600" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <span className="inline-flex items-center gap-3">
                        {isActive ? (
                          <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                        ) : null}
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default FullscreenMenu;
