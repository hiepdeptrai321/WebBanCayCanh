import { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoBlock from './LogoBlock'
import FullscreenMenu from './FullscreenMenu'
import { useCart } from '../../context/CartContext'

function HeaderShop() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cart } = useCart()
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <>
      <header className="relative z-50 bg-white w-full h-14">

        {/* Logo – slightly left of center, anchored to top of header, hangs into banner */}
        <div className="absolute left-[30%] -translate-x-1/2 top-0 z-50">
          <Link to="/" aria-label="Trang chủ">
            <LogoBlock size="xl" />
          </Link>
        </div>

        {/* Cart + Hamburger – right side */}
        <div className="absolute right-[30%] top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* Cart button */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center p-3 group rounded-md hover:bg-green-50 transition-colors duration-300"
            aria-label="Giỏ hàng"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors duration-300"
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
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Hamburger */}
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

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

export default HeaderShop
