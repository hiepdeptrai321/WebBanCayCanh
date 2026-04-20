import { useState, useEffect } from "react";

import banner1 from "../../../assets/images/home/banner/banner1.jpg";
import banner2 from "../../../assets/images/home/banner/banner2.jpg";
import banner3 from "../../../assets/images/home/banner/banner3.jpg";

const banners = [
  { id: 1, image: banner1 },
  { id: 2, image: banner2 },
  { id: 3, image: banner3 },
];

function HeroBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển slide mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-12">
      <div className="relative h-[420px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl">
        {/* Các ảnh banner */}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={banner.image}
              alt={`Banner ${banner.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* NÚT LƯỚT TRÁI */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-5 rounded-full backdrop-blur-md transition-all z-20 text-2xl"
          aria-label="Banner trước"
        >
          ←
        </button>

        {/* NÚT LƯỚT PHẢI */}
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-5 rounded-full backdrop-blur-md transition-all z-20 text-2xl"
          aria-label="Banner tiếp theo"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default HeroBannerSlider;
