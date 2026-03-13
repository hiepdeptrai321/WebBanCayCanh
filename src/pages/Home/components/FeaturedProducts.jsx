import ProductCard from "./ProductCard";
import TrauBa from "../../../assets/images/home/featured/trauba.jpg";
import LuoiHo from "../../../assets/images/home/featured/luoiho.jpg";
import BachMa from "../../../assets/images/home/featured/bachmahoanghau.jpg";
import SenDa from "../../../assets/images/home/featured/senda.jpg";

const products = [
  {
    id: 1,
    image: TrauBa,
    name: "Trầu Bà Xanh",
    price: "85.000đ",
    originalPrice: "120.000đ",
  },
  {
    id: 2,
    image: LuoiHo,
    name: "Lưỡi Hổ",
    price: "95.000đ",
    originalPrice: "140.000đ",
  },
  {
    id: 3,
    image: BachMa,
    name: "Bạch Mã Hoàng Hậu",
    price: "120.000đ",
    originalPrice: null,
  },
  {
    id: 4,
    image: SenDa,
    name: "Sen Đá Mini",
    price: "45.000đ",
    originalPrice: "65.000đ",
  },
];

function FeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-green-600 font-medium text-sm uppercase tracking-widest">
              Bán chạy nhất
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
              Sản phẩm nổi bật
            </h2>
            <div className="w-16 h-1 bg-green-500 rounded-full mt-4"></div>
          </div>
          <button className="text-green-600 hover:text-green-700 font-semibold text-sm border border-green-600 hover:bg-green-50 px-5 py-2.5 rounded-full transition-colors duration-300 shrink-0">
            Xem tất cả →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
