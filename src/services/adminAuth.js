const ADMIN_SESSION_KEY = 'admin_session'

const DEFAULT_ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin'
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

function normalize(value) {
  return String(value || '').trim()
}

export function getAdminSession() {
  try {
    const rawValue = window.localStorage.getItem(ADMIN_SESSION_KEY)

    if (!rawValue) {
      return null
    }

    const parsed = JSON.parse(rawValue)

    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    if (parsed.role !== 'admin') {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function isAdminLoggedIn() {
  return Boolean(getAdminSession())
}

export function loginAdmin({ username, password }) {
  const nextUsername = normalize(username).toLowerCase()
  const nextPassword = normalize(password)

  if (nextUsername !== DEFAULT_ADMIN_USERNAME.toLowerCase() || nextPassword !== DEFAULT_ADMIN_PASSWORD) {
    throw new Error('Tên đăng nhập hoặc mật khẩu admin không đúng.')
  }

  const session = {
    role: 'admin',
    username: DEFAULT_ADMIN_USERNAME,
    loggedAt: new Date().toISOString(),
  }

  window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
  return session
}

export function logoutAdmin() {
  window.localStorage.removeItem(ADMIN_SESSION_KEY)
}
