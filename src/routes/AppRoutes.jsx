import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ShopLayout from "../layouts/ShopLayout";
import InfoLayout from "../layouts/InfoLayout";
import BlogDetailLayout from "../layouts/BlogDetailLayout";
import BlogKnowledgeLayout from "../layouts/BlogKnowledgeLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/Home/HomePage";
import ProductsPage from "../pages/Products/ProductsPage";
import ProductDetailPage from "../pages/Products/ProductDetailPage";
import CartPage from "../pages/Cart/CartPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminCategoriesPage from "../pages/Admin/AdminCategoriesPage";
import AdminProductsPage from "../pages/Admin/AdminProductsPage";
import AdminOrdersPage from "../pages/Admin/AdminOrdersPage";
import AdminReviewsPage from "../pages/Admin/AdminReviewsPage";
import AdminUsersPage from "../pages/Admin/AdminUsersPage";
import AdminInventoryPage from "../pages/Admin/AdminInventoryPage";
import AdminBlogPostsPage from "../pages/Admin/AdminBlogPostsPage";
import AdminStoresPage from "../pages/Admin/AdminStoresPage";
import AdminContentPage from "../pages/Admin/AdminContentPage";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import PlaceholderPage from "../pages/PlaceholderPage";
import StoresPage from "../pages/Stores/StoresPage";
import AboutPage from "../pages/About/AboutUsPage";
import BlogKnowledgePage from "../pages/Blog/BlogKnowledgePage";
import BlogDetailPage from "../pages/Blog/BlogDetailPage";
import SupportPage from "../pages/Support/SupportPage";
import AdminRouteGuard from "./AdminRouteGuard";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import TestCounter from "../TestCounter";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/test-counter" element={<TestCounter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={<PlaceholderPage title="Trang không tồn tại" />}
        />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route element={<AdminRouteGuard />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="inventory" element={<AdminInventoryPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="blog-posts" element={<AdminBlogPostsPage />} />
          <Route path="stores" element={<AdminStoresPage />} />
          <Route path="content" element={<AdminContentPage />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>

      <Route element={<ShopLayout />}>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      <Route element={<InfoLayout />}>
        <Route path="/stores" element={<StoresPage title="Các cửa hàng" />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route element={<BlogKnowledgeLayout />}>
        <Route path="/blog" element={<BlogKnowledgePage />} />
      </Route>

      <Route element={<BlogDetailLayout />}>
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
