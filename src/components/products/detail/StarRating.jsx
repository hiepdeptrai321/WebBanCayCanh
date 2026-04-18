function StarRating({ value = 0, size = "sm" }) {
  const stars = Array.from({ length: 5 }, (_, index) => index < Math.round(value));
  const className = size === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-1">
      {stars.map((filled, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          fill={filled ? "currentColor" : "none"}
          className={`${className} ${filled ? "text-amber-400" : "text-gray-300"}`}
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M10 2.8l2.163 4.382 4.837.703-3.5 3.412.826 4.818L10 13.84l-4.326 2.275.826-4.818L3 7.885l4.837-.703L10 2.8z" />
        </svg>
      ))}
    </div>
  );
}

export default StarRating;
