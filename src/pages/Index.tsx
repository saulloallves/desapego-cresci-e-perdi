import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import HowItWorks from "@/components/HowItWorks";
import ImpactSection from "@/components/ImpactSection";
import FAQSection from "@/components/FAQSection";
import FranchiseSection from "@/components/FranchiseSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <HowItWorks />
        <ImpactSection />
        <FAQSection />
        <FranchiseSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
