import HeroTopSection from "./components/HeroTopSection";
import LocationStrip from "./components/LocationStrip";
import FeaturedProducts from "./components/FeaturedProducts";
import CategorySection from "./components/CategorySection";
import BenefitsSection from "./components/BenefitsSection";
import PromotionBanner from "./components/PromotionBanner";
import BlogSection from "./components/BlogSection";
import AboutPreview from "../../components/common/AboutPreview";
function HomePage() {
  return (
    <main>
      <HeroTopSection />
      <LocationStrip />
      <FeaturedProducts />
      <CategorySection />
      <AboutPreview />
      <BenefitsSection />
      <PromotionBanner />
      <BlogSection />
    </main>
  );
}

export default HomePage;
