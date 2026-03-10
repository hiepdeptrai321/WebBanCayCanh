function PromotionBanner() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-400 px-8 py-14 sm:px-16">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                🎉 Ưu đãi đặc biệt
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Giảm giá 20% cho cây trong nhà
              </h2>
              <p className="text-green-100 text-base sm:text-lg">
                Ưu đãi trong thời gian có hạn. Đừng bỏ lỡ cơ hội sở hữu cây yêu thích của bạn.
              </p>
            </div>
            <div className="shrink-0">
              <button className="bg-white text-green-700 hover:bg-green-50 font-bold px-10 py-4 rounded-full text-base transition-colors duration-300 shadow-lg">
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromotionBanner
