import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | GreedyCart",
  description: "Learn how GreedyCart aggregates prices across Amazon, Flipkart, Myntra, and more to help you find the best deals in India.",
  openGraph: {
    title: "About Us | GreedyCart",
    description: "Learn how GreedyCart aggregates prices across Amazon, Flipkart, Myntra, and more to help you find the best deals in India.",
    url: "https://greedycart.vercel.app/about",
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-32 pb-20 overflow-hidden">
      <main className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-black mb-8 text-black dark:text-white">About GreedyCart</h1>

        <div className="prose prose-lg dark:prose-invert">
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium italic mb-10">
            &quot;Our mission is to empower Indian consumers with transparent, real-time pricing data across the entire e-commerce ecosystem, ensuring you never overpay for a product again.&quot;
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">What is GreedyCart?</h2>
          <p>
            GreedyCart is a high-performance price aggregation engine engineered specifically for the fragmented Indian e-commerce landscape. We recognize that shopping in India involves a complex dance between multiple giants—Amazon, Flipkart, Myntra, JioMart, and TataCliq. Our platform eliminates the tedious process of manual tab-switching by consolidating live pricing, availability, and delivery estimates into a single, unified intelligence dashboard.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How Our Comparison Engine Works</h2>
          <p>
            Our system doesn't just scrape data; it orchestrates real-time queries across major retail APIs and search indices. When you search for a product, GreedyCart simultaneously fetches the latest offers, original MRPs, and stock status. We then apply a strict sorting algorithm to highlight the absolute lowest price currently available in the market, saving you both time and money.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The GreedyScore Methodology</h2>
          <p>
            To move beyond simple price listing, we introduced the <strong>GreedyScore</strong>. This is a deterministic score (out of 10) that quantifies the "value" of a deal. Our algorithm analyzes the percentage drop from the original MRP, the reliability of the vendor, and current market trends. A score of 9+ indicates a rare, high-value price drop that warrants immediate action. Because we use mathematical formulas rather than black-box AI, our scoring remains transparent and consistent.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment to Accuracy</h2>
          <p>
            Data freshness is the cornerstone of our service. GreedyCart utilizes a hybrid architecture combining live API data with high-frequency cached indices. While we strive for 100% accuracy, e-commerce prices fluctuate by the minute. We encourage users to verify the final price on the merchant's site via our direct outbound links.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How We Sustain GreedyCart</h2>
          <p>
            GreedyCart is and will always remain free for the consumer. We sustain our operations through strategic affiliate partnerships. When you discover a deal and proceed to purchase it through one of our links, we may receive a small commission from the retailer. This partnership allows us to keep our infrastructure running without ever charging our users or selling their personal data.
          </p>
          <p className="mt-4">For a full breakdown of our legal standings, please visit our <a href="/affiliate-disclosure" className="text-[#ff2d3d] hover:underline">Affiliate Disclosure</a>, <a href="/privacy" className="text-[#ff2d3d] hover:underline">Privacy Policy</a>, or <a href="/terms" className="text-[#ff2d3d] hover:underline">Terms of Service</a>.</p>
        </div>
      </main>
    </div>
  );
}
