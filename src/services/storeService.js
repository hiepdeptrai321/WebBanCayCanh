import { API_BASE_URL } from './productService'

let activeStoreId = ''

function getOid(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return value._id || value.$oid || ''
}

function normalizeStoreId(store) {
  const storeId = getOid(store?._id)

  if (storeId) {
    activeStoreId = storeId
  }

  return storeId
}

function toAdminStore(store) {
  return {
    id: normalizeStoreId(store),
    name: store?.name || '',
    slug: store?.slug || '',
    description: store?.description || '',
    status: store?.isActive === false ? 'Tạm ẩn' : 'Đang hoạt động',
    branches: (store?.branches || []).map((branch, index) => ({
      id: branch?.id || `branch-${index + 1}`,
      name: branch?.name || '',
      phone: branch?.phone || '',
      province: branch?.province || '',
      district: branch?.district || '',
      ward: branch?.ward || '',
      streetAddress: branch?.streetAddress || '',
      openingHours: branch?.openingHours || '',
      mapUrl: branch?.mapUrl || '',
    })),
  }
}

function fromAdminBranch(branch) {
  return {
    id: branch.id,
    name: branch.name,
    phone: branch.phone,
    province: branch.province,
    district: branch.district,
    ward: branch.ward,
    streetAddress: branch.streetAddress,
    openingHours: branch.openingHours,
    mapUrl: branch.mapUrl,
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

async function requireStoreId() {
  if (activeStoreId) {
    return activeStoreId
  }

  const store = await getStoreProfile()

  if (!store?.id) {
    throw new Error('Không tìm thấy dữ liệu cửa hàng.')
  }

  return store.id
}

export async function getStoreProfile() {
  const response = await fetchJson('/stores/profile')
  return toAdminStore(response)
}

export async function updateStoreProfile(data) {
  const storeId = data?.id || (await requireStoreId())
  const response = await fetchJson(`/stores/${storeId}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: data.name,
      slug: data.slug,
      description: data.description,
      isActive: data.status !== 'Tạm ẩn',
    }),
  })

  return toAdminStore(response)
}

export async function createBranch(data) {
  const storeId = await requireStoreId()
  const response = await fetchJson(`/stores/${storeId}/branches`, {
    method: 'POST',
    body: JSON.stringify(fromAdminBranch(data)),
  })

  return toAdminStore(response)
}

export async function updateBranch(branchId, data) {
  const storeId = await requireStoreId()
  const response = await fetchJson(`/stores/${storeId}/branches/${branchId}`, {
    method: 'PUT',
    body: JSON.stringify(fromAdminBranch({ ...data, id: branchId })),
  })

  return toAdminStore(response)
}

export async function deleteBranch(branchId) {
  const storeId = await requireStoreId()
  const response = await fetchJson(`/stores/${storeId}/branches/${branchId}`, {
    method: 'DELETE',
  })

  return toAdminStore(response)
}
