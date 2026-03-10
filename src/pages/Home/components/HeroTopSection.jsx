import heroBg from '../../../assets/images/homeBackground.jpeg'

function HeroTopSection() {
  return (
    // -mt-14 pulls the hero up behind the header so the logo overlaps into the banner
    <section className="relative w-full h-[340px] sm:h-[400px] md:h-[440px] overflow-hidden -mt-14">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Text – sits below the logo's bottom edge (logo is 128px, header 56px → overlap 72px) */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-28 sm:pt-24">
        <h1 className="text-white text-3xl sm:text-5xl md:text-[3.5rem] font-bold tracking-wide drop-shadow-lg leading-tight">
          Không gian xanh
        </h1>
        <h2 className="text-white text-lg sm:text-2xl md:text-3xl font-light tracking-[0.25em] mt-2 uppercase drop-shadow">
          Cho cuộc sống hiện đại
        </h2>
        <p className="text-white/70 text-sm sm:text-base mt-4 max-w-lg leading-relaxed drop-shadow">
          Cây cảnh đẹp – giải pháp trang trí và thư giãn cho ngôi nhà của bạn
        </p>
      </div>
    </section>
  )
}

export default HeroTopSection
