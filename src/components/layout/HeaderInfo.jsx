import { useState } from "react";
import { Link } from "react-router-dom";
import LogoBlock from "./LogoBlock";
import FullscreenMenu from "./FullscreenMenu";
import defaultBg from "../../assets/images/background2.jpg";

function HeaderInfo({ title = "", bgImage = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Wrapper: white bar + banner, logo spans both */}
      <div className="relative z-40">
        {/* White bar */}
        <div className="relative bg-white w-full h-14 z-10">
          {/* Hamburger – inward from edge */}
          <div className="absolute right-[30%] top-1/2 -translate-y-1/2">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col justify-center items-center gap-[6px] p-3 group rounded-md hover:bg-green-50 transition-colors duration-300"
              aria-label="Mở menu"
            >
              <span className="block h-[2px] w-9 bg-gray-700 rounded-full transition-all duration-300 group-hover:bg-green-600 group-hover:translate-x-1" />
              <span className="block h-[2px] w-6 bg-gray-700 rounded-full transition-all duration-300 group-hover:bg-green-600 group-hover:w-9" />
              <span className="block h-[2px] w-9 bg-gray-700 rounded-full transition-all duration-300 group-hover:bg-green-600 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Banner */}
        {bgImage && (
          <div
            className="relative w-full h-64 flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            {/* Title */}
            {title && (
              <h1 className="relative z-10 text-white text-3xl md:text-4xl font-bold drop-shadow-md">
                {title}
              </h1>
            )}
          </div>
        )}

        {/* Logo – absolute, spans white bar + banner */}
        <div className="absolute left-[30%] -translate-x-1/2 top-5 z-50">
          <Link to="/" aria-label="Trang chủ">
            <LogoBlock size="xl" />
          </Link>
        </div>
      </div>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default HeaderInfo;
