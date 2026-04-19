function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-[26px] border border-green-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-3 text-3xl font-bold text-green-700">{value}</p>
      <p className="mt-2 text-sm text-gray-500">{hint}</p>
    </div>
  );
}

function ProductsStats({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label="Tổng sản phẩm"
        value={stats.total}
        hint="Danh sách đang có trên hệ thống"
      />
      <StatCard
        label="Còn hàng"
        value={stats.inStock}
        hint="Sẵn sàng tư vấn và giao nhanh"
      />
      <StatCard
        label="Đang ưu đãi"
        value={stats.onSale}
        hint="Các sản phẩm có mức giá tốt hơn"
      />
    </div>
  );
}

export default ProductsStats;
