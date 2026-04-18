import rawInventoryLogs from '../../database/json/inventory_logs.json'
import rawProducts from '../../database/json/products.json'

function getOid(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return value.$oid || ''
}

function formatDate(value) {
  if (!value) {
    return ''
  }

  const isoValue = typeof value === 'string' ? value : value.$date
  const date = new Date(isoValue)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleString('vi-VN')
}

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

const productById = new Map(rawProducts.map((product) => [getOid(product._id), product.name || 'Sản phẩm']))

let inventoryLogsStore = structuredClone(rawInventoryLogs)

function toAdminInventoryLog(log) {
  const productId = getOid(log.productId)

  return {
    id: getOid(log._id),
    productId,
    productName: productById.get(productId) || 'Sản phẩm',
    actionType: actionLabels[log.actionType] || 'Điều chỉnh',
    quantityChanged: Number(log.quantityChanged || 0),
    quantityBefore: Number(log.quantityBefore || 0),
    quantityAfter: Number(log.quantityAfter || 0),
    note: log.note || '',
    createdAt: formatDate(log.createdAt),
  }
}

export async function getAllInventoryLogs() {
  return inventoryLogsStore.map(toAdminInventoryLog)
}

export async function createInventoryLog(data) {
  const actionCode = actionCodes[data.actionType] || 'adjustment'
  const payload = {
    _id: {
      $oid: `static-log-${Date.now()}`,
    },
    productId: {
      $oid: data.productId,
    },
    adminId: {
      $oid: 'static-admin',
    },
    actionType: actionCode,
    quantityChanged: Number(data.quantityChanged || 0),
    quantityBefore: Number(data.quantityBefore || 0),
    quantityAfter: Number(data.quantityAfter || 0),
    note: data.note || '',
    createdAt: {
      $date: new Date().toISOString(),
    },
  }

  inventoryLogsStore = [payload, ...inventoryLogsStore]
  return toAdminInventoryLog(payload)
}
