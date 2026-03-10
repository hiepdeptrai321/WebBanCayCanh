import ProductCard from './ProductCard'

const products = [
  {
    id: 1,
    image: 'https://placehold.co/400x400/d1fae5/16a34a?text=Trầu+Bà',
    name: 'Trầu Bà Xanh',
    price: '85.000đ',
    originalPrice: '120.000đ',
  },
  {
    id: 2,
    image: 'https://placehold.co/400x400/bbf7d0/15803d?text=Lưỡi+Hổ',
    name: 'Lưỡi Hổ',
    price: '95.000đ',
    originalPrice: '140.000đ',
  },
  {
    id: 3,
    image: 'https://placehold.co/400x400/a7f3d0/065f46?text=Bạch+Mã',
    name: 'Bạch Mã Hoàng Hậu',
    price: '120.000đ',
    originalPrice: null,
  },
  {
    id: 4,
    image: 'https://placehold.co/400x400/6ee7b7/047857?text=Sen+Đá',
    name: 'Sen Đá Mini',
    price: '45.000đ',
    originalPrice: '65.000đ',
  },
]

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
  )
}

export default FeaturedProducts
