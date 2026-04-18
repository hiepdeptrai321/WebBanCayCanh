import rawOrders from '../../database/json/orders.json'

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

let ordersStore = structuredClone(rawOrders)

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

export async function getAllOrders() {
  return ordersStore.map(toAdminOrder)
}

// Hàm lấy thông tin đơn hàng theo ID (Dùng cho trang Chi tiết đơn hàng/Cảm ơn)
export async function getOrderById(id) {
  const order = ordersStore.find((item) => getOid(item._id) === id)

  if (!order) {
    throw new Error('Không tìm thấy đơn hàng.')
  }

  return toAdminOrder(order)
}

export async function createOrder(orderData) {
  const order = {
    ...orderData,
    _id: {
      $oid: orderData?._id?.$oid || `static-order-${Date.now()}`,
    },
    orderCode: orderData.orderCode || `ORD${String(ordersStore.length + 1).padStart(3, '0')}`,
    orderedAt: {
      $date: new Date().toISOString(),
    },
  }

  ordersStore = [order, ...ordersStore]

  return toAdminOrder(order)
}

export async function updateOrderStatus(id, nextStatusLabel) {
  const status = ORDER_STATUS_CODES[nextStatusLabel] || nextStatusLabel
  const index = ordersStore.findIndex((item) => getOid(item._id) === id)

  if (index === -1) {
    throw new Error('Không tìm thấy đơn hàng để cập nhật.')
  }

  const nextOrder = {
    ...ordersStore[index],
    status,
    updatedAt: {
      $date: new Date().toISOString(),
    },
  }

  ordersStore = ordersStore.map((item, itemIndex) => (itemIndex === index ? nextOrder : item))

  return toAdminOrder(nextOrder)
}
