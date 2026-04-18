import { useEffect, useMemo, useState } from 'react'
import CategoriesTable from '../../components/admin/categories/CategoriesTable'
import CategoryForm from '../../components/admin/categories/CategoryForm'
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '../../services/categoryService'

const defaultCategoryValues = {
  name: '',
  slug: '',
  description: '',
  productCount: '',
  status: 'Đang hiển thị',
}

function AdminCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState('create')
  const [editingCategoryId, setEditingCategoryId] = useState(null)

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true)
        setPageError('')
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Không thể tải danh mục.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  const filteredCategories = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase()

    return categories.filter((category) => category.name.toLowerCase().includes(keyword))
  }, [categories, searchTerm])

  const editingCategory = useMemo(() => {
    if (!editingCategoryId) {
      return null
    }

    return categories.find((category) => category.id === editingCategoryId) || null
  }, [categories, editingCategoryId])

  const formInitialValues = useMemo(() => {
    if (formMode !== 'edit' || !editingCategory) {
      return defaultCategoryValues
    }

    return {
      ...editingCategory,
      productCount: String(editingCategory.productCount),
    }
  }, [editingCategory, formMode])

  const handleAddCategory = () => {
    setFormMode('create')
    setEditingCategoryId(null)
    setIsFormOpen(true)
  }

  const handleEditCategory = (category) => {
    setFormMode('edit')
    setEditingCategoryId(category.id)
    setIsFormOpen(true)
  }

  const handleDeleteCategory = async (category) => {
    const confirmed = window.confirm(`Bạn có chắc muốn xóa danh mục "${category.name}"?`)

    if (!confirmed) {
      return
    }

    try {
      await deleteCategory(category.id)
      setCategories((prevCategories) => prevCategories.filter((item) => item.id !== category.id))
      setPageError('')
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Xóa danh mục thất bại.')
    }
  }

  const handleSubmitForm = async (formData) => {
    if (formMode === 'edit' && editingCategoryId) {
      const savedCategory = await updateCategory(editingCategoryId, formData)
      setCategories((prevCategories) =>
        prevCategories.map((category) => (category.id === editingCategoryId ? savedCategory : category))
      )
    } else {
      const savedCategory = await createCategory(formData)
      setCategories((prevCategories) => [savedCategory, ...prevCategories])
    }

    setIsFormOpen(false)
    setEditingCategoryId(null)
    setFormMode('create')
    setPageError('')
  }

  const handleCancelForm = () => {
    setIsFormOpen(false)
    setEditingCategoryId(null)
    setFormMode('create')
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quản lý danh mục</h2>
          <p className="mt-1 text-sm text-slate-500">Quản trị danh mục sản phẩm, slug, mô tả và trạng thái hiển thị.</p>
        </div>

        <button
          type="button"
          onClick={handleAddCategory}
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          + Thêm danh mục
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Tìm kiếm theo tên danh mục
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Nhập tên danh mục..."
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          />
        </label>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">Loading category data...</div>
      ) : null}

      {pageError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div>
      ) : null}

      {isFormOpen ? (
        <CategoryForm
          mode={formMode}
          initialValues={formInitialValues}
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
        />
      ) : null}

      <CategoriesTable categories={filteredCategories} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
    </section>
  )
}

export default AdminCategoriesPage
