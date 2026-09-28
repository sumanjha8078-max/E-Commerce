import CategoryCards from "@/components/CategoryCards";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import SaleBanner from "@/components/SaleBanner";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 overflow-x-hidden">
      {/* Massive Hero Section highlighting top deals */}
      <HeroSlider />
      
      {/* Quick Category Links */}
      <CategoryCards />
      
      {/* Core Aggregator View: Trending Price Drops */}
      <ProductCard />
      
      {/* Aggregator Benefits */}
      <Services />

      {/* Promotional Banner */}
      <SaleBanner />
      
      <Footer />
    </div>
  );
}
