import { useState } from "react";
import { Link } from "react-router-dom";
import LogoBlock from "./LogoBlock";
import FullscreenMenu from "./FullscreenMenu";
import { useCart } from "../../context/CartContext";
import AccountButton from "../auth/AccountButton";

function HeaderShop() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const itemCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <>
      <header className="relative z-50 bg-white w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-26 flex items-center justify-between">
            {" "}
            {/* Logo - Bên trái */}
            <div className="flex-shrink-0 pt-2">
              {" "}
              {/* pt-2 để logo hơi thả xuống một chút */}
              <Link to="/" aria-label="Trang chủ - Góc Xanh Shop">
                <LogoBlock size="xl" />
              </Link>
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
                className="p-4 rounded-2xl hover:bg-emerald-50 transition-all group"
                aria-label="Mở menu"
              >
                <div className="space-y-1.5">
                  <span className="block h-[2.5px] w-9 bg-gray-700 rounded-full group-hover:bg-emerald-600 transition-all" />
                  <span className="block h-[2.5px] w-7 bg-gray-700 rounded-full group-hover:bg-emerald-600 transition-all" />
                  <span className="block h-[2.5px] w-9 bg-gray-700 rounded-full group-hover:bg-emerald-600 transition-all" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default HeaderShop;
