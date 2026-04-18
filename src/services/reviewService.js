import { API_BASE_URL } from './productService'

function getOid(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return value._id || value.$oid || ''
}

function formatDate(value) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleString('vi-VN')
}

function toAdminReview(review) {
  return {
    id: getOid(review._id),
    product: review.productName || review.product?.name || 'Sản phẩm',
    user: review.user?.fullName || 'Người dùng',
    rating: Number(review.rating || 0),
    content: review.comment || '',
    createdAt: formatDate(review.createdAt),
    status: review.isApproved === false ? 'Ẩn' : 'Hiển thị',
  }
}

async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const message = body?.message || `Request failed (${response.status}) for ${path}`
    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function getAllReviews() {
  const response = await fetchJson('/reviews')
  return Array.isArray(response) ? response.map(toAdminReview) : []
}

export async function toggleReviewStatus(id) {
  const response = await fetchJson(`/reviews/${id}/status`, {
    method: 'PATCH',
  })

  return toAdminReview(response)
}

export async function deleteReview(id) {
  await fetchJson(`/reviews/${id}`, {
    method: 'DELETE',
  })
}
