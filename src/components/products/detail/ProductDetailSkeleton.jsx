import TopDetailPage from "../TopDetailPage";

function ProductDetailSkeleton() {
  return (
    <div className="bg-[#f7f8f4]">
      <TopDetailPage />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
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
