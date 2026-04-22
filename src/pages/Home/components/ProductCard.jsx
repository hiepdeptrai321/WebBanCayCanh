import { Link } from "react-router-dom";

function ProductCard({ id, image, name, price, originalPrice }) {
  const productLink = id ? `/products/${id}` : "/products";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <Link
        to={`/products/${id}`}
        className="relative block overflow-hidden bg-green-50 h-56"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-base mb-1 truncate">
          {name}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-green-600 font-bold text-lg">{price}</span>
        </div>

        {/* Nút xem chi tiết */}
        <Link
          to={`/products/${id}`}
          className="block text-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl transition-colors duration-300 text-sm"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}

export default ProductCard
