import rawBlogPosts from '../../database/json/blog_posts.json'

function getOid(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return value.$oid || ''
}

function toSlug(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
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

let blogPostsStore = structuredClone(rawBlogPosts)

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
    _id: {
      $oid: data.id || `static-post-${Date.now()}`,
    },
    title: data.title,
    slug: data.slug || toSlug(data.title),
    category: {
      id: {
        $oid: data.categoryId || 'static-category',
      },
      name: data.category,
    },
    author: {
      id: {
        $oid: 'static-admin',
      },
      name: data.author || 'Quản trị viên Hiệp Garden',
    },
    summary: data.summary,
    content: data.content,
    thumbnail: data.thumbnail,
    tags: data.tags,
    viewCount: Number(data.viewCount || 0),
    isPublished: data.status !== 'Nháp',
    publishedAt: {
      $date: new Date().toISOString(),
    },
  }
}

export async function getAllBlogPosts() {
  return blogPostsStore.map(toAdminBlogPost)
}

export async function createBlogPost(data) {
  const post = toBlogPayload(data)
  blogPostsStore = [post, ...blogPostsStore]
  return toAdminBlogPost(post)
}

export async function updateBlogPost(id, data) {
  const index = blogPostsStore.findIndex((item) => getOid(item._id) === id)

  if (index === -1) {
    throw new Error('Không tìm thấy bài viết để cập nhật.')
  }

  const currentPost = blogPostsStore[index]
  const nextPost = {
    ...currentPost,
    ...toBlogPayload({ ...data, id }),
    _id: currentPost._id,
  }

  blogPostsStore = blogPostsStore.map((item, itemIndex) => (itemIndex === index ? nextPost : item))

  return toAdminBlogPost(nextPost)
}

export async function deleteBlogPost(id) {
  blogPostsStore = blogPostsStore.filter((item) => getOid(item._id) !== id)
}

export async function toggleBlogPostStatus(id) {
  const index = blogPostsStore.findIndex((item) => getOid(item._id) === id)

  if (index === -1) {
    throw new Error('Không tìm thấy bài viết để cập nhật trạng thái.')
  }

  const currentPost = blogPostsStore[index]
  const nextPost = {
    ...currentPost,
    isPublished: !currentPost.isPublished,
  }

  blogPostsStore = blogPostsStore.map((item, itemIndex) => (itemIndex === index ? nextPost : item))

  return toAdminBlogPost(nextPost)
}
