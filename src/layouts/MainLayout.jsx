import { Outlet } from "react-router-dom";
import HeaderMain from "../components/layout/HeaderMain";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <div>
      <HeaderMain />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
