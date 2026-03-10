function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left – Text */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
              🌿 Cây cảnh tươi mỗi ngày
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              Mang thiên nhiên vào{' '}
              <span className="text-green-600">không gian sống</span>
            </h1>
            <p className="text-gray-500 text-lg sm:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
              Khám phá những loại cây cảnh đẹp giúp không gian của bạn trở nên
              xanh mát và thư giãn hơn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 text-base">
                Mua ngay
              </button>
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base">
                Xem bộ sưu tập
              </button>
            </div>
            {/* Stats */}
            <div className="flex gap-8 mt-10 justify-center lg:justify-start">
              <div>
                <p className="text-2xl font-bold text-gray-800">200+</p>
                <p className="text-sm text-gray-500">Loại cây</p>
              </div>
              <div className="border-l border-gray-300 pl-8">
                <p className="text-2xl font-bold text-gray-800">5000+</p>
                <p className="text-sm text-gray-500">Khách hàng</p>
              </div>
              <div className="border-l border-gray-300 pl-8">
                <p className="text-2xl font-bold text-gray-800">4.9★</p>
                <p className="text-sm text-gray-500">Đánh giá</p>
              </div>
            </div>
          </div>

          {/* Right – Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px]">
              <div className="absolute inset-0 bg-green-200 rounded-full opacity-40"></div>
              <div className="absolute inset-6 bg-green-300 rounded-full opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="https://placehold.co/420x420/d1fae5/16a34a?text=🌿+Cây+Cảnh"
                  alt="Cây cảnh đẹp"
                  className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute top-4 right-0 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
                <span className="text-green-500 text-xl">🌱</span>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Cây khỏe mạnh</p>
                  <p className="text-xs text-gray-400">100% tươi</p>
                </div>
              </div>
              <div className="absolute bottom-8 -left-4 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
                <span className="text-yellow-500 text-xl">🚚</span>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Giao hàng nhanh</p>
                  <p className="text-xs text-gray-400">24–48 giờ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
