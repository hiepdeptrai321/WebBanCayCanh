import { useEffect, useMemo, useState } from 'react'
import {
  createBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
  toggleBlogPostStatus,
  updateBlogPost,
} from '../../services/blogPostService'

const defaultValues = {
  title: '',
  slug: '',
  category: '',
  author: 'Quản trị viên Hiệp Garden',
  summary: '',
  content: '',
  thumbnail: '',
  tags: '',
  viewCount: '0',
  status: 'Nháp',
}

function AdminBlogPostsPage() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [values, setValues] = useState(defaultValues)

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true)
        setPageError('')
        const data = await getAllBlogPosts()
        setPosts(data)
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Không thể tải danh sách bài viết.')
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  const editingPost = useMemo(() => posts.find((post) => post.id === editingId) || null, [posts, editingId])

  const openCreate = () => {
    setEditingId(null)
    setValues(defaultValues)
    setIsFormOpen(true)
  }

  const openEdit = (post) => {
    setEditingId(post.id)
    setValues({
      ...post,
      tags: post.tags.join(', '),
      viewCount: String(post.viewCount),
    })
    setIsFormOpen(true)
  }

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      ...values,
      tags: values.tags.split(',').map((item) => item.trim()).filter(Boolean),
      viewCount: Number(values.viewCount || 0),
    }

    try {
      if (editingId) {
        const saved = await updateBlogPost(editingId, payload)
        setPosts((prev) => prev.map((item) => (item.id === editingId ? saved : item)))
      } else {
        const saved = await createBlogPost(payload)
        setPosts((prev) => [saved, ...prev])
      }

      setIsFormOpen(false)
      setEditingId(null)
      setValues(defaultValues)
      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Không thể lưu bài viết.')
    }
  }

  const handleDelete = async (post) => {
    if (!window.confirm(`Bạn có chắc muốn xóa bài viết "${post.title}"?`)) {
      return
    }

    try {
      await deleteBlogPost(post.id)
      setPosts((prev) => prev.filter((item) => item.id !== post.id))
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Không thể xóa bài viết.')
    }
  }

  const handleToggle = async (post) => {
    try {
      const updated = await toggleBlogPostStatus(post.id)
      setPosts((prev) => prev.map((item) => (item.id === post.id ? updated : item)))
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Không thể đổi trạng thái bài viết.')
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quản lý bài viết</h2>
          <p className="mt-1 text-sm text-slate-500">Thêm, chỉnh sửa, xuất bản hoặc ẩn bài viết kiến thức cây cảnh.</p>
        </div>

        <button type="button" onClick={openCreate} className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
          + Thêm bài viết
        </button>
      </div>

      {isLoading ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">Đang tải dữ liệu bài viết...</div> : null}
      {pageError ? <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div> : null}

      {isFormOpen ? (
        <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700 md:col-span-2">Tiêu đề
            <input value={values.title} onChange={handleChange('title')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required />
          </label>
          <label className="text-sm font-medium text-slate-700">Slug
            <input value={values.slug} onChange={handleChange('slug')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">Danh mục
            <input value={values.category} onChange={handleChange('category')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required />
          </label>
          <label className="text-sm font-medium text-slate-700">Tác giả
            <input value={values.author} onChange={handleChange('author')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">Trạng thái
            <select value={values.status} onChange={handleChange('status')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3">
              <option value="Nháp">Nháp</option>
              <option value="Đã xuất bản">Đã xuất bản</option>
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700 md:col-span-2">Ảnh đại diện
            <input value={values.thumbnail} onChange={handleChange('thumbnail')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
          </label>
          <label className="text-sm font-medium text-slate-700 md:col-span-2">Tóm tắt
            <textarea value={values.summary} onChange={handleChange('summary')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" rows={2} required />
          </label>
          <label className="text-sm font-medium text-slate-700 md:col-span-2">Nội dung
            <textarea value={values.content} onChange={handleChange('content')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" rows={5} required />
          </label>
          <label className="text-sm font-medium text-slate-700">Thẻ (phân tách bởi dấu phẩy)
            <input value={values.tags} onChange={handleChange('tags')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
          </label>
          <label className="text-sm font-medium text-slate-700">Lượt xem
            <input type="number" min="0" value={values.viewCount} onChange={handleChange('viewCount')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" />
          </label>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">Hủy</button>
            <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
              {editingPost ? 'Cập nhật bài viết' : 'Tạo bài viết'}
            </button>
          </div>
        </form>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Lượt xem</th>
                <th className="px-4 py-3">Ngày xuất bản</th>
                <th className="px-4 py-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-3 font-semibold text-slate-900">{post.title}</td>
                  <td className="px-4 py-3">{post.category}</td>
                  <td className="px-4 py-3">{post.status}</td>
                  <td className="px-4 py-3">{post.viewCount}</td>
                  <td className="px-4 py-3">{post.publishedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => openEdit(post)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">Sửa</button>
                      <button type="button" onClick={() => handleToggle(post)} className="rounded-lg border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-700">
                        {post.status === 'Đã xuất bản' ? 'Ẩn' : 'Xuất bản'}
                      </button>
                      <button type="button" onClick={() => handleDelete(post)} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700">Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminBlogPostsPage
