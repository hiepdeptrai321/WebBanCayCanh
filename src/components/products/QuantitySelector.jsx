import { useState } from "react";
function QuantitySelector({ value, onChange, max = 99 }) {
    const [localQuantity, setLocalQuantity] = useState(1);

    const quantity = value !== undefined ? value : localQuantity;

    const updateQuantity = (newVal) => {
        setLocalQuantity(newVal);
        if (onChange) {
            onChange(newVal); // Báo cho ProductInfo biết con số vừa đổi
        }
    };

    const decrease = () => {
        if (quantity > 1) {
            updateQuantity(quantity - 1);
        }
    };

    const increase = () => {
        if (quantity < max) {
            updateQuantity(quantity + 1);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">Số lượng:</span>

            <div className="flex items-center overflow-hidden rounded border border-[#d7ddd2]">
                <button
                    onClick={decrease}
                    className="px-3 py-1 text-base text-gray-600 hover:bg-gray-100"
                >
                    -
                </button>

                <span className="min-w-[36px] text-center text-sm">{quantity}</span>

                <button
                    onClick={increase}
                    className="px-3 py-1 text-base text-gray-600 hover:bg-gray-100"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default QuantitySelector;