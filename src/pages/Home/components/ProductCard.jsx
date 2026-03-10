function ProductCard({ image, name, price, originalPrice }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden bg-green-50 h-56">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Mới
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-base mb-1 truncate">{name}</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-green-600 font-bold text-lg">{price}</span>
          {originalPrice && (
            <span className="text-gray-400 text-sm line-through">{originalPrice}</span>
          )}
        </div>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl transition-colors duration-300 text-sm">
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}

export default ProductCard
