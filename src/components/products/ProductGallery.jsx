import { useEffect, useMemo, useState } from "react";

function ProductGallery({ product }) {
    const images = useMemo(() => product?.images || [], [product]);

    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        const primary =
            images.find((img) => img.isPrimary)?.url ||
            images[0]?.url ||
            "";
        setSelectedImage(primary);
    }, [images]);

    const hasDiscount =
        product?.discountPrice > 0 && product?.discountPrice < product?.price;

    const discountPercent = hasDiscount
        ? Math.round(
            ((product.price - product.discountPrice) / product.price) * 100
        )
        : 0;

    return (
        <div className="grid grid-cols-[72px_1fr] gap-4 lg:grid-cols-[82px_1fr]">
            <div className="flex flex-col gap-3">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image.url)}
                        className={`overflow-hidden rounded-md border ${
                            selectedImage === image.url
                                ? "border-[#00b386]"
                                : "border-[#dfe6dc]"
                        }`}
                    >
                        <img
                            src={image.url}
                            alt={image.alt || `${product?.name}-${index}`}
                            className="h-[72px] w-[72px] object-cover lg:h-[82px] lg:w-[82px]"
                        />
                    </button>
                ))}
            </div>

            <div className="relative overflow-hidden rounded-md bg-white">
                {hasDiscount && (
                    <div className="absolute right-4 top-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                        -{discountPercent}%
                    </div>
                )}

                <img
                    src={selectedImage}
                    alt={product?.name}
                    className="h-[520px] w-full object-cover"
                />
            </div>
        </div>
    );
}

export default ProductGallery;