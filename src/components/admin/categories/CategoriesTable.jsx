function StatusBadge({ status }) {
  const className =
    status === 'Đang hiển thị'
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-slate-200 text-slate-700'

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{status}</span>
}

function CategoriesTable({ categories, onEdit, onDelete }) {
  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Không tìm thấy danh mục phù hợp.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Tên danh mục</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Mô tả ngắn</th>
              <th className="px-4 py-3">Số lượng sản phẩm</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-700">
            {categories.map((category) => (
              <tr key={category.id} className="align-top">
                <td className="px-4 py-3 font-semibold text-slate-900">{category.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">{category.slug}</td>
                <td className="px-4 py-3">
                  <p className="max-w-lg text-slate-600">{category.description}</p>
                </td>
                <td className="px-4 py-3">{category.productCount}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={category.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(category)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(category)}
                      className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CategoriesTable
