import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderInfo from "../components/layout/HeaderInfo";
import Footer from "../components/layout/Footer";
import HeaderShop from "../components/layout/HeaderShop";

function InfoLayout() {
  const [bannerConfig, setBannerConfig] = useState({ title: "", bgImage: "" });

  return (
    <div>
      <HeaderShop title={bannerConfig.title} bgImage={bannerConfig.bgImage} />
      <main>
        <Outlet context={{ setBannerConfig }} />
      </main>
      <Footer />
    </div>
  );
}

export default InfoLayout;
