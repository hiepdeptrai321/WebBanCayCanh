import mongoose from 'mongoose'
import InventoryLog from '../models/InventoryLog.js'
import Product from '../models/Product.js'

function toObjectId(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return value.toString()
}

const ACTION_MAP = {
  import: 'import',
  export: 'export',
  adjustment: 'adjustment',
  'nhập kho': 'import',
  'xuat kho': 'export',
  'xuất kho': 'export',
  'điều chỉnh': 'adjustment',
  'dieu chinh': 'adjustment',
}

function normalizeActionType(actionType) {
  const normalized = String(actionType || '').trim().toLowerCase()
  return ACTION_MAP[normalized] || 'adjustment'
}

async function enrichLogs(logs) {
  const productIds = [...new Set(logs.map((log) => toObjectId(log.productId)).filter(Boolean))]
  const products = await Product.find({ _id: { $in: productIds } }).select('name').lean()
  const productNameById = new Map(products.map((product) => [toObjectId(product._id), product.name || 'Sản phẩm']))

  return logs.map((log) => ({
    ...log,
    productName: productNameById.get(toObjectId(log.productId)) || 'Sản phẩm',
  }))
}

export async function getAllInventoryLogs(req, res) {
  try {
    const logs = await InventoryLog.find({}).sort({ createdAt: -1 }).lean()
    const enrichedLogs = await enrichLogs(logs)
    res.json(enrichedLogs)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch inventory logs',
      error: error.message,
    })
  }
}

export async function createInventoryLog(req, res) {
  try {
    const productId = req.body?.productId

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product id' })
    }

    const quantityBefore = Number(req.body?.quantityBefore)
    const quantityAfter = Number(req.body?.quantityAfter)
    const quantityChanged = Number(req.body?.quantityChanged ?? quantityAfter - quantityBefore)

    if (!Number.isFinite(quantityBefore) || !Number.isFinite(quantityAfter) || !Number.isFinite(quantityChanged)) {
      return res.status(400).json({ message: 'Invalid inventory quantity values.' })
    }

    const payload = {
      productId,
      adminId: mongoose.Types.ObjectId.isValid(req.body?.adminId) ? req.body.adminId : undefined,
      actionType: normalizeActionType(req.body?.actionType),
      quantityChanged,
      quantityBefore,
      quantityAfter,
      note: String(req.body?.note || '').trim(),
    }

    const createdLog = await InventoryLog.create(payload)

    await Product.findByIdAndUpdate(productId, {
      stockQuantity: Math.max(0, quantityAfter),
    })

    const [enrichedLog] = await enrichLogs([createdLog.toObject()])
    res.status(201).json(enrichedLog)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create inventory log',
      error: error.message,
    })
  }
}
