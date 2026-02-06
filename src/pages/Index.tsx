import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PromptGenerator } from "@/components/PromptGenerator";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PromptGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
