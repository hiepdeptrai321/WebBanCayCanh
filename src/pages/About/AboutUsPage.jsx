import { useEffect, useRef, useState } from "react";
import aboutBackground from "../../assets/images/aboutBackground.jpg"; // Banner đẹp cây xanh
import teamImage from "../../assets/images/team.jpg"; // Ảnh đội ngũ
import avatar1 from "../../assets/images/customer/1.jpg";
import avatar2 from "../../assets/images/customer/2.jpg";
import avatar3 from "../../assets/images/customer/3.jpg";
import avatar4 from "../../assets/images/customer/4.jpg";
import avatar5 from "../../assets/images/customer/5.jpg";
import avatar6 from "../../assets/images/customer/6.jpg";
// Ảnh khách hàng cho testimonial
const customerAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
const testimonials = [
  {
    name: "Anh Minh - Quận 7",
    content:
      "Góc Xanh luôn giao cây đúng hẹn, chất lượng vượt mong đợi. Cây phát tài núi tôi mua cách đây 2 năm vẫn xanh tốt, nhân viên tư vấn rất nhiệt tình và chu đáo!",
    rating: 5,
    avatar: customerAvatars[0],
  },
  {
    name: "Chị Lan - Doanh nghiệp",
    content:
      "Dịch vụ cho thuê cây văn phòng của Góc Xanh chuyên nghiệp cực kỳ, thay cây định kỳ miễn phí, không gian công ty nhờ đó tươi mới hẳn lên. Rất đáng tin cậy và tận tâm!",
    rating: 5,
    avatar: customerAvatars[1],
  },
  {
    name: "Bạn Huy - Bình Thạnh",
    content:
      "Mua số lượng lớn cây công trình cho sân vườn, Góc Xanh hỗ trợ vận chuyển tận nơi, đổi trả dễ dàng. Giá hợp lý, cây khỏe mạnh, sẽ tiếp tục ủng hộ lâu dài!",
    rating: 5,
    avatar: customerAvatars[2],
  },
  {
    name: "Chị Hoa - Quận 1",
    content:
      "Mình mua cây cảnh để decor nhà mới, nhân viên Góc Xanh tư vấn rất kỹ, cây về nhà phát triển tốt, lá bóng đẹp. Dịch vụ giao hàng nhanh, đóng gói cẩn thận!",
    rating: 5,
    avatar: customerAvatars[3],
  },
  {
    name: "Anh Tuấn - Thủ Đức",
    content:
      "Lần đầu mua cây lớn cho biệt thự, lo lắng nhưng Góc Xanh chăm sóc và tư vấn tận tình. Cây sống khỏe, đội ngũ chuyên nghiệp, rất hài lòng và sẽ quay lại!",
    rating: 5,
    avatar: customerAvatars[4],
  },
  {
    name: "Gia đình chị Mai - Gò Vấp",
    content:
      "Cả nhà yêu thích cây xanh nên hay mua ở Góc Xanh. Cây đa dạng, giá tốt, nhân viên thân thiện như người nhà. Không gian sống nhờ đó xanh mát, thư giãn hơn hẳn!",
    rating: 5,
    avatar: customerAvatars[5],
  },
];

