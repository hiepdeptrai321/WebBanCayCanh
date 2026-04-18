import { API_BASE_URL } from './productService'

const BLOG_REQUEST_TIMEOUT_MS = 8000

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

function toIsoDate(value) {
  if (!value) {
    return null
  }

  if (typeof value === 'string') {
    return value
  }

  return value.$date || null
}

function normalizeBlogPost(post) {
  const normalizedId = getOid(post?._id) || post?.slug || ''

  return {
    _id: normalizedId,
    title: post?.title || '',
    slug: post?.slug || '',
    category: {
      id: getOid(post?.category?.id),
      name: post?.category?.name || 'Chưa phân loại',
    },
    author: {
      id: getOid(post?.author?.id),
      name: post?.author?.name || 'Ban biên tập',
    },
    summary: post?.summary || '',
    content: post?.content || '',
    thumbnail: post?.thumbnail || '',
    tags: Array.isArray(post?.tags) ? post.tags : [],
    viewCount: Number(post?.viewCount || 0),
    isPublished: post?.isPublished !== false,
    publishedAt: toIsoDate(post?.publishedAt),
  }
}

function byPublishedDateDesc(a, b) {
  const first = new Date(a.publishedAt || 0).getTime()
  const second = new Date(b.publishedAt || 0).getTime()
  return second - first
}

async function fetchJson(path) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), BLOG_REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      signal: controller.signal,
    })

    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      const message = body?.message || `Request failed (${response.status}) for ${path}`
      throw new Error(message)
    }

    return response.json()
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function getAllBlogPosts() {
  const response = await fetchJson('/blog')

  if (!Array.isArray(response)) {
    return []
  }

  return response.map(normalizeBlogPost).filter((post) => post.isPublished).sort(byPublishedDateDesc)
}

export async function getBlogPostBySlug(slug) {
  const normalizedSlug = String(slug || '').trim()

  if (!normalizedSlug) {
    throw new Error('Slug bài viết không hợp lệ.')
  }

  const response = await fetchJson(`/blog/${encodeURIComponent(normalizedSlug)}`)
  return normalizeBlogPost(response)
}
