import { Link } from "react-router-dom";
import CayTrongNha from "../../../assets/images/home/category/caytrongnha.jpg";
import CayNgoaiTroi from "../../../assets/images/home/category/cayngoaitroi.jpg";
import CayMini from "../../../assets/images/home/category/caymini.jpg";
import SDvaXR from "../../../assets/images/home/category/senda.jpg";

function CategorySection() {
  const categories = [
    {
      // ID khớp với "Cây nội thất" trong DB của bạn
      id: "65f200000000000000000002",
      name: "Cây nội thất",
      image: CayTrongNha,
      count: "45 loại",
    },
    {
      // ID khớp với "Cây cỡ lớn" (hoặc thay bằng ID phù hợp)
      id: "65f200000000000000000004",
      name: "Cây cỡ lớn",
      image: CayNgoaiTroi,
      count: "60 loại",
    },
    {
      // ID khớp với "Cây để bàn"
      id: "65f200000000000000000001",
      name: "Cây để bàn",
      image: CayMini,
      count: "38 loại",
    },
    {
      // ID khớp với "Sen đá & xương rồng"
      id: "65f200000000000000000003",
      name: "Sen đá & Xương rồng",
      image: SDvaXR,
      count: "52 loại",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-green-600 font-medium text-sm uppercase tracking-widest">
            Khám phá
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
            Danh mục cây cảnh
          </h2>
          <div className="w-16 h-1 bg-green-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="relative overflow-hidden rounded-3xl cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-500 block"
            >
              <div className="overflow-hidden h-48 sm:h-56">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Overlay đẹp hơn */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all group-hover:from-black/80"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-semibold text-lg sm:text-xl drop-shadow-md">
                  {cat.name}
                </h3>
                <p className="text-emerald-300 text-sm mt-1">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
