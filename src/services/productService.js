const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const API_BASE_URL = rawApiBaseUrl.endsWith('/api')
  ? rawApiBaseUrl
  : `${rawApiBaseUrl.replace(/\/+$/, '')}/api`

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${path}`)
  }

  return response.json()
}

export async function getAllProducts(options = {}) {
  const { featured = true, limit = 10 } = options;
  const params = new URLSearchParams();

  params.set("limit", String(limit));
  if (featured) {
    params.set("featured", "true");
  }

  return fetchJson(`/products?${params.toString()}`)
}

export async function getProductById(id) {
  return fetchJson(`/products/${id}`)
}

export async function getReviewsByProduct(productId) {
  return fetchJson(`/reviews/product/${productId}`)
}
