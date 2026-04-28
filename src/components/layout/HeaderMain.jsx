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
      </header>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}/>
    </>
  )
}

export default HeaderMain
