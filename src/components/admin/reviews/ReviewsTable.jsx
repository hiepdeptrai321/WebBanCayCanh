function RatingStars({ rating }) {
  return <span className="text-sm font-semibold text-amber-500">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
}

function StatusBadge({ status }) {
  const className =
    status === 'Hiển thị'
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-slate-200 text-slate-700'

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{status}</span>
}

function ReviewsTable({ reviews, onToggleStatus, onDelete, onViewDetail }) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Không có đánh giá phù hợp bộ lọc.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">Người dùng</th>
              <th className="px-4 py-3">Số sao</th>
              <th className="px-4 py-3">Nội dung</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-700">
            {reviews.map((review) => {
              const isLongContent = review.content.length > 80
              const preview = isLongContent ? `${review.content.slice(0, 80)}...` : review.content

              return (
                <tr key={review.id} className="align-top">
                  <td className="px-4 py-3 font-semibold text-slate-900">{review.product}</td>
                  <td className="px-4 py-3">{review.user}</td>
                  <td className="px-4 py-3">
                    <RatingStars rating={review.rating} />
                  </td>
                  <td className="px-4 py-3">
                    <p className="max-w-xl text-slate-600">{preview}</p>
                    {isLongContent ? (
                      <button
                        type="button"
                        onClick={() => onViewDetail(review)}
                        className="mt-2 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
                      >
                        Xem chi tiết
                      </button>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">{review.createdAt}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={review.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleStatus(review)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        {review.status === 'Hiển thị' ? 'Ẩn' : 'Hiện'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(review)}
                        className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReviewsTable
