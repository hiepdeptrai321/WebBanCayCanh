import BrandLeafIcon from '../common/BrandLeafIcon'

function LogoBlock({ size = 'md' }) {
  const cfg = {
    sm: { box: 'w-20 h-20', icon: 22, main: 'text-[10px]', sub: 'text-[7px]' },
    md: { box: 'w-24 h-24', icon: 27, main: 'text-[12px]', sub: 'text-[8px]' },
    lg: { box: 'w-32 h-32', icon: 35, main: 'text-[15px]', sub: 'text-[10px]' },
    xl: { box: 'w-40 h-40', icon: 44, main: 'text-[19px]', sub: 'text-[13px]' },
    xxl: { box: 'w-48 h-48', icon: 52, main: 'text-[22px]', sub: 'text-[15px]' },
  }
  const c = cfg[size]

  return (
    <div>
      <div
        className={`${c.box} bg-green-600 flex flex-col items-center justify-center gap-0.75 select-none overflow-hidden`}
      >
      <BrandLeafIcon size={c.icon} className="text-white" />

      {/* Brand name */}
      <div className="flex flex-col items-center leading-none gap-px">
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
