import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/productListingHelpers";

function ProductCardPro({ product, categoryName = "Cây cảnh" }) {
  const isOutOfStock = Number(product.stockQuantity || 0) <= 0;
  const hasDiscount = Number(product.discountPercent || 0) > 0;

  return (
    <article className="group overflow-hidden rounded-[30px] border border-green-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">
      <div className="relative overflow-hidden bg-green-50/70">
        <Link to={`/products/${product._id}`} className="block aspect-[4/4.2] overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-green-50 text-sm text-green-600">
              Chưa có ảnh
            </div>
          )}
        </Link>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {hasDiscount ? (
            <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
              -{product.discountPercent}%
            </span>
          ) : null}
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isOutOfStock
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-700"
            }`}
          >
            {isOutOfStock ? "Hết hàng" : "Còn hàng"}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">
            {categoryName}
          </p>
          <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-7 text-gray-800">
            <Link to={`/products/${product._id}`} className="transition hover:text-green-600">
              {product.name}
            </Link>
          </h3>
          <p className="line-clamp-2 min-h-[3rem] text-sm leading-6 text-gray-500">
            {product.shortDescription || "Sản phẩm đang được cập nhật mô tả chi tiết."}
          </p>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-bold text-green-700">{formatPrice(product.finalPrice)}</p>
            {hasDiscount ? (
              <p className="mt-1 text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
              </p>
            ) : null}
          </div>

          <Link
            to={`/products/${product._id}`}
            className="inline-flex items-center rounded-full border border-green-200 px-4 py-2 text-sm font-medium text-green-700 transition hover:border-green-600 hover:bg-green-50 hover:text-green-800"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCardPro;
