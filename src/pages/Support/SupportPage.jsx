import SupportContactSection from "./components/SupportContactSection";
import SupportFaqSection from "./components/SupportFaqSection";
import SupportHero from "./components/SupportHero";
import SupportLocationSection from "./components/SupportLocationSection";
import SupportQuickActions from "./components/SupportQuickActions";
import SupportRequestForm from "./components/SupportRequestForm";

function SupportPage() {
  return (
    <div className="min-h-screen bg-[#f7f8f3]">
      <SupportHero />
      <SupportContactSection />
      <SupportQuickActions />
      <SupportFaqSection />
      <SupportRequestForm />
      <SupportLocationSection />
    </div>
  );
}

export default SupportPage;
