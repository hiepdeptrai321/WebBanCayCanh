import { motion as Motion } from "framer-motion";

// 1. Khai báo dữ liệu trước
const benefits = [
  {
    icon: "🌱",
    title: "Cây khỏe mạnh",
    description: "Cây được tuyển chọn kỹ lưỡng và chăm sóc cẩn thận.",
  },
  {
    icon: "🚚",
    title: "Giao hàng nhanh",
    description: "Giao hàng nhanh chóng trong vòng 24–48 giờ.",
  },
  {
    icon: "🪴",
    title: "Hỗ trợ chăm sóc cây",
    description: "Hướng dẫn chi tiết và tư vấn tận tình trọn đời.",
  },
];

function BenefitsSection() {
  // 2. Cấu hình hiệu ứng
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }, // Các con hiện ra cách nhau 0.3s
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-emerald-600 font-medium tracking-widest text-sm uppercase">
            Cam kết của chúng tôi
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mt-3">
            Vì sao nên chọn cây tại Góc Xanh?
          </h2>
        </div>

        {/* 3. Sử dụng motion.div cho danh sách */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-10"
        >
          {benefits.map((item, index) => (
            <Motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-[2.5rem] bg-emerald-50/50 border border-transparent hover:border-emerald-200 hover:bg-white transition-all duration-300 hover:shadow-2xl text-center"
            >
              <div className="text-7xl mb-8 block transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>

              {/* Trang trí thêm hiệu ứng ánh sáng khi hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-[2.5rem] opacity-0 group-hover:opacity-10 blur transition-opacity duration-300 -z-10"></div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}

export default BenefitsSection;
