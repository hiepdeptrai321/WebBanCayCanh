import { useState, useEffect, useRef } from "react";
import storeBackground from "../../assets/images/storeBackground.png";

// Ảnh cho Showroom
import showroomMain from "../../assets/images/showroom/main.jpg";
import showroom1 from "../../assets/images/showroom/1.jpg";
import showroom2 from "../../assets/images/showroom/2.jpg";
import showroom3 from "../../assets/images/showroom/3.jpg";
import showroom4 from "../../assets/images/showroom/4.jpg";

// Ảnh cho Kho hàng
import khoMain from "../../assets/images/kho/main.jpg";
import kho1 from "../../assets/images/kho/1.jpg";
import kho2 from "../../assets/images/kho/2.jpg";
import kho3 from "../../assets/images/kho/3.jpg";
import kho4 from "../../assets/images/kho/4.jpg";

// Ảnh cho Vườn ươm
import vuonMain from "../../assets/images/vuon/main.jpg";
import vuon1 from "../../assets/images/vuon/1.jpg";
import vuon2 from "../../assets/images/vuon/2.jpg";
import vuon3 from "../../assets/images/vuon/3.jpg";
import vuon4 from "../../assets/images/vuon/4.jpg";

const branches = [
  {
    id: 0,
    name: "Showroom",
    address: "12 Nguyễn Văn Bảo, Phường 5, Quận Gò Vấp, TP.HCM",
    phone: "0833 449 449",
    hours: "8:00 – 20:00 hàng ngày",
    description:
      "Showroom chính với không gian trưng bày đa dạng cây cảnh nội thất, ngoại thất và vật tư. Dễ dàng đỗ xe, thoáng đãng, phù hợp mua sắm trực tiếp.",
    mapLink:
      "https://www.google.com/maps/place/12+Nguyễn+Văn+Bảo/@10.8221368,106.6841968,17z/...",
    mainImage: showroomMain,
    gallery: [showroom1, showroom2, showroom3, showroom4],
  },
  {
    id: 1,
    name: "Kho hàng",
    address: "25 Lê Văn Việt, Phường Hiệp Phú, TP. Thủ Đức, TP.HCM",
    phone: "0833 449 449",
    hours: "8:00 – 18:00 (Thứ 2 - Thứ 7)",
    description:
      "Kho tổng hợp cây cảnh lớn, vật tư, chậu và phân bón. Diện tích rộng, nhiều chỗ đỗ xe, phù hợp mua số lượng lớn hoặc xem mẫu trước khi đặt.",
    mapLink: "https://www.google.com/maps/place/25+Đ.+Lê+Văn+Việt,...",
    mainImage: khoMain,
    gallery: [kho1, kho2, kho3, kho4],
  },
  {
    id: 2,
    name: "Vườn ươm",
    address: "Khu nông nghiệp công nghệ cao, Củ Chi, TP.HCM",
    phone: "0833 449 449",
    hours: "Liên hệ trước khi đến (không mở cửa đón khách lẻ)",
    description:
      "Vườn ươm lớn chuyên cây công trình, cây lớn và cây mùa Tết. Diện tích rộng, chăm dưỡng đạt chuẩn trước khi chuyển về kho/showroom.",
    mapLink:
      "https://www.google.com/maps/place/Khu+nông+nghiệp+công+nghệ+cao+Thành+phố+Hồ+Chí+Minh/...",
    mainImage: vuonMain,
    gallery: [vuon1, vuon2, vuon3, vuon4],
  },
];

function StoresPage() {
  const [openBranches, setOpenBranches] = useState([]); // mảng id đang mở
  const sectionRefs = useRef([]);

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

  const toggleDetail = (id) => {
    setOpenBranches((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section
        className="relative h-80 md:h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${storeBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="relative text-center text-white px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Danh sách cửa hàng
          </h1>
          <p className="text-xl md:text-2xl drop-shadow-md">
            Hệ thống showroom, kho & vườn ươm tại TP.HCM
          </p>
        </div>
      </section>

      {/* Bản đồ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">
            Vị trí các cửa hàng
          </h2>
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <iframe
              className="w-full h-[400px] md:h-[500px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.705!2d106.6841968!3d10.8221315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175296a4ce691f9%3A0x2d96eb3ef10ac151!2s12%20Nguy%E1%BB%85n%20V%C4%83n%20B%E1%BA%A3o%2C%20Ph%C6%B0%E1%BB%9Dng%205%2C%20G%C3%B2%20V%E1%BA%A5p%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" // regenerate để có !4v timestamp mới
            ></iframe>
          </div>
        </div>
      </section>

      {/* Danh sách chi nhánh */}
      <section className="py-16 container mx-auto px-4 max-w-7xl">
        <div className="space-y-6 md:space-y-8">
          {branches.map((branch, index) => (
            <div
              key={branch.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="bg-white rounded-3xl shadow-xl overflow-hidden opacity-0 translate-y-10 transition-all duration-700 ease-out"
            >
              {/* Tiêu đề */}
              <div
                className={`p-6 md:p-8 cursor-pointer flex items-center justify-between transition-colors duration-300 ${
                  openBranches.includes(branch.id)
                    ? "bg-green-50 border-b-4 border-green-600"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => toggleDetail(branch.id)}
              >
                <div className="flex items-center gap-6">
                  <div className="text-5xl text-green-600">
                    <i className="fas fa-store-alt"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {branch.name}
                    </h3>
                    <p className="text-gray-600 mt-1 flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-green-600">📍</i>
                      {branch.address}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-4xl transition-transform duration-300 ${
                    openBranches.includes(branch.id) ? "rotate-180" : ""
                  }`}
                >
                  <i className="fas fa-chevron-down"></i>
                </span>
              </div>

              {/* Nội dung chi tiết - transition nhẹ, không nhảy */}
              <div
                className={`transition-all duration-500 ease-out overflow-hidden ${
                  openBranches.includes(branch.id)
                    ? "max-h-[5000px] opacity-100 py-10 px-6 md:px-10"
                    : "max-h-0 opacity-0 py-0 px-6 md:px-10"
                }`}
              >
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  {/* Bên trái */}
                  <div className="space-y-8">
                    <img
                      src={branch.mainImage}
                      alt={branch.name}
                      className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="bg-green-50 p-6 rounded-2xl space-y-3">
                      <h4 className="text-xl font-semibold text-green-800">
                        Thông tin liên hệ
                      </h4>
                      <p>
                        <strong>📍 Địa chỉ:</strong> {branch.address}
                      </p>
                      <p>
                        <strong>🕒 Giờ mở cửa:</strong> {branch.hours}
                      </p>
                      <p>
                        <strong>📞 Hotline:</strong> {branch.phone}
                      </p>
                      <a
                        href={branch.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition"
                      >
                        Xem trên Google Maps →
                      </a>
                    </div>
                  </div>

                  {/* Bên phải */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-2xl font-bold text-green-700 mb-3">
                        Giới thiệu
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {branch.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-green-700 mb-4">
                        Hình ảnh
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {branch.gallery.map((img, idx) => (
                          <div
                            key={idx}
                            className="overflow-hidden rounded-xl shadow-md"
                          >
                            <img
                              src={img}
                              alt={`${branch.name} ${idx + 1}`}
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-2xl text-gray-800 mb-6">
            Liên hệ ngay để được tư vấn chi nhánh gần nhất
          </p>
          <a
            href="tel:0833449449"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-5 rounded-full text-xl transition shadow-lg hover:shadow-xl"
          >
            Gọi Hotline: 0833 449 449
          </a>
        </div>
      </section>
    </div>
  );
}

export default StoresPage;
