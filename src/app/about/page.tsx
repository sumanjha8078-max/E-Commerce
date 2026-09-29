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
            GreedyCart is a dedicated price aggregation engine built specifically for the Indian market. We know how frustrating it can be to jump between multiple tabs—Amazon, Flipkart, Myntra, JioMart, and TataCliq—just to make sure you are getting the best deal. We eliminate that friction. By indexing offers from India&apos;s biggest retail giants, we bring all the prices into one simple, unified dashboard.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How Our Comparison Works</h2>
          <p>
            When you search for a product on GreedyCart, our system simultaneously queries the major platforms. We pull in the latest pricing, the original MRP, and stock availability. We then sort these offers to instantly highlight the absolute lowest price. Our platform supports a wide array of categories, including Mobiles, Laptops, Audio, Fashion, Home Appliances, Beauty, and Gaming.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The GreedyScore Methodology</h2>
          <p>
            We don&apos;t just show you prices; we help you understand if a deal is actually worth taking. Every product on our platform receives a <strong>GreedyScore</strong> (out of 10). This score is calculated using a deterministic algorithm that heavily weighs the percentage discount off the original MRP. A higher score means a more massive price drop. (Note: Our algorithm does not use AI; it relies on strict mathematical formulas to ensure complete transparency).
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Freshness & Demo Mode</h2>
          <p>
            Transparency is our core value. Currently, GreedyCart operates using a mixture of live SerpApi data and a deterministic mock engine for fallback scenarios. If you see a yellow &quot;Demo Mode&quot; badge on the site, it means the prices shown are illustrative and not live. When fully connected to our production data pipelines, we strive to reflect pricing changes as accurately as possible.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How We Earn Money</h2>
          <p>
            To keep GreedyCart free for all users, we participate in affiliate marketing programs. When you click a link on our site and make a purchase on a partner platform (like Amazon or Flipkart), we may earn a small commission at no additional cost to you. This does not influence our rankings or the GreedyScore. Read our full <a href="/affiliate-disclosure" className="text-[#ff2d3d] hover:underline">Affiliate Disclosure</a> for more details.
          </p>
        </div>
      </main>
    </div>
  );
}
