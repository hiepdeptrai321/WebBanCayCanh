import { formatPrice } from "../../../../../../../Downloads/product-detail-refactor/src/utils/productDetailHelpers.js";
import StarRating from "./StarRating.jsx";

function ProductInfoPanel({
  product,
  categoryName,
  averageRating,
  reviewsCount,
  finalPrice,
  hasDiscount,
  isInStock,
  quantity,
  stockQuantity,
  onDecrease,
  onIncrease,
  onAddToCart,
}) {
  return (
    <div className="rounded-[32px] border border-[#e4eadf] bg-white p-6 shadow-[0_18px_60px_rgba(20,45,30,0.08)] md:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#eef6ef] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2a6a44]">
          {categoryName}
        </span>

        <span
          className={`rounded-full px-4 py-2 text-xs font-semibold ${
            isInStock ? "bg-[#f0fbf4] text-[#23824d]" : "bg-[#fff3f0] text-[#c24527]"
          }`}
        >
          {isInStock ? "Còn hàng" : "Hết hàng"}
        </span>
      </div>

      <h1 className="text-3xl font-bold leading-tight text-[#163020] md:text-4xl">{product.name}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#657164]">
        <div className="flex items-center gap-2">
          <StarRating value={averageRating} />
          <span className="font-medium text-[#2f3d2f]">
            {reviewsCount ? averageRating.toFixed(1) : "Chưa có"}
          </span>
          <span>({reviewsCount} đánh giá)</span>
        </div>

        <span className="h-1 w-1 rounded-full bg-[#adb9ad]" />
        <span>SKU: {product.sku || product._id || "Đang cập nhật"}</span>
      </div>

      <div className="mt-6 rounded-[24px] bg-[#f7fbf6] p-5">
        <div className="flex flex-wrap items-end gap-4">
          <span className="text-3xl font-bold text-[#0f5132] md:text-4xl">{formatPrice(finalPrice)}</span>

          {hasDiscount && (
            <span className="pb-1 text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>

        {hasDiscount && (
          <p className="mt-2 text-sm text-[#b45309]">
            Bạn đang tiết kiệm {formatPrice(product.price - product.discountPrice)}
          </p>
        )}
      </div>

      <p className="mt-6 text-base leading-8 text-[#526152]">
        {product.shortDescription || "Sản phẩm đang được cập nhật mô tả ngắn."}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#ebefe8] bg-[#fcfdfb] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[#7b887d]">Chiều cao</p>
          <p className="mt-2 text-lg font-semibold text-[#223423]">
            {product?.dimensions?.heightCm ? `${product.dimensions.heightCm} cm` : "Đang cập nhật"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ebefe8] bg-[#fcfdfb] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[#7b887d]">Kích thước chậu</p>
          <p className="mt-2 text-lg font-semibold text-[#223423]">
            {product?.dimensions?.potSizeCm ? `${product.dimensions.potSizeCm} cm` : "Đang cập nhật"}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="inline-flex h-14 items-center rounded-full border border-[#dce6da] bg-white px-3">
          <button
            type="button"
            onClick={onDecrease}
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-[#21422d] transition hover:bg-[#eef4ee]"
          >
            -
          </button>

          <span className="min-w-[52px] text-center text-lg font-semibold">{quantity}</span>

          <button
            type="button"
            onClick={onIncrease}
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-[#21422d] transition hover:bg-[#eef4ee]"
            disabled={!isInStock || quantity >= stockQuantity}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          disabled={!isInStock}
          className={`inline-flex h-14 flex-1 items-center justify-center rounded-full px-8 text-base font-semibold transition ${
            isInStock
              ? "bg-[#0f5132] text-white hover:bg-[#0b3d26]"
              : "cursor-not-allowed bg-gray-200 text-gray-500"
          }`}
        >
          {isInStock ? "Thêm vào giỏ hàng" : "Tạm hết hàng"}
        </button>
      </div>

      <div className="mt-8 grid gap-3 border-t border-[#edf1eb] pt-6 text-sm text-[#526152]">
        <div className="flex items-start gap-3">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#23824d]" />
          <p>Giao cây nội thành nhanh, đóng gói cẩn thận và hỗ trợ kiểm tra khi nhận.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#23824d]" />
          <p>Tư vấn chăm sóc theo từng loại cây sau khi mua.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#23824d]" />
          <p>
            Liên hệ nhanh: <span className="font-semibold text-[#163020]">0833 449 449</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoPanel;
