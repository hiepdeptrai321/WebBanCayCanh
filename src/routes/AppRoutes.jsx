import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ShopLayout from "../layouts/ShopLayout";
import InfoLayout from "../layouts/InfoLayout";
import HomePage from "../pages/Home/HomePage";
import ProductsPage from "../pages/Products/ProductsPage";
import CartPage from "../pages/Cart/CartPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import PlaceholderPage from "../pages/PlaceholderPage";
import StoresPage from "../pages/Stores/StoresPage";
import AboutPage from "../pages/About/AboutUsPage";
function AppRoutes() {
  return (
    <Routes>
      {/* Trang chủ, Admin & fallback */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="*"
          element={<PlaceholderPage title="Trang không tồn tại" />}
        />
      </Route>

      {/* Trang sản phẩm & giỏ hàng */}
      <Route element={<ShopLayout />}>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      {/* Trang thông tin */}
      <Route element={<InfoLayout />}>
        <Route path="/stores" element={<StoresPage title="Các cửa hàng" />} />

        <Route
          path="/blog"
          element={<PlaceholderPage title="Kiến thức cây cảnh" />}
        />
        <Route path="/support" element={<PlaceholderPage title="Hỗ trợ" />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
