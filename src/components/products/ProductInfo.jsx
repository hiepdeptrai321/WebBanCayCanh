import QuantitySelector from "./QuantitySelector";

function formatPrice(price) {
    if (typeof price !== "number") return "Liên hệ";
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

function ProductInfo({ product, categoryName }) {
    const finalPrice =
        product.discountPrice > 0 ? product.discountPrice : product.price;

    const specs = [
        `Kích thước chậu: ${product?.dimensions?.potSizeCm || "Đang cập nhật"} cm`,
        `Chiều cao: ${product?.dimensions?.heightCm || "Đang cập nhật"} cm`,
        `Ánh sáng: ${product?.careInfo?.lightRequirement || "Đang cập nhật"}`,
        `Nước: ${product?.careInfo?.waterRequirement || "Đang cập nhật"}`,
        `Độ ẩm: ${product?.careInfo?.humidityRequirement || "Đang cập nhật"}`,
        `Độ khó chăm: ${product?.careInfo?.difficultyLevel || "Đang cập nhật"}`,
    ];

    return (
        <div className="space-y-6">
            <div>
                <p className="mb-2 text-sm text-[#6b8f71]">{categoryName}</p>
                <h1 className="text-4xl font-semibold leading-tight text-[#00b386]">
                    {product.name}
                </h1>
            </div>

            <div>
                <p className="leading-7 text-gray-700">{product.shortDescription}</p>
            </div>

            <ul className="list-disc space-y-1 pl-5 text-sm leading-7 text-gray-700">
                {specs.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <div className="flex items-end gap-4">
        <span className="text-4xl font-semibold text-[#00b386]">
          {formatPrice(finalPrice)}
        </span>

                {product.discountPrice > 0 && (
                    <span className="pb-1 text-lg text-gray-400 line-through">
            {formatPrice(product.price)}
          </span>
                )}
            </div>

            <QuantitySelector max={product.stockQuantity || 1} />

            <button className="rounded bg-[#00b386] px-6 py-3 font-medium text-white transition hover:bg-[#009f77]">
                THÊM VÀO GIỎ HÀNG
            </button>

            <p className="text-sm text-gray-600">
                Gọi đặt mua: <span className="font-medium">0833449449</span> để nhanh chóng đặt hàng
            </p>

            <div className="border-t border-[#dfe6dc] pt-5">
                <h3 className="mb-3 font-semibold text-[#2f3e2f]">Chính sách giao nhận</h3>

                <ul className="space-y-1 text-sm leading-7 text-gray-600">
                    <li>- Đối với các sản phẩm cây/bao gồm cây: Chỉ giao hàng tại TP HCM</li>
                    <li>- Đối với các sản phẩm chậu, phụ kiện, vật tư: Có giao hàng COD toàn quốc</li>
                    <li>- Được kiểm tra hàng khi nhận hàng</li>
                </ul>
            </div>
        </div>
    );
}

export default ProductInfo;