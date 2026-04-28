import { Link } from "react-router-dom";

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#f7f8f4]">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pt-12 lg:px-8 lg:pt-14">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm font-medium text-[#6B7A72]">
          <Link to="/" className="transition hover:text-[#0FA34A]">
            Trang chủ
          </Link>
          <span className="text-[#9eaca5]">/</span>
          <Link to="/products" className="transition hover:text-[#0FA34A]">
            Sản phẩm
          </Link>
          <span className="text-[#9eaca5]">/</span>
          <span className="font-semibold text-[#173B2E]">Đang tải</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="h-[460px] animate-pulse rounded-[28px] bg-white" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-24 animate-pulse rounded-2xl bg-white" />
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[28px] bg-white p-8">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="h-24 animate-pulse rounded bg-gray-100" />
            <div className="h-14 animate-pulse rounded-2xl bg-gray-200" />
            <div className="h-14 animate-pulse rounded-2xl bg-gray-100" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailSkeleton;
