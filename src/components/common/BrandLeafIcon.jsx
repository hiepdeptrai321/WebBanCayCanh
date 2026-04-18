function BrandLeafIcon({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="16" cy="14" rx="8" ry="10" fill="currentColor" fillOpacity="0.12" />
      <path
        d="M15.5 21 C 15.5 21 7 17 8 9 C 11.5 7.5 16.5 12 15.5 21 Z"
        fill="currentColor"
      />
      <path
        d="M16.5 21 C 16.5 21 25 17 24 9 C 20.5 7.5 15.5 12 16.5 21 Z"
        fill="currentColor"
        fillOpacity="0.65"
      />
      <path
        d="M16 21 L 16 27"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default BrandLeafIcon