function AboutUsPage() {
  const sectionRefs = useRef([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section
        className="relative h-96 md:h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${aboutBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="relative text-center text-white px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Về Góc Xanh
          </h1>
          <p className="text-xl md:text-3xl drop-shadow-md">
            Mang thiên nhiên vào từng không gian sống và làm việc
          </p>
        </div>
      </section>

      {/* Nội dung chính */}
      <section className="py-16 container mx-auto px-4 max-w-7xl">
        {/* Giới thiệu tổng quan */}
        <div
          ref={(el) => (sectionRefs.current[0] = el)}
          className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-800 ease-out"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
            Góc Xanh - Green Expert Từ Năm 2016
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Góc Xanh ra đời vào năm 2016 với sứ mệnh mang đến những không gian
            xanh sạch, bền vững cho mọi gia đình và doanh nghiệp tại TP.HCM và
            khu vực lân cận. Dù còn trẻ so với thị trường cây cảnh truyền thống
            lâu đời, nhưng với đội ngũ trẻ trung, nhiệt huyết và sáng tạo, Góc
            Xanh đã nhanh chóng tạo nên dấu ấn riêng biệt: luôn đúng hẹn, đúng
            cam kết, chất lượng cây trồng chuẩn mực và dịch vụ tận tâm.
          </p>
        </div>

        {/* Lịch sử hình thành */}
        <div
          ref={(el) => (sectionRefs.current[1] = el)}
          className="grid md:grid-cols-2 gap-12 mb-20 opacity-0 translate-y-10 transition-all duration-800 ease-out delay-200"
        >
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              ♻️ Hành trình hình thành
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Bắt đầu từ một cửa hàng nhỏ chuyên cây cảnh nội thất và vật tư,
              Góc Xanh đã không ngừng mở rộng để đáp ứng nhu cầu ngày càng cao
              của khách hàng. Từ năm 2016 đến nay, chúng tôi đã xây dựng hệ
              thống hoàn chỉnh với:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-700 space-y-2">
              <li>
                Showroom tại 12 Nguyễn Văn Bảo, Phường 5, Quận Gò Vấp, TP.HCM
              </li>
              <li>
                Kho hàng tại 25 Lê Văn Việt, Phường Hiệp Phú, TP. Thủ Đức,
                TP.HCM
              </li>
              <li>
                Vườn ươm cây công trình tại Khu nông nghiệp công nghệ cao, Củ
                Chi, TP.HCM
              </li>
              <li>
                Đội ngũ hơn 25 chuyên viên chăm sóc cây xanh chuyên nghiệp
              </li>
              <li>Hệ thống xe vận chuyển phục vụ giao hàng nhanh chóng</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Góc Xanh không chỉ bán cây, mà còn mang đến giải pháp toàn diện:
              cho thuê cây văn phòng, thiết kế cảnh quan, chăm sóc định kỳ, đổi
              trả linh hoạt.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={
                teamImage ||
                "https://via.placeholder.com/600x400?text=Đội+ngũ+Góc+Xanh"
              }
              alt="Đội ngũ Góc Xanh"
              className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
            />
          </div>
        </div>

        {/* Sứ mệnh & Giá trị */}
        <div
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-green-50 p-10 rounded-3xl mb-20 opacity-0 translate-y-10 transition-all duration-800 ease-out delay-400"
        >
          <h3 className="text-3xl font-bold text-green-800 text-center mb-8">
            🍀 Sứ mệnh & Giá trị cốt lõi
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-semibold text-green-700 mb-4">
                🔮 Sứ mệnh
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Mang thiên nhiên xanh mát vào từng không gian sống và làm việc,
                giúp khách hàng tận hưởng cuộc sống khỏe mạnh, thư giãn và gần
                gũi hơn với môi trường. Chúng tôi cam kết cung cấp sản phẩm chất
                lượng cao, dịch vụ chuyên nghiệp, góp phần xây dựng một TP.HCM
                xanh - sạch - đẹp hơn.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-green-700 mb-4">
                🔐 Giá trị cốt lõi
              </h4>
              <ul className="list-none space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-2xl">✔</span>
                  <span>
                    <strong>Luôn đúng hẹn, đúng cam kết</strong>: Lời nói là
                    vàng, chúng tôi không hứa suông.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-2xl">✔</span>
                  <span>
                    <strong>Chất lượng vượt trội</strong>: Cây khỏe mạnh, được
                    chăm sóc đạt chuẩn từ vườn ươm đến tay khách hàng.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-2xl">✔</span>
                  <span>
                    <strong>Tận tâm phục vụ</strong>: Tư vấn chân thành, hỗ trợ
                    sau bán hàng chu đáo, đổi trả dễ dàng.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-2xl">✔</span>
                  <span>
                    <strong>Phát triển bền vững</strong>: Ưu tiên cây trồng thân
                    thiện môi trường, giảm thiểu rác thải nhựa trong đóng gói.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Định hướng phát triển */}
        <div
          ref={(el) => (sectionRefs.current[3] = el)}
          className="mb-20 opacity-0 translate-y-10 transition-all duration-800 ease-out delay-600"
        >
          <h3 className="text-3xl font-bold text-green-800 text-center mb-8">
            ✅ Định hướng phát triển tương lai
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-10">
            Góc Xanh hướng tới việc trở thành thương hiệu cây cảnh hàng đầu miền
            Nam với:
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-bold text-green-700 mb-4">
                Mở rộng hệ thống
              </h4>
              <p className="text-gray-700">
                Thêm chi nhánh tại các quận trung tâm TP.HCM và các tỉnh lân
                cận.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-bold text-green-700 mb-4">
                Phát triển dịch vụ online
              </h4>
              <p className="text-gray-700">
                Nâng cấp website và app đặt hàng, giao cây tận nơi toàn quốc.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-bold text-green-700 mb-4">
                Hợp tác doanh nghiệp
              </h4>
              <p className="text-gray-700">
                Mở rộng dịch vụ cho thuê & chăm sóc cây xanh cho văn phòng,
                khách sạn, khu đô thị lớn.
              </p>
            </div>
          </div>
        </div>

        {/* Thông tin chung */}
        <div
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-white p-10 rounded-3xl shadow-2xl mb-20 opacity-0 translate-y-10 transition-all duration-800 ease-out delay-800"
        >
          <h3 className="text-3xl font-bold text-green-800 text-center mb-8">
            📗 Thông tin chung về Góc Xanh
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-green-600">200+</p>
              <p className="text-gray-700 mt-2">Loại cây</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">3</p>
              <p className="text-gray-700 mt-2">Chi nhánh</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">Nhanh chóng</p>
              <p className="text-gray-700 mt-2">Giao hàng</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">5000m²+</p>
              <p className="text-gray-700 mt-2">Diện tích vườn ươm</p>
            </div>
          </div>
        </div>

        {/* Đánh giá khách hàng với carousel */}
        <div
          ref={(el) => (sectionRefs.current[5] = el)}
          className="opacity-0 translate-y-10 transition-all duration-800 ease-out delay-1000"
        >
          <h3 className="text-3xl font-bold text-green-800 text-center mb-12">
            💁🏻 Khách hàng nói gì về Góc Xanh
          </h3>

          {/* Carousel testimonial */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((review, index) => (
                  <div key={index} className="min-w-full px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                      <div className="flex flex-col items-center">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-green-200 shadow-md"
                        />
                        <div className="flex justify-center mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-3xl">
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-700 italic text-lg mb-6 text-center">
                          "{review.content}"
                        </p>
                        <p className="font-bold text-green-700 text-xl">
                          {review.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nút lướt qua */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-green-600 text-white p-4 rounded-full hover:bg-green-700 transition z-10 shadow-lg"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-600 text-white p-4 rounded-full hover:bg-green-700 transition z-10 shadow-lg"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentTestimonial === index
                      ? "bg-green-600 w-6"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-center mt-10 text-gray-600">
            Hàng ngàn khách hàng đã tin tưởng Góc Xanh. Bạn sẵn sàng cho không
            gian xanh của mình chưa?
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <a
            href="tel:0833449449"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-6 rounded-full text-2xl transition duration-300 shadow-xl hover:shadow-2xl"
          >
            Liên hệ ngay: 0833 449 449
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;
