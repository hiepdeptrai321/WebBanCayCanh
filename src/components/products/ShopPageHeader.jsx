import { Link } from "react-router-dom";

function ShopPageHeader({
  title,
  subtitle,
  breadcrumbItems = [],
  rightContent = null,
  decorativeImage = "",
  compact = false,
  className = "",
}) {
  return (
    <header
      className={`relative overflow-hidden rounded-[24px] border border-[#cde8d5] bg-[radial-gradient(circle_at_92%_10%,rgba(15,163,74,0.18),transparent_26%),linear-gradient(115deg,#F0FBF2_0%,#FAFFF9_46%,#FFF4D9_100%)] px-5 py-5 shadow-[0_16px_42px_rgba(23,59,46,0.075)] sm:px-7 sm:py-6 lg:px-9 ${compact ? "lg:min-h-[118px]" : "lg:min-h-[164px]"} ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden lg:block">
        {decorativeImage ? (
          <img
            src={decorativeImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-[0.23] saturate-[1.12]"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 34%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 34%)",
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFFF9] via-[#FAFFF9]/54 to-[#FAFFF9]/8" />
      </div>

      <div className={`relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-center ${compact ? "min-h-[76px] sm:min-h-[84px]" : "min-h-[104px] sm:min-h-[112px] lg:min-h-[116px]"}`}>
        <div className="max-w-3xl">
          {breadcrumbItems.length ? (
            <nav className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#6B7A72]">
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;

                return (
                  <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                    {index > 0 ? <span className="text-[#9eaca5]">/</span> : null}
                    {item.to && !isLast ? (
                      <Link to={item.to} className="transition hover:text-[#0FA34A]">
                        {item.label}
                      </Link>
                    ) : (
                      <span className={isLast ? "font-semibold text-[#173B2E]" : ""}>
                        {item.label}
                      </span>
                    )}
                  </span>
                );
              })}
            </nav>
          ) : null}

          {title ? (
            <h1 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.03em] text-[#173B2E] sm:text-3xl lg:text-[2.2rem]">
              {title}
            </h1>
          ) : null}

          {subtitle ? (
            <p className={`${title ? "mt-3" : "mt-3"} max-w-2xl text-sm leading-6 text-[#5F7068] sm:text-base`}>
              {subtitle}
            </p>
          ) : null}
        </div>

        {rightContent ? (
          <div className="shrink-0 self-start md:self-center">{rightContent}</div>
        ) : null}
      </div>
    </header>
  );
}

export default ShopPageHeader;
