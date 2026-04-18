import { useEffect, useState } from 'react'

const emptyValues = {
  name: '',
  slug: '',
  description: '',
  productCount: '',
  status: 'Đang hiển thị',
}

function validateCategory(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Tên danh mục là bắt buộc.'
  }

  if (!values.slug.trim()) {
    errors.slug = 'Slug là bắt buộc.'
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.slug.trim())) {
    errors.slug = 'Slug chỉ gồm chữ thường, số và dấu gạch ngang.'
  }

  if (!values.description.trim()) {
    errors.description = 'Mô tả ngắn là bắt buộc.'
  }

  if (values.productCount === '') {
    errors.productCount = 'Số lượng sản phẩm là bắt buộc.'
  } else if (!Number.isInteger(Number(values.productCount)) || Number(values.productCount) < 0) {
    errors.productCount = 'Số lượng sản phẩm phải là số nguyên không âm.'
  }

  if (!values.status) {
    errors.status = 'Trạng thái là bắt buộc.'
  }

  return errors
}

function FieldError({ message }) {
  if (!message) {
    return null
  }

  return <p className="mt-1 text-xs font-medium text-rose-600">{message}</p>
}

function CategoryForm({ initialValues, mode, onSubmit, onCancel }) {
  const [formValues, setFormValues] = useState({ ...emptyValues, ...initialValues })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    setFormValues({ ...emptyValues, ...initialValues })
    setErrors({})
    setSubmitError('')
    setIsSubmitting(false)
  }, [initialValues, mode])

  const handleChange = (field) => (event) => {
    const value = event.target.value
    setFormValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    const nextErrors = validateCategory(formValues)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        ...formValues,
        name: formValues.name.trim(),
        slug: formValues.slug.trim(),
        description: formValues.description.trim(),
        productCount: Number(formValues.productCount),
      })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Lưu danh mục thất bại. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-slate-900">{mode === 'edit' ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h3>
        <p className="mt-1 text-sm text-slate-500">Nhập đầy đủ thông tin để lưu danh mục vào hệ thống.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Tên danh mục
          <input
            type="text"
            value={formValues.name}
            onChange={handleChange('name')}
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
            placeholder="Ví dụ: Cây nội thất"
          />
          <FieldError message={errors.name} />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Slug
          <input
            type="text"
            value={formValues.slug}
            onChange={handleChange('slug')}
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
            placeholder="cay-noi-that"
          />
          <FieldError message={errors.slug} />
        </label>

        <label className="text-sm font-medium text-slate-700 md:col-span-2">
          Mô tả ngắn
          <textarea
            rows={3}
            value={formValues.description}
            onChange={handleChange('description')}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
            placeholder="Mô tả ngắn gọn về danh mục"
          />
          <FieldError message={errors.description} />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Số lượng sản phẩm
          <input
            type="number"
            min="0"
            value={formValues.productCount}
            onChange={handleChange('productCount')}
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
            placeholder="0"
          />
          <FieldError message={errors.productCount} />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Trạng thái
          <select
            value={formValues.status}
            onChange={handleChange('status')}
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          >
            <option value="Đang hiển thị">Đang hiển thị</option>
            <option value="Tạm ẩn">Tạm ẩn</option>
          </select>
          <FieldError message={errors.status} />
        </label>

        {submitError ? <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 md:col-span-2">{submitError}</p> : null}

        <div className="flex flex-col-reverse gap-3 md:col-span-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Đang lưu...' : mode === 'edit' ? 'Cập nhật danh mục' : 'Tạo danh mục'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CategoryForm
