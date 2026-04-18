import { useEffect, useMemo, useState } from 'react'
import ReviewsTable from '../../components/admin/reviews/ReviewsTable'
import { deleteReview, getAllReviews, toggleReviewStatus } from '../../services/reviewService'

const statusOptions = ['Tất cả', 'Hiển thị', 'Ẩn']
const ratingOptions = ['Tất cả', '5 sao', '4 sao', '3 sao', '2 sao', '1 sao']

function AdminReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tất cả')
  const [ratingFilter, setRatingFilter] = useState('Tất cả')
  const [selectedReview, setSelectedReview] = useState(null)

  useEffect(() => {
    async function loadReviews() {
      try {
        setIsLoading(true)
        setPageError('')
        const data = await getAllReviews()
        setReviews(data)
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Không thể tải danh sách reviews.')
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [])

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesStatus = statusFilter === 'Tất cả' || review.status === statusFilter
      const matchesRating =
        ratingFilter === 'Tất cả' || review.rating === Number.parseInt(ratingFilter, 10)

      return matchesStatus && matchesRating
    })
  }, [reviews, statusFilter, ratingFilter])

  const handleToggleStatus = async (review) => {
    try {
      const updatedReview = await toggleReviewStatus(review.id)

      setReviews((prevReviews) =>
        prevReviews.map((item) => (item.id === review.id ? updatedReview : item))
      )

      setSelectedReview((current) =>
        current?.id === review.id ? updatedReview : current
      )

      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Cập nhật trạng thái review thất bại.')
    }
  }

  const handleDeleteReview = async (review) => {
    const confirmed = window.confirm(`Bạn có chắc muốn xóa review của "${review.user}" cho sản phẩm "${review.product}"?`)

    if (!confirmed) {
      return
    }

    try {
      await deleteReview(review.id)
      setReviews((prevReviews) => prevReviews.filter((item) => item.id !== review.id))

      if (selectedReview?.id === review.id) {
        setSelectedReview(null)
      }

      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Xóa review thất bại.')
    }
  }

  const handleViewDetail = (review) => {
    setSelectedReview(review)
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quản lý reviews</h2>
          <p className="mt-1 text-sm text-slate-500">Theo dõi phản hồi khách hàng, duyệt hiển thị và kiểm soát nội dung đánh giá.</p>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Lọc theo trạng thái hiển thị
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Lọc theo số sao
          <select
            value={ratingFilter}
            onChange={(event) => setRatingFilter(event.target.value)}
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          >
            {ratingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">Đang tải dữ liệu reviews...</div>
      ) : null}

      {pageError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div>
      ) : null}

      <ReviewsTable
        reviews={filteredReviews}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteReview}
        onViewDetail={handleViewDetail}
      />

      {selectedReview ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-4 sm:items-center">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl sm:p-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Chi tiết review</h3>
                <p className="mt-1 text-sm text-slate-500">{selectedReview.product} - {selectedReview.user}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close detail"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p><span className="font-semibold text-slate-900">Sản phẩm:</span> {selectedReview.product}</p>
              <p><span className="font-semibold text-slate-900">Người dùng:</span> {selectedReview.user}</p>
              <p><span className="font-semibold text-slate-900">Rating:</span> {'★'.repeat(selectedReview.rating)}{'☆'.repeat(5 - selectedReview.rating)}</p>
              <p><span className="font-semibold text-slate-900">Ngày tạo:</span> {selectedReview.createdAt}</p>
              <p><span className="font-semibold text-slate-900">Trạng thái:</span> {selectedReview.status}</p>
              <div>
                <p className="font-semibold text-slate-900">Nội dung</p>
                <p className="mt-2 rounded-xl bg-slate-50 p-4 text-slate-700">{selectedReview.content}</p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default AdminReviewsPage
