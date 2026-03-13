import CayTrongNha from "../../../assets/images/home/category/caytrongnha.jpg";
import CayNgoaiTroi from "../../../assets/images/home/category/cayngoaitroi.jpg";
import CayMini from "../../../assets/images/home/category/caymini.jpg";
import SDvaXR from "../../../assets/images/home/category/senda.jpg";
function CategorySection() {
  const categories = [
    {
      id: 1,
      name: "Cây trong nhà",
      image: CayTrongNha,
      count: "45 loại",
    },
    {
      id: 2,
      name: "Cây ngoài trời",
      image: CayNgoaiTroi,
      count: "60 loại",
    },
    {
      id: 3,
      name: "Cây mini",
      image: CayMini,
      count: "38 loại",
    },
    {
      id: 4,
      name: "Sen đá & Xương rồng",
      image: SDvaXR,
      count: "52 loại",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-green-600 font-medium text-sm uppercase tracking-widest">
            Khám phá
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
            Danh mục cây cảnh
          </h2>
          <div className="w-16 h-1 bg-green-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-48 sm:h-56">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-base sm:text-lg">
                  {cat.name}
                </h3>
                <p className="text-green-300 text-sm">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
