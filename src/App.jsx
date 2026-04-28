import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import AuthModal from "./components/auth/AuthModal";
import ScrollToTopButton from "./components/common/ScrollToTopButton";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRoutes />
        <ScrollToTopButton />
      </CartProvider>
      <AuthModal />
    </BrowserRouter>
  );
}

export default App;
