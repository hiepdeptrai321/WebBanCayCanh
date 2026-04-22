import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion, useInView } from "framer-motion";
import { Search, Star, ShieldCheck, Truck } from "lucide-react";
import BrandLeafIcon from "../../../components/common/BrandLeafIcon";

function Counter({
  value,
  duration = 2,
  delay = 0,
  isDecimal = false,
  suffix = "",
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      console.log(
        `🎯 Counter ${value} is in view, starting animation with delay ${delay}s`,
      );
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        console.log(`🚀 Starting counter animation for value: ${value}`);

        let startTime = null;
        const startValue = 0;
        const endValue = value;

        const animateCounter = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min(
            (timestamp - startTime) / (duration * 1000),
            1,
          );

          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue =
            startValue + (endValue - startValue) * easeOutQuart;

          setDisplayValue(
            isDecimal
              ? parseFloat(currentValue.toFixed(1))
              : Math.floor(currentValue),
          );

          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            console.log(`✅ Counter animation completed for value: ${value}`);
            setIsAnimating(false);
          }
        };

        requestAnimationFrame(animateCounter);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, duration, isDecimal]);

  return (
    <Motion.span
      ref={ref}
      className="inline-flex items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        delay: delay + 0.2,
        duration: 0.5,
        type: "spring",
        bounce: 0.4,
      }}
      whileHover={{ scale: 1.1 }}
    >
      <Motion.span
        animate={
          isAnimating
            ? {
                textShadow: [
                  "0 0 0px rgba(34, 197, 94, 0)",
                  "0 0 15px rgba(34, 197, 94, 0.8)",
                  "0 0 0px rgba(34, 197, 94, 0)",
                ],
                scale: [1, 1.02, 1],
              }
            : {}
        }
        transition={{ duration: 1.2, repeat: isAnimating ? Infinity : 0 }}
        className="font-black"
      >
        {displayValue.toLocaleString()}
      </Motion.span>
      {suffix && (
        <Motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + duration + 0.3, duration: 0.3 }}
          className="text-green-600 font-bold ml-1"
        >
          {suffix}
        </Motion.span>
      )}
    </Motion.span>
  );
}

function HeroSection() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?search=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-[90vh] flex items-center overflow-hidden py-12">
      <div className="max-w-7xl mx-auto px-6 w-full z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6 border border-green-200">
              <BrandLeafIcon size={18} /> Góc Xanh Shop
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-8">
              Mang <span className="text-green-600">thiên nhiên</span> <br />{" "}
              vào tổ ấm bạn
            </h1>

            {/* THANH TÌM KIẾM GỬI DATA */}
            <form
              onSubmit={handleSearch}
              className="relative max-w-xl mx-auto lg:mx-0 mb-10 group"
            >
              <div className="absolute -inset-1 bg-green-400/20 rounded-3xl blur opacity-25 group-focus-within:opacity-50 transition"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-2 border border-gray-100">
                <Search className="ml-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm sen đá, xương rồng..."
                  className="w-full px-4 py-3 outline-none text-gray-700 bg-transparent text-lg"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-bold transition-transform active:scale-95"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>

            <div className="flex gap-10 justify-center lg:justify-start pt-8 border-t border-gray-100">
              <Motion.div
                className="text-center lg:text-left cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Motion.p
                  className="text-3xl font-black text-gray-800 mb-1"
                  whileHover={{ color: "#16a34a" }}
                >
                  <Counter value={200} delay={0.2} suffix="+" />
                </Motion.p>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                  Loại cây
                </p>
              </Motion.div>

              <Motion.div
                className="text-center lg:text-left border-l border-gray-200 pl-10 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Motion.p
                  className="text-3xl font-black text-gray-800 mb-1"
                  whileHover={{ color: "#16a34a" }}
                >
                  <Counter value={5000} delay={0.5} suffix="+" />
                </Motion.p>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                  Khách hàng
                </p>
              </Motion.div>

              <Motion.div
                className="text-center lg:text-left border-l border-gray-200 pl-10 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <p className="text-3xl font-black text-gray-800 mb-1 flex items-center justify-center lg:justify-start gap-1">
                  <Motion.span whileHover={{ color: "#16a34a" }}>
                    <Counter value={4.9} delay={0.8} isDecimal={true} />
                  </Motion.span>
                  <Motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 1.8,
                      duration: 0.5,
                      type: "spring",
                      bounce: 0.6,
                    }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Star
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  </Motion.div>
                </p>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                  Đánh giá
                </p>
              </Motion.div>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative flex justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-square">
              <div className="absolute inset-0 bg-green-200 rounded-[40%_60%_70%_30%] animate-pulse blur-3xl opacity-30"></div>
              <img
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=1000"
                className="relative z-10 w-full h-full object-cover rounded-[3rem] shadow-2xl border-[12px] border-white"
                alt="Main Plant"
              />
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
