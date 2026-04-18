import rawReviews from '../../database/json/reviews.json'
import rawProducts from '../../database/json/products.json'

function getOid(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return value.$oid || ''
}

function formatDate(value) {
  if (!value) {
    return ''
  }

  const isoValue = typeof value === 'string' ? value : value.$date
  const date = new Date(isoValue)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleString('vi-VN')
}

const productNameById = new Map(
  rawProducts.map((product) => [getOid(product._id), product.name || 'Sản phẩm'])
)

let reviewsStore = structuredClone(rawReviews)

function toAdminReview(review) {
  const productId = getOid(review.productId)

  return {
    id: getOid(review._id),
    product: productNameById.get(productId) || 'Sản phẩm',
    user: review.user?.fullName || 'Người dùng',
    rating: Number(review.rating || 0),
    content: review.comment || '',
    createdAt: formatDate(review.createdAt),
    status: review.isApproved === false ? 'Ẩn' : 'Hiển thị',
  }
}

export async function getAllReviews() {
  return reviewsStore.map(toAdminReview)
}

export async function toggleReviewStatus(id) {
  const index = reviewsStore.findIndex((item) => getOid(item._id) === id)

  if (index === -1) {
    throw new Error('Không tìm thấy review để cập nhật.')
  }

  const currentReview = reviewsStore[index]
  const nextReview = {
    ...currentReview,
    isApproved: !(currentReview.isApproved !== false),
  }

  reviewsStore = reviewsStore.map((item, itemIndex) => (itemIndex === index ? nextReview : item))

  return toAdminReview(nextReview)
}

export async function deleteReview(id) {
  reviewsStore = reviewsStore.filter((item) => getOid(item._id) !== id)
}
