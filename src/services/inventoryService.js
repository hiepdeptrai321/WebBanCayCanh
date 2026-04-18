import { API_BASE_URL } from './productService'

const actionLabels = {
  import: 'Nhập kho',
  export: 'Xuất kho',
  adjustment: 'Điều chỉnh',
}

const actionCodes = {
  'Nhập kho': 'import',
  'Xuất kho': 'export',
  'Điều chỉnh': 'adjustment',
}

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

function toAdminInventoryLog(log) {
  const productId = getOid(log.productId)

  return {
    id: getOid(log._id),
    productId,
    productName: log.productName || log.product?.name || 'Sản phẩm',
    actionType: actionLabels[log.actionType] || 'Điều chỉnh',
    quantityChanged: Number(log.quantityChanged || 0),
    quantityBefore: Number(log.quantityBefore || 0),
    quantityAfter: Number(log.quantityAfter || 0),
    note: log.note || '',
    createdAt: formatDate(log.createdAt),
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

export async function getAllInventoryLogs() {
  const response = await fetchJson('/inventory-logs')
  return Array.isArray(response) ? response.map(toAdminInventoryLog) : []
}

export async function createInventoryLog(data) {
  const payload = {
    productId: data.productId,
    actionType: actionCodes[data.actionType] || 'adjustment',
    quantityChanged: Number(data.quantityChanged || 0),
    quantityBefore: Number(data.quantityBefore || 0),
    quantityAfter: Number(data.quantityAfter || 0),
    note: data.note || '',
  }

  const response = await fetchJson('/inventory-logs', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return toAdminInventoryLog(response)
}
