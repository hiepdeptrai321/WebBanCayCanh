import { API_BASE_URL } from './productService'

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

  return value.$oid || ''
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

function formatDate(value) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleString('vi-VN')
}

function toAdminBlogPost(post) {
  return {
    id: getOid(post._id),
    title: post.title || '',
    slug: post.slug || '',
    category: post.category?.name || '',
    author: post.author?.name || 'Quản trị viên',
    summary: post.summary || '',
    content: post.content || '',
    thumbnail: post.thumbnail || '',
    tags: Array.isArray(post.tags) ? post.tags : [],
    viewCount: Number(post.viewCount || 0),
    status: post.isPublished === false ? 'Nháp' : 'Đã xuất bản',
    publishedAt: formatDate(post.publishedAt),
  }
}

function toBlogPayload(data) {
  return {
    title: String(data.title || '').trim(),
    slug: String(data.slug || '').trim() || toSlug(data.title),
    category: {
      name: String(data.category || '').trim(),
      id: data.categoryId,
    },
    author: {
      name: String(data.author || 'Quản trị viên').trim(),
      id: data.authorId,
    },
    summary: String(data.summary || '').trim(),
    content: String(data.content || '').trim(),
    thumbnail: String(data.thumbnail || '').trim(),
    tags: Array.isArray(data.tags)
      ? data.tags.map((tag) => String(tag || '').trim()).filter(Boolean)
      : [],
    viewCount: Number(data.viewCount || 0),
    isPublished: data.status !== 'Nháp',
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

export async function getAllBlogPosts() {
  const response = await fetchJson('/blog/admin/posts')
  return Array.isArray(response) ? response.map(toAdminBlogPost) : []
}

export async function createBlogPost(data) {
  const response = await fetchJson('/blog/admin/posts', {
    method: 'POST',
    body: JSON.stringify(toBlogPayload(data)),
  })

  return toAdminBlogPost(response)
}

export async function updateBlogPost(id, data) {
  const response = await fetchJson(`/blog/admin/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(toBlogPayload(data)),
  })

  return toAdminBlogPost(response)
}

export async function deleteBlogPost(id) {
  await fetchJson(`/blog/admin/posts/${id}`, {
    method: 'DELETE',
  })
}

export async function toggleBlogPostStatus(id) {
  const response = await fetchJson(`/blog/admin/posts/${id}/status`, {
    method: 'PATCH',
  })

  return toAdminBlogPost(response)
}
