import { API_BASE_URL } from './productService'

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${path}`)
  }

  return response.json()
}

export async function getAllBlogPosts() {
  return fetchJson('/blog')
}

export async function getBlogPostBySlug(slug) {
  return fetchJson(`/blog/${slug}`)
}
