function AboutPreview() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-green-600 font-medium text-sm uppercase tracking-widest">
          Về chúng tôi
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2 mb-6">
          WebCayCanh – Mang thiên nhiên vào mọi không gian
        </h2>
        <div className="w-16 h-1 bg-green-500 rounded-full mx-auto mb-8"></div>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-10">
          Chúng tôi là cửa hàng chuyên cây cảnh tại TP.HCM, cam kết cung cấp sản
          phẩm tươi tốt, đa dạng từ cây để bàn đến sân vườn. Với đội ngũ chăm
          sóc chuyên nghiệp và hệ thống cửa hàng tiện lợi, chúng tôi giúp bạn dễ
          dàng mang xanh vào nhà và văn phòng.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div>
            <p className="text-4xl font-bold text-green-700">200+</p>
            <p className="text-gray-500">Loại cây</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-700">3</p>
            <p className="text-gray-500">Chi nhánh</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-700">4.9★</p>
            <p className="text-gray-500">Đánh giá</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-700">Nhanh chóng</p>
            <p className="text-gray-500">Giao hàng</p>
          </div>
        </div>

        <a
          href="/about"
          className="mt-10 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 text-base"
        >
          Xem chi tiết →
        </a>
      </div>
    </section>
  );
}

export default AboutPreview;
