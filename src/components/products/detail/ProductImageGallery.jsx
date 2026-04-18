import { getProductImage } from "../../../../../../../Downloads/product-detail-refactor/src/utils/productDetailHelpers.js";

function ProductImageGallery({
  product,
  images,
  selectedImage,
  onSelectImage,
  hasDiscount,
  discountPercent,
  isInStock,
}) {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[32px] border border-[#e5eadf] bg-white shadow-[0_18px_60px_rgba(20,45,30,0.08)]">
        {hasDiscount && (
          <div className="absolute left-5 top-5 z-10 rounded-full bg-[#d94f30] px-4 py-2 text-sm font-semibold text-white shadow-lg">
            Giảm {discountPercent}%
          </div>
        )}

        {!isInStock && (
          <div className="absolute right-5 top-5 z-10 rounded-full bg-[#2b2b2b] px-4 py-2 text-sm font-semibold text-white">
            Tạm hết hàng
          </div>
        )}

        <img
          src={selectedImage || getProductImage(product)}
          alt={product?.name}
          className="h-[420px] w-full object-cover md:h-[520px]"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => onSelectImage(image.url)}
              className={`overflow-hidden rounded-2xl border bg-white transition ${
                selectedImage === image.url
                  ? "border-[#0f5132] ring-2 ring-[#d8e8dc]"
                  : "border-[#e2e8df] hover:border-[#8bad8f]"
              }`}
            >
              <img src={image.url} alt={image.alt} className="h-24 w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImageGallery;
