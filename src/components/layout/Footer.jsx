function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-3">
              🌿 Góc Xanh Shop
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Mang thiên nhiên vào không gian sống của bạn với những loài cây
              cảnh đẹp, khỏe mạnh và được chăm sóc tận tình.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {['f', 'in', 'ig', 'yt'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-700 hover:bg-green-600 flex items-center justify-center text-xs font-bold text-white transition-colors duration-300"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-widest">
              Menu nhanh
            </h3>
            <ul className="space-y-2.5 text-sm">
              {['Trang chủ', 'Sản phẩm', 'Giỏ hàng', 'Liên hệ'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-widest">
              Danh mục
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                'Cây trong nhà',
                'Cây ngoài trời',
                'Cây mini',
                'Sen đá & Xương rồng',
              ].map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-widest">
              Liên hệ
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>123 Đường Lá Xanh, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:0901234567" className="hover:text-green-400 transition-colors">
                  0901 234 567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:hello@caycanhxanh.vn" className="hover:text-green-400 transition-colors">
                  hello@caycanhxanh.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Góc Xanh Shop. Tất cả quyền được bảo lưu.</p>
          <p>Thiết kế với 💚 bởi nhóm WebBanCayCanh</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
