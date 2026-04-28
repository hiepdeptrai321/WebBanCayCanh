import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import AuthModal from "./components/auth/AuthModal";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import RouteSeo from "./components/common/RouteSeo";

function App() {
  return (
    <BrowserRouter>
      <RouteSeo />
      <CartProvider>
        <AppRoutes />
        <ScrollToTopButton />
      </CartProvider>
      <AuthModal />
    </BrowserRouter>
  );
}

export default App;
