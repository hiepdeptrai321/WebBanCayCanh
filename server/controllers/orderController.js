import mongoose from 'mongoose'
import Order from '../models/Order.js'

const ORDER_STATUS_MAP = {
  pending: 'pending_confirmation',
  pending_confirmation: 'pending_confirmation',
  confirmed: 'confirmed',
  processing: 'confirmed',
  shipping: 'shipping',
  delivered: 'delivered',
  completed: 'completed',
  cancelled: 'cancelled',
  canceled: 'cancelled',
}

const PAYMENT_METHOD_MAP = {
  cod: 'COD',
  bank: 'bank_transfer',
  bank_transfer: 'bank_transfer',
  momo: 'MOMO',
}

function toObjectId(value) {
  if (!value) {
    return undefined
  }

  if (typeof value === 'string' && mongoose.Types.ObjectId.isValid(value)) {
    return value
  }

  if (value?._id && mongoose.Types.ObjectId.isValid(value._id)) {
    return value._id
  }

  return undefined
}

function normalizeOrderStatus(status) {
  const normalized = String(status || '').trim().toLowerCase()
  return ORDER_STATUS_MAP[normalized] || 'pending_confirmation'
}

function normalizePaymentMethod(method) {
  const normalized = String(method || '').trim().toLowerCase()
  return PAYMENT_METHOD_MAP[normalized] || 'COD'
}

function toOrderItem(item = {}) {
  const quantity = Math.max(1, Number(item.quantity || 1))
  const unitPrice = Math.max(0, Number(item.unitPrice ?? item.price ?? 0))

  return {
    productId: toObjectId(item.productId || item._id),
    productName: String(item.productName || item.name || 'Sản phẩm').trim(),
    productImage: String(item.productImage || item.image || '').trim(),
    unitPrice,
    quantity,
    subtotal: Math.max(0, Number(item.subtotal ?? unitPrice * quantity)),
  }
}

function toOrderPayload(payload = {}) {
  const customerInfo = payload.customerInfo || {}
  const shippingAddress = payload.shippingAddress || {}
  const payment = payload.payment || {}

  const items = Array.isArray(payload.items) ? payload.items.map(toOrderItem) : []
  const subtotal = items.reduce((sum, item) => sum + Number(item.subtotal || 0), 0)
  const shippingFee = Number(payload.pricing?.shippingFee ?? 30000)
  const discountAmount = Number(payload.pricing?.discountAmount ?? 0)
  const totalAmount = Number(payload.totalAmount ?? payload.pricing?.totalAmount ?? subtotal + shippingFee - discountAmount)

  const fullName = String(customerInfo.fullName || customerInfo.name || '').trim()
  const phone = String(customerInfo.phone || shippingAddress.phone || '').trim()
  const email = String(customerInfo.email || '').trim()

  const flatAddress = String(customerInfo.address || '').trim()

  return {
    userId: toObjectId(payload.userId),
    customerInfo: {
      fullName,
      phone,
      email,
    },
    shippingAddress: {
      recipientName: String(shippingAddress.recipientName || fullName).trim(),
      phone,
      province: String(shippingAddress.province || '').trim(),
      district: String(shippingAddress.district || '').trim(),
      ward: String(shippingAddress.ward || '').trim(),
      streetAddress: String(shippingAddress.streetAddress || flatAddress).trim(),
    },
    items,
    pricing: {
      subtotal,
      shippingFee: Number.isFinite(shippingFee) ? Math.max(0, shippingFee) : 0,
      discountAmount: Number.isFinite(discountAmount) ? Math.max(0, discountAmount) : 0,
      totalAmount: Number.isFinite(totalAmount) ? Math.max(0, totalAmount) : 0,
    },
    totalPrice: Number.isFinite(totalAmount) ? Math.max(0, totalAmount) : 0,
    payment: {
      method: normalizePaymentMethod(payment.method || customerInfo.paymentMethod || payload.paymentMethod),
      status: String(payment.status || 'pending').trim() || 'pending',
      transactionCode: payment.transactionCode || null,
      paidAt: payment.paidAt || null,
    },
    status: normalizeOrderStatus(payload.status),
    note: String(payload.note || customerInfo.notes || '').trim(),
    orderedAt: payload.orderedAt || new Date(),
  }
}

async function generateNextOrderCode() {
  const count = await Order.countDocuments()
  return `ORD${String(count + 1).padStart(3, '0')}`
}

export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find({}).sort({ orderedAt: -1, createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message,
    })
  }
}

export async function getOrderById(req, res) {
  const { id } = req.params

  try {
    let order = null

    if (mongoose.Types.ObjectId.isValid(id)) {
      order = await Order.findById(id)
    }

    if (!order) {
      order = await Order.findOne({ orderCode: id })
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch order',
      error: error.message,
    })
  }
}

export async function createOrder(req, res) {
  try {
    const payload = toOrderPayload(req.body)

    if (!payload.customerInfo.fullName || !payload.customerInfo.phone) {
      return res.status(400).json({ message: 'Customer fullName and phone are required.' })
    }

    if (!payload.shippingAddress.streetAddress) {
      return res.status(400).json({ message: 'Shipping address is required.' })
    }

    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      return res.status(400).json({ message: 'Order items are required.' })
    }

    payload.orderCode = req.body.orderCode || (await generateNextOrderCode())

    const createdOrder = await Order.create(payload)
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create order',
      error: error.message,
    })
  }
}

export async function updateOrderStatus(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid order id' })
  }

  try {
    const nextStatus = normalizeOrderStatus(req.body?.status)

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status: nextStatus,
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(updatedOrder)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update order status',
      error: error.message,
    })
  }
}
