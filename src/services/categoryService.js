import rawCategories from '../../database/json/categories.json'
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

function toStatusLabel(isActive) {
  return isActive === false ? 'Tạm ẩn' : 'Đang hiển thị'
}

function toSlug(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

const initialProductCountByCategoryId = rawProducts.reduce((map, product) => {
  const categoryId = getOid(product.categoryId)
  map.set(categoryId, (map.get(categoryId) || 0) + 1)
  return map
}, new Map())

let categoriesStore = structuredClone(rawCategories).map((category) => ({
  ...category,
  productCount: initialProductCountByCategoryId.get(getOid(category._id)) || 0,
}))

function toAdminCategory(category) {
  return {
    id: getOid(category._id),
    name: category.name || '',
    slug: category.slug || '',
    description: category.description || '',
    productCount: Number(category.productCount || 0),
    status: toStatusLabel(category.isActive),
  }
}

function toCategoryPayload(categoryData) {
  return {
    _id: {
      $oid: categoryData.id || `static-category-${Date.now()}`,
    },
    name: categoryData.name,
    slug: categoryData.slug || toSlug(categoryData.name),
    description: categoryData.description,
    productCount: Number(categoryData.productCount || 0),
    isActive: categoryData.status === 'Đang hiển thị',
  }
}

export async function getAllCategories() {
  return categoriesStore.map(toAdminCategory)
}

export async function createCategory(categoryData) {
  const category = toCategoryPayload(categoryData)
  categoriesStore = [category, ...categoriesStore]
  return toAdminCategory(category)
}

export async function updateCategory(id, categoryData) {
  const index = categoriesStore.findIndex((item) => getOid(item._id) === id)

  if (index === -1) {
    throw new Error('Không tìm thấy danh mục để cập nhật.')
  }

  const currentCategory = categoriesStore[index]
  const nextCategory = {
    ...currentCategory,
    ...toCategoryPayload({ ...categoryData, id }),
    _id: currentCategory._id,
  }

  categoriesStore = categoriesStore.map((item, itemIndex) => (itemIndex === index ? nextCategory : item))
  return toAdminCategory(nextCategory)
}

export async function deleteCategory(id) {
  categoriesStore = categoriesStore.filter((item) => getOid(item._id) !== id)
}
