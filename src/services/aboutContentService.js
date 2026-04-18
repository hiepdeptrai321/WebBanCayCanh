import { API_BASE_URL } from './productService'

function normalizeAboutContent(data = {}) {
  return {
    heading: data.heading || '',
    intro: data.intro || '',
    mission: data.mission || '',
    vision: data.vision || '',
    contactEmail: data.contactEmail || '',
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

export async function getAboutContent() {
  const response = await fetchJson('/about-content')
  return normalizeAboutContent(response)
}

export async function updateAboutContent(data) {
  const response = await fetchJson('/about-content', {
    method: 'PUT',
    body: JSON.stringify(normalizeAboutContent(data)),
  })

  return normalizeAboutContent(response)
}
