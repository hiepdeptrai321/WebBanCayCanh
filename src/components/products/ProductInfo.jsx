import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";

function formatPrice(price) {
    if (typeof price !== "number") return "Liên hệ";
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

function ProductInfo({ product, categoryName }) {
    // 1. Lấy hàm addToCart từ Context
    const { addToCart } = useCart();

    // 2. Tạo state để theo dõi số lượng người dùng muốn mua (mặc định là 1)
    const [quantity, setQuantity] = useState(1);

    const finalPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

    const specs = [
        `Kích thước chậu: ${product?.dimensions?.potSizeCm || "Đang cập nhật"} cm`,
        `Chiều cao: ${product?.dimensions?.heightCm || "Đang cập nhật"} cm`,
        `Ánh sáng: ${product?.careInfo?.lightRequirement || "Đang cập nhật"}`,
        `Nước: ${product?.careInfo?.waterRequirement || "Đang cập nhật"}`,
        `Độ ẩm: ${product?.careInfo?.humidityRequirement || "Đang cập nhật"}`,
        `Độ khó chăm: ${product?.careInfo?.difficultyLevel || "Đang cập nhật"}`,
    ];

    // 3. Hàm xử lý khi bấm nút "Thêm vào giỏ hàng" - Bản sửa lỗi triệt để
    const handleAddToCart = () => {
        // Lấy dữ liệu ảnh thô từ database
        let rawImage = product.images && product.images.length > 0
            ? product.images[0]
            : product.image;

        let finalImageUrl = "";

        // Kiểm tra an toàn: Nếu ảnh là Object thì lôi đường dẫn bên trong ra, nếu là chuỗi thì dùng luôn
        if (typeof rawImage === 'string') {
            finalImageUrl = rawImage;
        } else if (rawImage && typeof rawImage === 'object') {
            finalImageUrl = rawImage.url || rawImage.path || rawImage.src || "";
        }

        // Đảm bảo đường dẫn ảnh luôn có dấu / ở đầu để không bị lỗi khi chuyển trang
        if (finalImageUrl && !finalImageUrl.startsWith('http') && !finalImageUrl.startsWith('/')) {
            finalImageUrl = '/' + finalImageUrl;
        }

        // Đẩy dữ liệu chuẩn vào kho chứa
        addToCart({
            _id: product._id,
            name: product.name,
            price: finalPrice,
            image: finalImageUrl
        }, quantity);

        alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
    };

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

            {/* Truyền state quantity vào QuantitySelector, cho phép tăng đến 99 nếu chưa có số lượng kho */}
            <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={product.stockQuantity || 99}
            />

            <button
                onClick={handleAddToCart}
                className="rounded bg-[#00b386] px-6 py-3 font-medium text-white transition hover:bg-[#009f77]"
            >
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