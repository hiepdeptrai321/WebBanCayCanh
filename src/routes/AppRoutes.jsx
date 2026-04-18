import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ShopLayout from '../layouts/ShopLayout'
import InfoLayout from '../layouts/InfoLayout'
import AdminLayout from '../layouts/AdminLayout'
import HomePage from '../pages/Home/HomePage'
import ProductsPage from '../pages/Products/ProductsPage'
import CartPage from '../pages/Cart/CartPage'
import CheckoutPage from '../pages/Checkout/CheckoutPage'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import AdminCategoriesPage from '../pages/Admin/AdminCategoriesPage'
import AdminProductsPage from '../pages/Admin/AdminProductsPage'
import AdminOrdersPage from '../pages/Admin/AdminOrdersPage'
import AdminReviewsPage from '../pages/Admin/AdminReviewsPage'
import AdminUsersPage from '../pages/Admin/AdminUsersPage'
import AdminInventoryPage from '../pages/Admin/AdminInventoryPage'
import AdminBlogPostsPage from '../pages/Admin/AdminBlogPostsPage'
import AdminStoresPage from '../pages/Admin/AdminStoresPage'
import AdminContentPage from '../pages/Admin/AdminContentPage'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import PlaceholderPage from '../pages/PlaceholderPage'
import AdminRouteGuard from './AdminRouteGuard'

function AppRoutes() {
  return (
    <Routes>
      {/* Trang chủ, Admin & fallback */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<PlaceholderPage title="Trang không tồn tại" />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route element={<AdminRouteGuard />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="inventory" element={<AdminInventoryPage />} />
          <Route
            path="orders"
            element={<AdminOrdersPage />}
          />
          <Route path="reviews" element={<AdminReviewsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="blog-posts" element={<AdminBlogPostsPage />} />
          <Route path="stores" element={<AdminStoresPage />} />
          <Route path="content" element={<AdminContentPage />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>

      {/* Trang sản phẩm & giỏ hàng */}
      <Route element={<ShopLayout />}>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      {/* Trang thông tin */}
      <Route element={<InfoLayout />}>
        <Route path="/stores" element={<PlaceholderPage title="Các cửa hàng" />} />
        <Route path="/blog" element={<PlaceholderPage title="Kiến thức cây cảnh" />} />
        <Route path="/support" element={<PlaceholderPage title="Hỗ trợ" />} />
        <Route path="/about" element={<PlaceholderPage title="Về chúng tôi" />} />
      </Route>


    </Routes>
  )
}

export default AppRoutes
