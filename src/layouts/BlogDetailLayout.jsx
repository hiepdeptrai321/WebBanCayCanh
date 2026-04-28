import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import FullscreenMenu from "../components/layout/FullscreenMenu";
import Footer from "../components/layout/Footer";
import BrandLeafIcon from "../components/common/BrandLeafIcon";
import { useCart } from "../context/CartContext";
import AccountButton from "../components/auth/AccountButton";

function BlogDetailLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const itemCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <div>
      <header className="header-route-transition sticky top-0 z-50 border-b border-[#d6decf] bg-[#fbfcf8]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" aria-label="Trang chủ" className="inline-flex min-w-0 items-center gap-3 text-[#2f5f40]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2f5f40]">
              <BrandLeafIcon size={19} className="text-white" />
            </span>
            <div className="hidden min-w-0 sm:block">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b8b7d]">Nhật ký cây xanh</p>
              <p className="text-sm font-semibold tracking-[0.08em] uppercase">Góc Xanh Shop</p>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <Link
              to="/cart"
              className="group relative rounded-md p-3 transition-colors duration-300 hover:bg-green-50"
              aria-label="Giỏ hàng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 transition-colors group-hover:text-green-600"
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
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <AccountButton />

            <button
              onClick={() => setMenuOpen(true)}
              className="group inline-flex items-center justify-center rounded-md p-3 transition-colors duration-300 hover:bg-green-50"
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
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}

export default BlogDetailLayout;
