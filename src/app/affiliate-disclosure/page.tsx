export const metadata = { title: "Affiliate Disclosure | GreedyCart" };
export default function AffiliateDisclosurePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-8">Affiliate Disclosure</h1>
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Transparency is core to the GreedyCart experience. This page explains how we monetize our service while remaining free for users.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">How We Earn</h2>
        <p>
          GreedyCart participates in various affiliate marketing programs. When you click on a "Buy Now" or "View Deal" link and make a purchase on a partner site (e.g., Amazon, Flipkart, Myntra), the merchant may pay us a small commission.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">No Cost to You</h2>
        <p>
          This commission is paid by the merchant and does not increase the price of the product you are buying. In many cases, our aggregation actually helps you find a lower price than you would have found alone.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Integrity Pledge</h2>
        <p>
          Our GreedyScore and product rankings are based on strict mathematical formulas and real-time pricing data. We do not accept payments from brands to artificially inflate their scores or move them to the top of our search results. The best deal always wins.
        </p>
      </div>
    </main>
  );
}
