import rawStores from '../../database/json/stores.json'

function getOid(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return value.$oid || ''
}

let storesStore = structuredClone(rawStores)

function withBranchIds(store) {
  return {
    ...store,
    branches: (store.branches || []).map((branch, index) => ({
      ...branch,
      id: branch.id || `branch-${index + 1}`,
    })),
  }
}

storesStore = storesStore.map(withBranchIds)

function toAdminStore(store) {
  return {
    id: getOid(store._id),
    name: store.name || '',
    slug: store.slug || '',
    description: store.description || '',
    status: store.isActive === false ? 'Tạm ẩn' : 'Đang hoạt động',
    branches: (store.branches || []).map((branch, index) => ({
      id: branch.id || `branch-${index}`,
      name: branch.name || '',
      phone: branch.phone || '',
      province: branch.province || '',
      district: branch.district || '',
      ward: branch.ward || '',
      streetAddress: branch.streetAddress || '',
      openingHours: branch.openingHours || '',
      mapUrl: branch.mapUrl || '',
    })),
  }
}

function fromAdminBranch(branch) {
  return {
    id: branch.id || `branch-${Date.now()}`,
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

export async function getStoreProfile() {
  const store = storesStore[0]

  if (!store) {
    throw new Error('Không tìm thấy dữ liệu cửa hàng.')
  }

  return toAdminStore(store)
}

export async function updateStoreProfile(data) {
  const store = storesStore[0]

  if (!store) {
    throw new Error('Không tìm thấy dữ liệu cửa hàng để cập nhật.')
  }

  const nextStore = {
    ...store,
    name: data.name,
    slug: data.slug,
    description: data.description,
    isActive: data.status !== 'Tạm ẩn',
  }

  storesStore = [nextStore, ...storesStore.slice(1)]
  return toAdminStore(nextStore)
}

export async function createBranch(data) {
  const store = storesStore[0]

  if (!store) {
    throw new Error('Không tìm thấy dữ liệu cửa hàng để thêm chi nhánh.')
  }

  const branch = fromAdminBranch(data)
  const nextStore = {
    ...store,
    branches: [branch, ...(store.branches || [])],
  }

  storesStore = [nextStore, ...storesStore.slice(1)]
  return toAdminStore(nextStore)
}

export async function updateBranch(branchId, data) {
  const store = storesStore[0]

  if (!store) {
    throw new Error('Không tìm thấy dữ liệu cửa hàng để cập nhật chi nhánh.')
  }

  const nextBranches = (store.branches || []).map((branch) =>
    branch.id === branchId ? fromAdminBranch({ ...data, id: branchId }) : branch
  )

  const nextStore = {
    ...store,
    branches: nextBranches,
  }

  storesStore = [nextStore, ...storesStore.slice(1)]
  return toAdminStore(nextStore)
}

export async function deleteBranch(branchId) {
  const store = storesStore[0]

  if (!store) {
    throw new Error('Không tìm thấy dữ liệu cửa hàng để xóa chi nhánh.')
  }

  const nextStore = {
    ...store,
    branches: (store.branches || []).filter((branch) => branch.id !== branchId),
  }

  storesStore = [nextStore, ...storesStore.slice(1)]
  return toAdminStore(nextStore)
}
