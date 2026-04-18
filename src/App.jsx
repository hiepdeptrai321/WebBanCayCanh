import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import AuthModal from "./components/auth/AuthModal";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
      <AuthModal />
    </BrowserRouter>
  );
}

export default App;
