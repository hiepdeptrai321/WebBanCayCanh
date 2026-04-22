import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../../assets/images/homeBackground.jpeg";

export default function HeroTopSection() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (trimmedInput) {
      console.log("🔍 Tìm kiếm:", trimmedInput);
      // Điều hướng đến trang sản phẩm với tham số tìm kiếm
      navigate(`/products?search=${encodeURIComponent(trimmedInput)}`);
    } else {
      console.log("⚠️ Vui lòng nhập từ khóa tìm kiếm");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] overflow-hidden -mt-14">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-110"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-24">
        <h1 className="text-white text-4xl sm:text-6xl font-bold drop-shadow-lg leading-tight">
          Không gian xanh
        </h1>
        <h2 className="text-white text-lg sm:text-2xl font-light tracking-[0.25em] mt-2 uppercase drop-shadow">
          Cho cuộc sống hiện đại
        </h2>

        {/* THANH TÌM KIẾM TÍCH HỢP */}
        <form onSubmit={handleSearch} className="mt-10 w-full max-w-xl group">
          <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 focus-within:bg-white focus-within:ring-4 ring-green-500/30 transition-all duration-300 shadow-2xl">
            <Search
              className="ml-4 text-white group-focus-within:text-green-600"
              size={24}
            />
            <input
              type="text"
              placeholder="Bạn muốn tìm loại cây nào?..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-transparent outline-none text-white placeholder:text-white/70 focus:text-gray-800 focus:placeholder:text-gray-400 text-lg"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg"
            >
              Tìm
            </button>
          </div>
          <div className="mt-3 flex gap-3 justify-center">
            <span className="text-white/60 text-xs">
              Gợi ý: #SenĐá #CâyĐểBàn #XươngRồng
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
