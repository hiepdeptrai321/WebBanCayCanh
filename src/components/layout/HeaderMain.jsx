import { useState } from 'react'
import LogoBlock from './LogoBlock'
import FullscreenMenu from './FullscreenMenu'

function HeaderMain() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Header: thin white bar, logo centered overlapping banner, hamburger top-right */}
      <header className="relative z-50 bg-white w-full h-14">

        {/* Logo – slightly left of center, anchored to top of header, hangs into banner */}
        <div className="absolute left-[30%] -translate-x-1/2 top-0 z-50">
          <a href="/" aria-label="Trang chủ">
            <LogoBlock size="xl" />
          </a>
        </div>

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
      </header>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}/>
    </>
  )
}

export default HeaderMain
