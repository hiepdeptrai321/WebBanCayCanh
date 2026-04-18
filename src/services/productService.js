import rawProducts from '../../database/json/products.json'
import rawCategories from '../../database/json/categories.json'

function getOid(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return value.$oid || ''
}

function toSlug(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

const categoriesById = new Map(
  rawCategories.map((category) => [getOid(category._id), category.name || 'Chưa phân loại'])
)

let productsStore = structuredClone(rawProducts)

function normalizeCareInfo(careInfo) {
  if (!careInfo) {
    return ''
  }

  if (typeof careInfo === 'string') {
    return careInfo
  }

  const segments = [
    careInfo.lightRequirement,
    careInfo.waterRequirement,
    careInfo.humidityRequirement,
    careInfo.difficultyLevel,
  ].filter(Boolean)

  return segments.join(' | ')
}

function getProductImage(product) {
  const primaryImage = product.images?.find((item) => item?.isPrimary)?.url
  return primaryImage || product.images?.[0]?.url || product.image || ''
}

function toAdminProduct(product) {
  const categoryId = getOid(product.categoryId)

  return {
    id: getOid(product._id),
    image: getProductImage(product),
    name: product.name || '',
    category: product.category || product.categoryName || categoriesById.get(categoryId) || 'Chưa phân loại',
    price: Number(product.price || 0),
    salePrice:
      product.discountPrice !== undefined && product.discountPrice !== null
        ? Number(product.discountPrice)
        : product.salePrice !== undefined && product.salePrice !== null
          ? Number(product.salePrice)
          : null,
    stock: Number(product.stockQuantity ?? product.stock ?? 0),
    shortDescription: product.shortDescription || '',
    description: product.description || '',
    careInfo: normalizeCareInfo(product.careInfo),
    status: product.isActive === false ? 'Tạm ngưng' : 'Đang bán',
  }
}

function toProductPayload(productData) {
  const categoryId = [...categoriesById.entries()].find(([, name]) => name === productData.category)?.[0]

  return {
    _id: {
      $oid: productData.id || `static-product-${Date.now()}`,
    },
    categoryId: {
      $oid: categoryId || getOid(rawCategories[0]?._id),
    },
    name: productData.name,
    slug: toSlug(productData.name),
    sku: `SP${Math.floor(100 + Math.random() * 900)}`,
    shortDescription: productData.shortDescription,
    description: productData.description,
    price: Number(productData.price),
    discountPrice: productData.salePrice === null || productData.salePrice === '' ? null : Number(productData.salePrice),
    stockQuantity: Number(productData.stock),
    careInfo: {
      lightRequirement: productData.careInfo || 'Chưa cập nhật',
      waterRequirement: '',
      humidityRequirement: '',
      difficultyLevel: '',
    },
    images: productData.image
      ? [
          {
            url: productData.image,
            alt: productData.name,
            isPrimary: true,
          },
        ]
      : [],
    isActive: productData.status === 'Đang bán',
    updatedAt: {
      $date: new Date().toISOString(),
    },
  }
}

export async function getAllProducts() {
  return productsStore.map(toAdminProduct)
}

export async function getProductById(id) {
  const product = productsStore.find((item) => getOid(item._id) === id)

  if (!product) {
    throw new Error('Không tìm thấy sản phẩm.')
  }

  return toAdminProduct(product)
}

export async function createProduct(productData) {
  const product = toProductPayload(productData)
  productsStore = [product, ...productsStore]

  return toAdminProduct(product)
}

export async function updateProduct(id, productData) {
  const index = productsStore.findIndex((item) => getOid(item._id) === id)

  if (index === -1) {
    throw new Error('Không tìm thấy sản phẩm để cập nhật.')
  }

  const currentProduct = productsStore[index]
  const nextProduct = {
    ...currentProduct,
    ...toProductPayload({ ...productData, id }),
    _id: currentProduct._id,
  }

  productsStore = productsStore.map((item, itemIndex) => (itemIndex === index ? nextProduct : item))

  return toAdminProduct(nextProduct)
}

export async function deleteProduct(id) {
  productsStore = productsStore.filter((item) => getOid(item._id) !== id)
}
