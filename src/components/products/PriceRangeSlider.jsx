import React from "react";

const formatPrice = (value) => {
  return Number(value || 0).toLocaleString("vi-VN") + "đ";
};

export default function PriceRangeSlider({
  min = 0,
  max = 5000000,
  step = 50000,
  value = [0, 5000000],
  onChange,
}) {
  const safeMax = Math.max(max, min + step);
  const [minVal, maxVal] = value;

  const handleMinChange = (e) => {
    const nextMin = Math.min(Number(e.target.value), maxVal - step);
    onChange?.([Math.max(min, nextMin), maxVal]);
  };

  const handleMaxChange = (e) => {
    const nextMax = Math.max(Number(e.target.value), minVal + step);
    onChange?.([minVal, Math.min(safeMax, nextMax)]);
  };

  const minPercent = ((minVal - min) / (safeMax - min)) * 100;
  const maxPercent = ((maxVal - min) / (safeMax - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="relative h-6">
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-green-100" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-green-600"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={safeMax}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="pointer-events-none absolute h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:shadow-md"
        />
        <input
          type="range"
          min={min}
          max={safeMax}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="pointer-events-none absolute h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-green-700 [&::-webkit-slider-thumb]:shadow-md"
        />
      </div>
      <div className="flex items-center justify-between text-sm font-medium text-gray-700">
        <span>{formatPrice(minVal)}</span>
        <span>{formatPrice(maxVal)}</span>
      </div>
    </div>
  );
}