const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export async function getAllProducts(options = {}) {
  const { featured = true, limit = 10 } = options
  const params = new URLSearchParams()

  params.set('limit', String(limit))
  if (featured) {
    params.set('featured', 'true')
  }

  const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Khong the tai danh sach san pham')
  }

  return response.json()
}

export async function getProductById(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)

  if (!response.ok) {
    throw new Error('Khong the tai chi tiet san pham')
  }

  return response.json()
}
