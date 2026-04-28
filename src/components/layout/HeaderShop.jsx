import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoBlock from "./LogoBlock";
import FullscreenMenu from "./FullscreenMenu";
import { useCart } from "../../context/CartContext";
import AccountButton from "../auth/AccountButton";

function HeaderShop() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { cartItems } = useCart();
  const itemCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <>
      <header className="header-route-transition relative z-50 bg-white w-full border-b border-gray-100">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-28 items-center justify-between">
            {" "}
            {/* Logo - Bên trái */}
            <div className={isHomePage ? "w-48" : "shrink-0"}>
              {" "}
              {/* pt-2 để logo hơi thả xuống một chút */}
              {!isHomePage && (
                <Link to="/" aria-label="Trang chủ - Góc Xanh Shop">
                  <LogoBlock size="lg" />
                </Link>
              )}
            </div>
            {/* Icons bên phải - cách lề phải đẹp, dễ chỉnh */}
            <div className="flex items-center gap-5">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-4 rounded-2xl hover:bg-emerald-50 transition-all group"
                aria-label="Giỏ hàng"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-gray-700 group-hover:text-emerald-700 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <AccountButton />

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className="group inline-flex items-center justify-center rounded-md p-3 hover:bg-green-50 transition-colors duration-300"
                aria-label="Mở menu"
              >
                <span className="relative block h-[18px] w-9">
                  <span className="absolute left-0 top-0 h-[2.25px] w-9 rounded-full bg-gray-700 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-green-600" />
                  <span className="absolute left-1/2 top-1/2 h-[2.25px] w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-700 transition-all duration-300 group-hover:left-0 group-hover:w-9 group-hover:translate-x-0 group-hover:bg-green-600" />
                  <span className="absolute bottom-0 left-0 h-[2.25px] w-9 rounded-full bg-gray-700 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-green-600" />
                </span>
              </button>
            </div>
          </div>

          {isHomePage && (
            <Link
              to="/"
              aria-label="Trang chủ - Góc Xanh Shop"
              className="absolute left-6 lg:left-8 top-full -translate-y-1/2 mt-2.5 z-60"
            >
              <LogoBlock size="xxl" />
            </Link>
          )}
        </div>
      </header>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default HeaderShop;
