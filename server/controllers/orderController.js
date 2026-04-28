import mongoose from 'mongoose'
import crypto from 'crypto'
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
  sepay: 'sepay',
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

function normalizeMoney(value) {
  const normalizedValue =
    typeof value === 'string' ? value.replace(/[^\d.-]/g, '') : value
  const amount = Number(normalizedValue)
  return Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0
}

function getSepayConfig() {
  return {
    bankCode: String(process.env.SEPAY_BANK_CODE || process.env.SEPAY_BANK_NAME || '').trim(),
    accountNumber: String(process.env.SEPAY_ACCOUNT_NUMBER || '').trim(),
    accountName: String(process.env.SEPAY_ACCOUNT_NAME || '').trim(),
    webhookApiKey: String(process.env.SEPAY_WEBHOOK_API_KEY || '').trim(),
  }
}

function assertSepayConfig() {
  const config = getSepayConfig()

  if (!config.bankCode || !config.accountNumber) {
    const error = new Error('Chưa cấu hình SEPAY_BANK_CODE hoặc SEPAY_ACCOUNT_NUMBER trong server/.env.')
    error.statusCode = 500
    throw error
  }

  return config
}

function buildSepayQrUrl({ accountNumber, bankCode, amount, description }) {
  const params = new URLSearchParams({
    acc: accountNumber,
    bank: bankCode,
    amount: String(normalizeMoney(amount)),
    des: description,
  })

  return `https://qr.sepay.vn/img?${params.toString()}`
}

function getSepayWebhookCode(body = {}) {
  const explicitCode = String(body.code || body.orderCode || '').trim()

  if (explicitCode) {
    return explicitCode
  }

  const content = String(body.content || body.description || '').trim()
  const match = content.match(/\b(GX[A-Z0-9]{8,40}|ORD[A-Z0-9]{3,40})\b/i)
  return match ? match[1].toUpperCase() : ''
}

function getSepayWebhookTransactionId(body = {}) {
  return String(
    body.id ||
      body.transactionId ||
      body.transaction_id ||
      body.referenceCode ||
      body.reference_code ||
      '',
  ).trim()
}

function isSepayWebhookAuthorized(req) {
  const { webhookApiKey } = getSepayConfig()

  if (!webhookApiKey) {
    return false
  }

  const authorization = String(req.get('authorization') || '').trim()
  return (
    authorization === `Apikey ${webhookApiKey}` ||
    authorization === `Bearer ${webhookApiKey}` ||
    authorization === webhookApiKey
  )
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
  const paymentMethod = normalizePaymentMethod(payment.method || customerInfo.paymentMethod || payload.paymentMethod)

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
      subtotal: normalizeMoney(subtotal),
      shippingFee: Number.isFinite(shippingFee) ? Math.max(0, shippingFee) : 0,
      discountAmount: Number.isFinite(discountAmount) ? Math.max(0, discountAmount) : 0,
      totalAmount: normalizeMoney(totalAmount),
    },
    totalPrice: normalizeMoney(totalAmount),
    payment: {
      method: paymentMethod,
      status: String(payment.status || 'pending').trim() || 'pending',
      provider: payment.provider || null,
      bankCode: payment.bankCode || null,
      accountNumber: payment.accountNumber || null,
      accountName: payment.accountName || null,
      transferContent: payment.transferContent || null,
      qrUrl: payment.qrUrl || null,
      transactionCode: payment.transactionCode || null,
      paidAt: payment.paidAt || null,
    },
    status: normalizeOrderStatus(payload.status),
    note: String(payload.note || customerInfo.notes || '').trim(),
    orderedAt: payload.orderedAt || new Date(),
  }
}

async function generateNextOrderCode() {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const timestamp = Date.now().toString(36).toUpperCase()
    const suffix = crypto.randomBytes(3).toString('hex').toUpperCase()
    const code = `GX${timestamp}${suffix}`
    const exists = await Order.exists({ orderCode: code })

    if (!exists) {
      return code
    }
  }

  return `GX${Date.now().toString(36).toUpperCase()}${crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()}`
}

async function findOrderByIdOrCode(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const order = await Order.findById(id)

    if (order) {
      return order
    }
  }

  return Order.findOne({ orderCode: id })
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
    const order = await findOrderByIdOrCode(id)

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

    if (payload.payment.method === 'sepay') {
      const sepayConfig = assertSepayConfig()

      payload.payment = {
        ...payload.payment,
        method: 'sepay',
        status: 'pending',
        provider: 'sepay',
        bankCode: sepayConfig.bankCode,
        accountNumber: sepayConfig.accountNumber,
        accountName: sepayConfig.accountName,
        transferContent: payload.orderCode,
        qrUrl: buildSepayQrUrl({
          accountNumber: sepayConfig.accountNumber,
          bankCode: sepayConfig.bankCode,
          amount: payload.pricing.totalAmount,
          description: payload.orderCode,
        }),
      }
    }

    const createdOrder = await Order.create(payload)
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(error.statusCode || 400).json({
      message: 'Failed to create order',
      error: error.message,
    })
  }
}

export async function getPaymentStatus(req, res) {
  const { id } = req.params

  try {
    const order = await findOrderByIdOrCode(id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json({
      orderCode: order.orderCode,
      orderStatus: order.status,
      paymentStatus: order.payment?.status || 'pending',
      paidAt: order.payment?.paidAt || null,
      totalAmount: order.pricing?.totalAmount ?? order.totalPrice ?? 0,
      payment: {
        method: order.payment?.method,
        provider: order.payment?.provider,
        transactionCode: order.payment?.transactionCode,
        qrUrl: order.payment?.qrUrl,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch payment status',
      error: error.message,
    })
  }
}

export async function handleSepayWebhook(req, res) {
  try {
    if (!isSepayWebhookAuthorized(req)) {
      return res.status(401).json({ success: false, message: 'Unauthorized webhook request' })
    }

    const body = req.body || {}
    const transferType = String(body.transferType || body.transfer_type || 'in').toLowerCase()

    if (transferType !== 'in') {
      return res.json({ success: true, ignored: true })
    }

    const orderCode = getSepayWebhookCode(body)
    const transferAmount = normalizeMoney(body.transferAmount ?? body.transfer_amount ?? body.amount)
    const transactionCode = getSepayWebhookTransactionId(body)

    if (!orderCode || transferAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid SePay webhook payload',
      })
    }

    const order = await Order.findOne({ orderCode })

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      })
    }

    if (order.payment?.status === 'paid') {
      return res.json({ success: true, alreadyPaid: true })
    }

    const expectedAmount = normalizeMoney(order.pricing?.totalAmount ?? order.totalPrice)

    if (transferAmount < expectedAmount) {
      return res.status(400).json({
        success: false,
        message: 'Transfer amount is lower than order amount',
      })
    }

    order.payment.status = 'paid'
    order.payment.provider = 'sepay'
    order.payment.transactionCode = transactionCode || order.payment.transactionCode
    order.payment.paidAt = new Date()
    order.payment.webhookPayload = body

    await order.save()

    return res.json({
      success: true,
      orderCode: order.orderCode,
      paymentStatus: order.payment.status,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to handle SePay webhook',
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
