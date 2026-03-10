import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const menuItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/products' },
  { label: 'Giỏ hàng', href: '/cart' },
  { label: 'Các cửa hàng', href: '/stores' },
  { label: 'Kiến thức cây cảnh', href: '/blog' },
  { label: 'Hỗ trợ', href: '/support' },
  { label: 'Về chúng tôi', href: '/about' },
  { label: 'Quản lý cửa hàng', href: '/admin' },
]

function FullscreenMenu({ isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (href) => {
    onClose()
    navigate(href)
  }

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#f5f5f3] transition-all duration-500 ease-in-out
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Close button – same screen position as hamburger (right-16, vertically centered in h-14 header) */}
      <button
        onClick={onClose}
        className="absolute top-4 right-[30%] translate-x-1/2 text-gray-500 hover:text-gray-900 transition-colors duration-200 p-2"
        aria-label="Đóng menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div className="h-full flex flex-col md:flex-row">

        {/* LEFT – Brand */}
        <div className="md:w-1/2 flex flex-col items-center justify-center px-12 py-16 md:py-0 border-b md:border-b-0 md:border-r border-gray-200">
          <div
            className={`flex flex-col items-center transition-all duration-700 delay-100
              ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Brand */}
            <div className="text-center mb-8">
              <span className="text-8xl block mb-4">🌿</span>
              <h1 className="text-3xl font-bold tracking-[0.2em] text-gray-700 uppercase">
                Góc Xanh
              </h1>
              <p className="text-sm tracking-[0.35em] text-gray-400 uppercase mt-1">
                Shop
              </p>
            </div>

            {/* Social icon */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-green-500 flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors duration-200 mb-10"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>

            {/* Copyright */}
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              Copyright © 2026 Góc Xanh Shop.<br />All rights reserved.
            </p>
          </div>
        </div>

        {/* RIGHT – Navigation */}
        <div className="md:w-1/2 flex items-center px-12 md:px-20 py-12 md:py-0">
          <nav className="w-full">
            <ul className="space-y-1">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.href
                return (
                  <li
                    key={item.href}
                    className={`transition-all duration-500
                      ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: isOpen ? `${150 + index * 50}ms` : '0ms' }}
                  >
                    <button
                      onClick={() => handleNavigate(item.href)}
                      className={`w-full text-left block text-2xl sm:text-3xl font-light py-3 border-b border-gray-100 transition-colors duration-200
                        ${isActive
                          ? 'text-green-600'
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      <span className="inline-flex items-center gap-3">
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                        )}
                        {item.label}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default FullscreenMenu
