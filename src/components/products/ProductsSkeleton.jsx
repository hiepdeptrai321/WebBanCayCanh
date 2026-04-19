function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[30px] border border-green-100 bg-white shadow-sm">
      <div className="aspect-[4/4.2] animate-pulse bg-green-50" />
      <div className="space-y-4 p-5">
        <div className="h-3 w-24 animate-pulse rounded-full bg-green-50" />
        <div className="h-5 w-4/5 animate-pulse rounded-full bg-green-50" />
        <div className="h-5 w-3/5 animate-pulse rounded-full bg-green-50" />
        <div className="h-4 w-full animate-pulse rounded-full bg-green-50" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-green-50" />
        <div className="h-10 w-full animate-pulse rounded-2xl bg-green-50" />
      </div>
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-[26px] border border-green-100 bg-white"
          />
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default ProductsSkeleton;
