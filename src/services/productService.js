const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const API_BASE_URL = rawApiBaseUrl.endsWith('/api')
  ? rawApiBaseUrl
  : `${rawApiBaseUrl.replace(/\/+$/, '')}/api`

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

  return value.$oid || String(value)
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

function toAdminProduct(product, categoriesById = new Map()) {
  const categoryId = getOid(product.categoryId)

  return {
    id: getOid(product._id),
    image: getProductImage(product),
    name: product.name || '',
    category:
      product.categoryId?.name ||
      product.category ||
      product.categoryName ||
      categoriesById.get(categoryId) ||
      'Chưa phân loại',
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

function toPublicProduct(product) {
  return {
    ...product,
    _id: getOid(product._id),
    categoryId: getOid(product.categoryId),
    categoryName: product.categoryId?.name || product.categoryName || '',
    createdAt: product.createdAt || null,
    updatedAt: product.updatedAt || null,
  }
}

async function fetchCategoriesMap() {
  const categories = await fetchJson('/categories?includeInactive=true')

  if (!Array.isArray(categories)) {
    return new Map()
  }

  return new Map(categories.map((category) => [getOid(category._id), category.name || 'Chưa phân loại']))
}

async function ensureCategoryId(categoryValue) {
  const normalizedValue = String(categoryValue || '').trim()

  if (normalizedValue && /^[a-f\d]{24}$/i.test(normalizedValue)) {
    return normalizedValue
  }

  const categories = await fetchJson('/categories?includeInactive=true')
  const categoryList = Array.isArray(categories) ? categories : []

  const matched = categoryList.find((category) => {
    const categoryName = String(category.name || '').trim().toLowerCase()
    const categorySlug = String(category.slug || '').trim().toLowerCase()
    const target = normalizedValue.toLowerCase()

    return categoryName === target || categorySlug === target
  })

  if (matched) {
    return getOid(matched._id)
  }

  if (normalizedValue) {
    const createdCategory = await fetchJson('/categories', {
      method: 'POST',
      body: JSON.stringify({
        name: normalizedValue,
        slug: toSlug(normalizedValue),
        description: '',
        productCount: 0,
        isActive: true,
      }),
    })

    return getOid(createdCategory?._id)
  }

  return getOid(categoryList[0]?._id)
}

async function toProductPayload(productData) {
  const categoryId = await ensureCategoryId(productData.category)

  if (!categoryId) {
    throw new Error('Không tìm thấy danh mục để lưu sản phẩm.')
  }

  return {
    categoryId,
    name: String(productData.name || '').trim(),
    slug: toSlug(productData.name),
    sku: String(productData.sku || '').trim() || `SP${Math.floor(100 + Math.random() * 900)}`,
    shortDescription: String(productData.shortDescription || '').trim(),
    description: String(productData.description || '').trim(),
    price: Number(productData.price || 0),
    discountPrice:
      productData.salePrice === null || productData.salePrice === ''
        ? null
        : Number(productData.salePrice),
    stockQuantity: Number(productData.stock || 0),
    careInfo: {
      lightRequirement: String(productData.careInfo || '').trim() || 'Chưa cập nhật',
      waterRequirement: '',
      humidityRequirement: '',
      difficultyLevel: '',
    },
    image: String(productData.image || '').trim(),
    images: productData.image
      ? [
          {
            url: String(productData.image || '').trim(),
            alt: String(productData.name || '').trim(),
            isPrimary: true,
          },
        ]
      : [],
    isActive: productData.status !== 'Tạm ngưng',
  }
}

export async function getAllProducts(options = {}) {
  if (Object.keys(options).length > 0) {
    const { featured = true, limit = 10 } = options
    const query = new URLSearchParams()

    if (featured) {
      query.set('featured', 'true')
    }

    if (Number(limit) > 0) {
      query.set('limit', String(Number(limit)))
    }

    const path = query.toString() ? `/products?${query.toString()}` : '/products'
    const response = await fetchJson(path)
    return Array.isArray(response) ? response.map(toPublicProduct) : []
  }

  const [products, categoriesById] = await Promise.all([
    fetchJson('/products?includeInactive=true'),
    fetchCategoriesMap(),
  ])

  if (!Array.isArray(products)) {
    return []
  }

  return products.map((product) => toAdminProduct(product, categoriesById))
}

export async function getProductById(id) {
  const product = await fetchJson(`/products/${id}`)
  return toPublicProduct(product)
}

export async function createProduct(productData) {
  const payload = await toProductPayload(productData)
  const response = await fetchJson('/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return toAdminProduct(response)
}

export async function updateProduct(id, productData) {
  const payload = await toProductPayload(productData)
  const response = await fetchJson(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  return toAdminProduct(response)
}

export async function deleteProduct(id) {
  await fetchJson(`/products/${id}`, {
    method: 'DELETE',
  })
}

export async function getReviewsByProduct(productId) {
  const response = await fetchJson(`/reviews/product/${productId}`)
  return Array.isArray(response) ? response : []
}
