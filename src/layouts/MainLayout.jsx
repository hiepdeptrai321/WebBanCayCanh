import { Outlet } from "react-router-dom";
import HeaderShop from "../components/layout/HeaderShop";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderShop />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
