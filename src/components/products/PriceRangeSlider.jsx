import React from "react";

const formatPrice = (value) => {
  return Number(value).toLocaleString("vi-VN") + "đ";
};

export default function PriceRangeSlider({
                                           min = 0,
                                           max = 5000000,
                                           step = 50000,
                                           value = [0, 5000000],
                                           onChange,
                                         }) {
  const [minVal, maxVal] = value;

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxVal - step);
    onChange([newMin, maxVal]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minVal + step);
    onChange([minVal, newMax]);
  };

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  return (
      <div className="w-full">
        <div className="relative h-10 flex items-center">
          {/* Thanh nền */}
          <div className="absolute w-full h-2 rounded-full bg-gray-200" />

          {/* Thanh đang chọn */}
          <div
              className="absolute h-2 rounded-full bg-green-600"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
          />

          {/* Range min */}
          <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={minVal}
              onChange={handleMinChange}
              className="product-range product-range-min"
          />

          {/* Range max */}
          <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={maxVal}
              onChange={handleMaxChange}
              className="product-range product-range-max"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
        <span className="rounded-lg bg-green-50 px-3 py-1 font-medium text-green-700">
          {formatPrice(minVal)}
        </span>
          <span className="rounded-lg bg-green-50 px-3 py-1 font-medium text-green-700">
          {formatPrice(maxVal)}
        </span>
        </div>
      </div>
  );
}