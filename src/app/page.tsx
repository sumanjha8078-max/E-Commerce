import CategoryCards from "@/components/CategoryCards";

import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import SaleBanner from "@/components/SaleBanner";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 overflow-x-hidden">
      {/* Massive Hero Section highlighting top deals */}
      <h1 className="sr-only">GreedyCart - Compare prices across India&apos;s top stores</h1>
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
        limit={5}
        showSeeMore={true}
      />

      <ProductCard 
        title="Fashion & Apparel 👕" 
        defaultQuery="clothing and shoes" 
        hideSearch={true}
        limit={5}
        showSeeMore={true}
      />
      
      <ProductCard 
        title="Home & Kitchen Appliances 🏠" 
        defaultQuery="appliances" 
        hideSearch={true}
        limit={5}
        showSeeMore={true}
      />
      
      {/* Aggregator Benefits */}
      <Services />

      {/* Promotional Banner */}
      <SaleBanner />

      {/* SEO Text Block */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-gray-600 dark:text-gray-400">
        <h2 className="text-3xl font-black text-black dark:text-white mb-6">How GreedyCart Finds the Best Deals in India</h2>
        <p className="mb-4 leading-relaxed">
          Shopping online across Indian platforms like Amazon, Flipkart, Myntra, JioMart, and TataCliq can be exhausting. Prices fluctuate wildly, and what looks like a &quot;huge discount&quot; on one site might just be an inflated MRP. That&apos;s why we built GreedyCart—a dedicated e-commerce aggregator that tracks and compares prices in real-time.
        </p>
        <p className="mb-4 leading-relaxed">
          Our intelligent engine doesn&apos;t just list products; it calculates a proprietary <strong>GreedyScore</strong> based on verified price drops and absolute lowest offers. Whether you are looking for the latest smartphones (like the iPhone 15 or Samsung Galaxy S24), premium noise-cancelling headphones, or everyday home appliances, we ensure you never overpay.
        </p>
        <p className="leading-relaxed">
          We believe in complete transparency. Our data is aggregated directly from search results, and we openly disclose that we use affiliate links to keep our service free. To learn more about our methodology, check out our About page or review our Affiliate Disclosure. Start tracking price drops today and shop with confidence.
        </p>
      </section>
      
    </div>

  );
}
