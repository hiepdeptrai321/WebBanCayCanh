import BrandLeafIcon from '../common/BrandLeafIcon'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="mb-3 flex items-center gap-3 text-2xl font-bold text-white">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-green-600">
                <BrandLeafIcon size={20} className="text-white" />
              </span>
              <span>Góc Xanh Shop</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Website giới thiệu và bán cây cảnh mô phỏng, sản phẩm của Nhóm 2
              môn Phát triển giao diện ứng dụng.
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
              Thông tin website
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>12 Nguyễn Văn Bảo, Hạnh Thông, Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2">
                <span>👥</span>
                <span>Sản phẩm của Nhóm 2</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🎓</span>
                <span>Môn Phát triển giao diện ứng dụng</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Góc Xanh Shop. Website phục vụ học tập.</p>
          <p>Thiết kế bởi Nhóm 2 - môn Phát triển giao diện ứng dụng</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
