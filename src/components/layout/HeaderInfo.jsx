import { useState } from "react";
import { Link } from "react-router-dom";
import LogoBlock from "./LogoBlock";
import FullscreenMenu from "./FullscreenMenu";
import { useCart } from "../../context/CartContext";
import AccountButton from "../auth/AccountButton";

function HeaderInfo({ title = "", bgImage = defaultBg }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const itemCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <>
      <div className="relative z-40">
        {/* White Bar + Icons */}
        <div className="relative bg-white w-full h-14 border-b border-gray-100">
          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">
            <Link to="/" aria-label="Trang chủ - Góc Xanh Shop">
              <LogoBlock size="xl" />
            </Link>
          </div>

          {/* Right Side: Cart + Account + Hamburger - CÁCH LỀ ĐẸP */}
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex items-center gap-3">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center p-3 group rounded-xl hover:bg-emerald-50 transition-all"
              aria-label="Giỏ hàng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-700 group-hover:text-emerald-600"
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Account Button */}
            <AccountButton />

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col justify-center items-center gap-[6px] p-3 group rounded-xl hover:bg-emerald-50 transition-all"
              aria-label="Mở menu"
            >
              <span className="block h-[2.5px] w-8 bg-gray-700 rounded-full transition-all group-hover:bg-emerald-600 group-hover:w-9" />
              <span className="block h-[2.5px] w-6 bg-gray-700 rounded-full transition-all group-hover:bg-emerald-600 group-hover:w-8" />
              <span className="block h-[2.5px] w-8 bg-gray-700 rounded-full transition-all group-hover:bg-emerald-600 group-hover:w-9" />
            </button>
          </div>
        </div>

        {/* Banner với background */}
        {bgImage && (
          <div
            className="relative w-full h-64 flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            {title && (
              <h1 className="relative z-10 text-white text-3xl md:text-4xl font-bold drop-shadow-md">
                {title}
              </h1>
            )}
          </div>
        )}
      </div>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default HeaderInfo;
