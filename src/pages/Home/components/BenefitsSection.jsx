const benefits = [
  {
    icon: "🌱",
    title: "Cây khỏe mạnh",
    description:
      "Cây được tuyển chọn kỹ lưỡng và chăm sóc cẩn thận trước khi giao đến tay bạn.",
  },
  {
    icon: "🚚",
    title: "Giao hàng nhanh",
    description:
      "Giao hàng nhanh chóng trong vòng 24–48 giờ. Đóng gói cẩn thận, cây đến tay luôn tươi.",
  },
  {
    icon: "🪴",
    title: "Hỗ trợ chăm sóc cây",
    description:
      "Hướng dẫn chi tiết và tư vấn tận tình giúp bạn chăm sóc cây tốt hơn mỗi ngày.",
  },
];

function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-emerald-600 font-medium tracking-widest text-sm">
            CAM KẾT CỦA CHÚNG TÔI
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mt-3">
            Vì sao nên chọn cây tại cửa hàng chúng tôi?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-green-100 hover:border-emerald-300 rounded-3xl p-10 text-center transition-all hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="text-7xl mb-8 transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
