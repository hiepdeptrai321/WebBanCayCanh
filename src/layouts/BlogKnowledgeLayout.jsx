import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import FullscreenMenu from "../components/layout/FullscreenMenu";
import Footer from "../components/layout/Footer";

function BlogKnowledgeLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-[#d6decf] bg-[#fbfcf8]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" aria-label="Trang chủ" className="inline-flex items-center gap-3 text-[#2f5f40]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dff0dd] text-lg">
              🌿
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b8b7d]">Plant Journal</p>
              <p className="text-sm font-semibold tracking-[0.08em] uppercase">Goc Xanh Shop</p>
            </div>
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col justify-center items-center gap-1.5 p-3 group rounded-md hover:bg-green-50 transition-colors duration-300"
            aria-label="Mở menu"
          >
            <span className="block h-0.5 w-9 bg-gray-700 rounded-full transition-all duration-300 group-hover:bg-green-600 group-hover:translate-x-1" />
            <span className="block h-0.5 w-6 bg-gray-700 rounded-full transition-all duration-300 group-hover:bg-green-600 group-hover:w-9" />
            <span className="block h-0.5 w-9 bg-gray-700 rounded-full transition-all duration-300 group-hover:bg-green-600 group-hover:translate-x-1" />
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

export default BlogKnowledgeLayout;
