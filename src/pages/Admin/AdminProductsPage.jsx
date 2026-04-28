import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import AdminProductsTable from '../../components/admin/AdminProductsTable'
import ProductForm from '../../components/admin/ProductForm'
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../../services/productService'
import { showConfirmToast } from '../../utils/toastNotifications'

const defaultFormValues = {
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

function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState('create')
  const [editingProductId, setEditingProductId] = useState(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true)
        setPageError('')
        const data = await getAllProducts()
        setProducts(data)
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Không thể tải danh sách sản phẩm.')
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = useMemo(() => {
    const values = products.map((product) => product.category)
    return ['Tất cả', ...new Set(values)]
  }, [products])

  const productCategories = useMemo(() => {
    const values = products.map((product) => product.category)
    return [...new Set(values)]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchName = product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      const matchCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory

      return matchName && matchCategory
    })
  }, [products, searchTerm, selectedCategory])

  const handleAddProduct = () => {
    setFormMode('create')
    setEditingProductId(null)
    setIsFormOpen(true)
  }

  const handleEditProduct = (product) => {
    setFormMode('edit')
    setEditingProductId(product.id)
    setIsFormOpen(true)
  }

  const handleDeleteProduct = async (product) => {
    const confirmed = await showConfirmToast({
      message: `Bạn có chắc muốn xóa sản phẩm "${product.name}"?`,
      confirmText: 'Xóa',
      cancelText: 'Hủy',
    })

    if (!confirmed) {
      return
    }

    try {
      await deleteProduct(product.id)
      setProducts((prevProducts) => prevProducts.filter((item) => item.id !== product.id))
      toast.success('Đã xóa sản phẩm.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Xóa sản phẩm thất bại.'
      setPageError(message)
      toast.error(message)
    }
  }

  const editingProduct = useMemo(() => {
    if (!editingProductId) {
      return null
    }

    return products.find((product) => product.id === editingProductId) || null
  }, [products, editingProductId])

  const formInitialValues = useMemo(() => {
    if (formMode !== 'edit' || !editingProduct) {
      return defaultFormValues
    }

    return {
      ...editingProduct,
      price: String(editingProduct.price),
        salePrice: editingProduct.salePrice == null ? '' : String(editingProduct.salePrice),
      stock: String(editingProduct.stock),
    }
  }, [formMode, editingProduct])

  const handleSubmitForm = async (formData) => {
    const successMessage = formMode === 'edit' ? 'Cập nhật sản phẩm thành công.' : 'Tạo sản phẩm thành công.'

    if (formMode === 'edit' && editingProductId) {
      const savedProduct = await updateProduct(editingProductId, formData)
      setProducts((prevProducts) => prevProducts.map((product) => (product.id === editingProductId ? savedProduct : product)))
    } else {
      const savedProduct = await createProduct(formData)
      setProducts((prevProducts) => [savedProduct, ...prevProducts])
    }

    setIsFormOpen(false)
    setEditingProductId(null)
    setFormMode('create')
    setPageError('')
    toast.success(successMessage)
  }

  const handleCancelForm = () => {
    setIsFormOpen(false)
    setEditingProductId(null)
    setFormMode('create')
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quản lý sản phẩm</h2>
          <p className="mt-1 text-sm text-slate-500">Theo dõi danh sách sản phẩm, tồn kho và trạng thái kinh doanh.</p>
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">Đang tải dữ liệu sản phẩm...</div>
      ) : null}

      {pageError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div>
      ) : null}

      {isFormOpen ? (
        <ProductForm
          mode={formMode}
          initialValues={formInitialValues}
          categories={productCategories}
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
        />
      ) : null}

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Tìm kiếm theo tên
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Nhập tên sản phẩm..."
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Lọc theo danh mục
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-11 rounded-lg border border-slate-300 px-3 outline-none ring-emerald-300 transition focus:border-emerald-500 focus:ring"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <AdminProductsTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </section>
  )
}

export default AdminProductsPage
