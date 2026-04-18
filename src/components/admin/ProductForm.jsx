import { useEffect, useState } from 'react'

const emptyFormValues = {
  name: '',
  category: '',
  price: '',
  salePrice: '',
  stock: '',
  shortDescription: '',
  description: '',
  careInfo: '',
  image: '',
  status: 'Đang bán',
}

function validateProduct(values) {
  const errors = {}
  const price = Number(values.price)
  const salePrice = values.salePrice === '' ? null : Number(values.salePrice)
  const stock = Number(values.stock)

  if (!values.name.trim()) {
    errors.name = 'Tên sản phẩm là bắt buộc.'
  }

  if (!values.category.trim()) {
    errors.category = 'Danh mục là bắt buộc.'
  }

  if (values.price === '') {
    errors.price = 'Giá là bắt buộc.'
  } else if (Number.isNaN(price) || price < 0) {
    errors.price = 'Giá phải là số không âm.'
  }

  if (values.salePrice !== '' && (Number.isNaN(salePrice) || salePrice < 0)) {
    errors.salePrice = 'Giá khuyến mãi phải là số không âm.'
  }

  if (values.salePrice !== '' && !Number.isNaN(price) && salePrice > price) {
    errors.salePrice = 'Giá khuyến mãi không được lớn hơn giá gốc.'
  }

  if (values.stock === '') {
    errors.stock = 'Tồn kho là bắt buộc.'
  } else if (Number.isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
    errors.stock = 'Tồn kho phải là số nguyên không âm.'
  }

  if (!values.shortDescription.trim()) {
    errors.shortDescription = 'Mô tả ngắn là bắt buộc.'
  }

  if (!values.description.trim()) {
    errors.description = 'Mô tả chi tiết là bắt buộc.'
  }

  if (!values.careInfo.trim()) {
    errors.careInfo = 'Thông tin chăm sóc là bắt buộc.'
  }

  if (!values.image.trim()) {
    errors.image = 'Ảnh sản phẩm là bắt buộc.'
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

function ProductForm({ initialValues, categories, mode, onSubmit, onCancel }) {
  const [formValues, setFormValues] = useState({ ...emptyFormValues, ...initialValues })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormValues({ ...emptyFormValues, ...initialValues })
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

    const nextErrors = validateProduct(formValues)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        ...formValues,
        name: formValues.name.trim(),
        category: formValues.category.trim(),
        price: Number(formValues.price),
        salePrice: formValues.salePrice === '' ? null : Number(formValues.salePrice),
        stock: Number(formValues.stock),
        shortDescription: formValues.shortDescription.trim(),
        description: formValues.description.trim(),
        careInfo: formValues.careInfo.trim(),
        image: formValues.image.trim(),
      })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Lưu sản phẩm thất bại. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-1">
        <h3 className="text-xl font-bold text-slate-900">
          {mode === 'edit' ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </h3>
        <p className="text-sm text-slate-500">Điền đầy đủ thông tin để lưu sản phẩm trong hệ thống.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Tên sản phẩm
            <input
              type="text"
              value={formValues.name}
              onChange={handleChange('name')}
              className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
              placeholder="Ví dụ: Monstera Deliciosa"
            />
            <FieldError message={errors.name} />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Danh mục
            <input
              type="text"
              value={formValues.category}
              onChange={handleChange('category')}
              list="admin-product-categories"
              className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
              placeholder="Ví dụ: Cây nội thất"
            />
            <datalist id="admin-product-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
            <FieldError message={errors.category} />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Giá
            <input
              type="number"
              min="0"
              value={formValues.price}
              onChange={handleChange('price')}
              className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
              placeholder="0"
            />
            <FieldError message={errors.price} />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Giá khuyến mãi
            <input
              type="number"
              min="0"
              value={formValues.salePrice}
              onChange={handleChange('salePrice')}
              className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
              placeholder="Để trống nếu không có"
            />
            <FieldError message={errors.salePrice} />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Tồn kho
            <input
              type="number"
              min="0"
              value={formValues.stock}
              onChange={handleChange('stock')}
              className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
              placeholder="0"
            />
            <FieldError message={errors.stock} />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Trạng thái
            <select
              value={formValues.status}
              onChange={handleChange('status')}
              className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
            >
              <option value="Đang bán">Đang bán</option>
              <option value="Tạm ngưng">Tạm ngưng</option>
            </select>
            <FieldError message={errors.status} />
          </label>

          <label className="text-sm font-medium text-slate-700 md:col-span-2">
            Ảnh sản phẩm (URL)
            <input
              type="url"
              value={formValues.image}
              onChange={handleChange('image')}
              className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
              placeholder="https://..."
            />
            <FieldError message={errors.image} />
          </label>
        </div>

        <div className="grid gap-4">
          <label className="text-sm font-medium text-slate-700">
            Mô tả ngắn
            <textarea
              value={formValues.shortDescription}
              onChange={handleChange('shortDescription')}
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
              placeholder="Tóm tắt ngắn gọn về sản phẩm"
            />
            <FieldError message={errors.shortDescription} />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Mô tả chi tiết
            <textarea
              value={formValues.description}
              onChange={handleChange('description')}
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
              placeholder="Thông tin chi tiết của sản phẩm"
            />
            <FieldError message={errors.description} />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Hướng dẫn chăm sóc
            <textarea
              value={formValues.careInfo}
              onChange={handleChange('careInfo')}
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
              placeholder="Ví dụ: Tưới 2 lần/tuần, đặt nơi có ánh sáng gián tiếp"
            />
            <FieldError message={errors.careInfo} />
          </label>
        </div>

        {submitError ? <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{submitError}</p> : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
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
            {isSubmitting ? 'Đang lưu...' : mode === 'edit' ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default ProductForm
