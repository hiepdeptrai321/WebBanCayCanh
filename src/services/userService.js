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

function normalizeRole(role) {
  if (role === 'admin') {
    return 'admin'
  }

  return 'user'
}

function normalizeStatus(status) {
  return status === 'active' ? 'active' : 'locked'
}

function toAdminUser(user) {
  return {
    id: getOid(user._id),
    fullName: user.fullName || '',
    email: user.email || '',
    phone: user.phone || '',
    role: normalizeRole(user.role),
    accountStatus: normalizeStatus(user.status),
    createdAt: formatDate(user.createdAt),
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

export async function getAllUsers() {
  const response = await fetchJson('/users')
  return Array.isArray(response) ? response.map(toAdminUser) : []
}

export async function toggleUserRole(id) {
  const response = await fetchJson(`/users/${id}/role`, {
    method: 'PATCH',
  })

  return toAdminUser(response)
}

export async function toggleUserLock(id) {
  const response = await fetchJson(`/users/${id}/status`, {
    method: 'PATCH',
  })

  return toAdminUser(response)
}
