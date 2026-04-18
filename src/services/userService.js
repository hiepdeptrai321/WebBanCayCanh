import rawUsers from '../../database/json/users.json'

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

function normalizeRole(role) {
  if (role === 'admin') {
    return 'admin'
  }

  return 'user'
}

let usersStore = structuredClone(rawUsers)

function toAdminUser(user) {
  return {
    id: getOid(user._id),
    fullName: user.fullName || '',
    email: user.email || '',
    phone: user.phone || '',
    role: normalizeRole(user.role),
    accountStatus: user.status === 'locked' ? 'locked' : 'active',
    createdAt: formatDate(user.createdAt),
  }
}

export async function getAllUsers() {
  return usersStore.map(toAdminUser)
}

export async function toggleUserRole(id) {
  const index = usersStore.findIndex((item) => getOid(item._id) === id)

  if (index === -1) {
    throw new Error('Không tìm thấy người dùng để cập nhật vai trò.')
  }

  const currentUser = usersStore[index]
  const currentRole = normalizeRole(currentUser.role)
  const nextRole = currentRole === 'admin' ? 'customer' : 'admin'

  const nextUser = {
    ...currentUser,
    role: nextRole,
  }

  usersStore = usersStore.map((item, itemIndex) => (itemIndex === index ? nextUser : item))

  return toAdminUser(nextUser)
}

export async function toggleUserLock(id) {
  const index = usersStore.findIndex((item) => getOid(item._id) === id)

  if (index === -1) {
    throw new Error('Không tìm thấy người dùng để cập nhật trạng thái.')
  }

  const currentUser = usersStore[index]
  const nextStatus = currentUser.status === 'locked' ? 'active' : 'locked'

  const nextUser = {
    ...currentUser,
    status: nextStatus,
  }

  usersStore = usersStore.map((item, itemIndex) => (itemIndex === index ? nextUser : item))

  return toAdminUser(nextUser)
}
