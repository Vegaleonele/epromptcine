import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { PromptGenerator } from "@/components/PromptGenerator";
import { DonationSection } from "@/components/DonationSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesShowcase />
        <PromptGenerator />
        <DonationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
