import { useEffect, useState } from 'react'
import { getAboutContent, updateAboutContent } from '../../services/aboutContentService'

function AdminContentPage() {
  const [values, setValues] = useState({
    heading: '',
    intro: '',
    mission: '',
    vision: '',
    contactEmail: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    async function loadContent() {
      try {
        setIsLoading(true)
        setPageError('')
        const data = await getAboutContent()
        setValues(data)
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Không thể tải nội dung giới thiệu.')
      } finally {
        setIsLoading(false)
      }
    }

    loadContent()
  }, [])

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    setSavedMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const saved = await updateAboutContent(values)
      setValues(saved)
      setSavedMessage('Đã cập nhật nội dung giới thiệu.')
      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Không thể cập nhật nội dung giới thiệu.')
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Quản lý nội dung giới thiệu</h2>
        <p className="mt-1 text-sm text-slate-500">Chỉnh sửa nội dung trang Về chúng tôi hiển thị cho khách hàng.</p>
      </div>

      {isLoading ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">Đang tải nội dung...</div> : null}
      {pageError ? <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div> : null}
      {savedMessage ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">{savedMessage}</div> : null}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="text-sm font-medium text-slate-700">Tiêu đề chính
          <input value={values.heading} onChange={handleChange('heading')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required />
        </label>

        <label className="text-sm font-medium text-slate-700">Giới thiệu ngắn
          <textarea value={values.intro} onChange={handleChange('intro')} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" required />
        </label>

        <label className="text-sm font-medium text-slate-700">Sứ mệnh
          <textarea value={values.mission} onChange={handleChange('mission')} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" required />
        </label>

        <label className="text-sm font-medium text-slate-700">Tầm nhìn
          <textarea value={values.vision} onChange={handleChange('vision')} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" required />
        </label>

        <label className="text-sm font-medium text-slate-700">Email liên hệ
          <input type="email" value={values.contactEmail} onChange={handleChange('contactEmail')} className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3" required />
        </label>

        <div>
          <button type="submit" className="h-11 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700">Lưu nội dung</button>
        </div>
      </form>
    </section>
  )
}

export default AdminContentPage
