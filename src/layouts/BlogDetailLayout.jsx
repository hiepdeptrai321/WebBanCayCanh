import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import FullscreenMenu from "../components/layout/FullscreenMenu";
import Footer from "../components/layout/Footer";
import BrandLeafIcon from "../components/common/BrandLeafIcon";

function BlogDetailLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-[#d6decf] bg-[#fbfcf8]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" aria-label="Trang chủ" className="inline-flex items-center gap-3 text-[#2f5f40]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2f5f40]">
              <BrandLeafIcon size={19} className="text-white" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b8b7d]">Plant Journal</p>
              <p className="text-sm font-semibold tracking-[0.08em] uppercase">Goc Xanh Shop</p>
            </div>
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="group inline-flex items-center justify-center rounded-md p-3 hover:bg-green-50 transition-colors duration-300"
            aria-label="Mở menu"
          >
            <span className="relative block h-5 w-9">
              <span style={{ height: "2px", top: "1px" }} className="absolute left-0 w-9 rounded-full bg-gray-700 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-green-600" />
              <span style={{ height: "2px", top: "9px" }} className="absolute left-1/2 w-6 -translate-x-1/2 rounded-full bg-gray-700 transition-all duration-300 group-hover:left-0 group-hover:w-9 group-hover:translate-x-0 group-hover:bg-green-600" />
              <span style={{ height: "2px", top: "17px" }} className="absolute left-0 w-9 rounded-full bg-gray-700 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-green-600" />
            </span>
          </button>
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
