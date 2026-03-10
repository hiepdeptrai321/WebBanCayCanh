function LogoBlock({ size = 'md' }) {
  const cfg = {
    sm: { box: 'w-20 h-20', icon: 22, main: 'text-[10px]', sub: 'text-[7px]' },
    md: { box: 'w-24 h-24', icon: 27, main: 'text-[12px]', sub: 'text-[8px]' },
    lg: { box: 'w-32 h-32', icon: 35, main: 'text-[15px]', sub: 'text-[10px]' },
    xl: { box: 'w-40 h-40', icon: 44, main: 'text-[19px]', sub: 'text-[13px]' },
  }
  const c = cfg[size]

  return (
    <div>
      <div
        className={`${c.box} bg-green-600 flex flex-col items-center justify-center gap-[3px] select-none overflow-hidden`}
      >
      {/* Stylised leaf / plant icon */}
      <svg
        width={c.icon}
        height={c.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft glow behind */}
        <ellipse cx="16" cy="14" rx="8" ry="10" fill="white" fillOpacity="0.12" />

        {/* Left leaf */}
        <path
          d="M15.5 21 C 15.5 21 7 17 8 9 C 11.5 7.5 16.5 12 15.5 21 Z"
          fill="white"
        />

        {/* Right leaf (slightly transparent for depth) */}
        <path
          d="M16.5 21 C 16.5 21 25 17 24 9 C 20.5 7.5 15.5 12 16.5 21 Z"
          fill="white"
          fillOpacity="0.65"
        />

        {/* Stem */}
        <path
          d="M16 21 L 16 27"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand name */}
      <div className="flex flex-col items-center leading-none gap-[1px]">
        <span className={`text-white font-black tracking-[0.2em] uppercase ${c.main}`}>
          GÓC
        </span>
        <span className={`text-white font-black tracking-[0.2em] uppercase ${c.main}`}>
          XANH
        </span>
      </div>

      <span className={`text-white/70 tracking-[0.3em] font-light uppercase ${c.sub}`}>
        SHOP
      </span>
      </div>
    </div>
  )
}

export default LogoBlock
