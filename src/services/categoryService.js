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

function toStatusLabel(isActive) {
  return isActive === false ? 'Tạm ẩn' : 'Đang hiển thị'
}

function toSlug(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
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

function toAdminCategory(category) {
  return {
    id: getOid(category?._id),
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    productCount: Number(category?.productCount || 0),
    status: toStatusLabel(category?.isActive),
  }
}

function toCategoryPayload(categoryData) {
  return {
    name: String(categoryData?.name || '').trim(),
    slug: String(categoryData?.slug || '').trim() || toSlug(categoryData?.name),
    description: String(categoryData?.description || '').trim(),
    productCount: Number(categoryData?.productCount || 0),
    isActive: categoryData?.status !== 'Tạm ẩn',
  }
}

export async function getAllCategories() {
  const response = await fetchJson('/categories?includeInactive=true')
  return Array.isArray(response) ? response.map(toAdminCategory) : []
}

export async function createCategory(categoryData) {
  const response = await fetchJson('/categories', {
    method: 'POST',
    body: JSON.stringify(toCategoryPayload(categoryData)),
  })

  return toAdminCategory(response)
}

export async function updateCategory(id, categoryData) {
  const response = await fetchJson(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(toCategoryPayload(categoryData)),
  })

  return toAdminCategory(response)
}

export async function deleteCategory(id) {
  await fetchJson(`/categories/${id}`, {
    method: 'DELETE',
  })
}
