const defaultAboutContent = {
  heading: 'Về Hiệp Garden',
  intro: 'Hiệp Garden là hệ thống cửa hàng cây cảnh chuyên cung cấp giải pháp xanh cho không gian sống và làm việc.',
  mission: 'Mang cây xanh chất lượng và kiến thức chăm sóc cây đến gần hơn với mọi gia đình.',
  vision: 'Trở thành hệ sinh thái cây cảnh nội thất được tin dùng tại các thành phố lớn.',
  contactEmail: 'support@hiepgarden.vn',
}

const STORAGE_KEY = 'admin_about_content'

let aboutContentStore = defaultAboutContent

function loadFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return
    }

    const parsed = JSON.parse(raw)

    if (parsed && typeof parsed === 'object') {
      aboutContentStore = {
        ...defaultAboutContent,
        ...parsed,
      }
    }
  } catch {
    aboutContentStore = defaultAboutContent
  }
}

function persistToStorage() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(aboutContentStore))
  } catch {
    // Keep in-memory state when localStorage is unavailable.
  }
}

export async function getAboutContent() {
  loadFromStorage()
  return { ...aboutContentStore }
}

export async function updateAboutContent(data) {
  aboutContentStore = {
    ...aboutContentStore,
    ...data,
  }

  persistToStorage()
  return { ...aboutContentStore }
}
