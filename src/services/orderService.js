import { API_BASE_URL } from './productService'

const ORDER_STATUS_LABELS = {
  pending_confirmation: 'Chờ xác nhận',
  confirmed: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Hoàn tất',
  completed: 'Hoàn tất',
  cancelled: 'Đã hủy',
  canceled: 'Đã hủy',
}

const ORDER_STATUS_CODES = {
  'Chờ xác nhận': 'pending_confirmation',
  'Đang xử lý': 'confirmed',
  'Đang giao': 'shipping',
  'Hoàn tất': 'delivered',
  'Đã hủy': 'cancelled',
}

const PAYMENT_STATUS_LABELS = {
  pending: 'Chưa thanh toán',
  paid: 'Đã thanh toán',
  refunded: 'Hoàn tiền',
}

function getOid(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (value._id) {
    return getOid(value._id)
  }

  return value.$oid || ''
}

function toIsoDate(value) {
  if (!value) {
    return null
  }

  if (typeof value === 'string') {
    return value
  }

  return value.$date || null
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

function normalizeOrderStatus(status) {
  return ORDER_STATUS_LABELS[status] || status || 'Chờ xác nhận'
}

function normalizePaymentStatus(status) {
  return PAYMENT_STATUS_LABELS[status] || status || 'Chưa thanh toán'
}

function toAdminOrder(order) {
  const createdAtISO = toIsoDate(order.orderedAt) || toIsoDate(order.createdAt) || null

  return {
    id: getOid(order._id),
    code: order.orderCode || getOid(order._id),
    customerName: order.customerInfo?.fullName || order.customerName || 'Khách hàng',
    phone: order.customerInfo?.phone || order.shippingAddress?.phone || '',
    address: [
      order.shippingAddress?.streetAddress,
      order.shippingAddress?.ward,
      order.shippingAddress?.district,
      order.shippingAddress?.province,
    ]
      .filter(Boolean)
      .join(', '),
    createdAt: formatDate(createdAtISO),
    createdAtISO,
    total: Number(order.pricing?.totalAmount ?? order.totalPrice ?? 0),
    orderStatus: normalizeOrderStatus(order.status),
    paymentStatus: normalizePaymentStatus(order.payment?.status),
    note: order.note || '',
    items: (order.items || []).map((item) => ({
      name: item.productName || item.name || 'Sản phẩm',
      quantity: Number(item.quantity || 0),
      price: Number(item.unitPrice ?? item.price ?? 0),
    })),
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

export async function getAllOrders() {
  const response = await fetchJson('/orders')
  return Array.isArray(response) ? response.map(toAdminOrder) : []
}

export async function getOrderById(id) {
  const response = await fetchJson(`/orders/${id}`)
  return toAdminOrder(response)
}

export async function createOrder(orderData) {
  const response = await fetchJson('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })

  return response
}

export async function getOrderPaymentStatus(id) {
  return fetchJson(`/orders/${id}/payment-status`)
}

export async function updateOrderStatus(id, nextStatusLabel) {
  const status = ORDER_STATUS_CODES[nextStatusLabel] || nextStatusLabel

  const response = await fetchJson(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  })

  return toAdminOrder(response)
}
