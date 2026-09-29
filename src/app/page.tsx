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
      
      {/* Core Aggregator View: Main Search / Trending */}
      <div id="products">
        <ProductCard title={
          <>Trending Price Drops <span className="text-[#ff2d3d]">🔥</span></>
        } />
      </div>

      <ProductCard 
        title="Top Gadgets & Tech 💻" 
        defaultQuery="laptops and smartwatches" 
        hideSearch={true}
      />

      <ProductCard 
        title="Fashion & Apparel 👕" 
        defaultQuery="clothing and shoes" 
        hideSearch={true}
      />
      
      <ProductCard 
        title="Home & Kitchen Appliances 🏠" 
        defaultQuery="appliances" 
        hideSearch={true}
      />
      
      {/* Aggregator Benefits */}
      <Services />

      {/* Promotional Banner */}
      <SaleBanner />
      
      <Footer />
    </div>
  );
}
