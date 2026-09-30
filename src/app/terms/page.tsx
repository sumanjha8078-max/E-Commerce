export const metadata = { title: "Terms of Service | GreedyCart" };
export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          By accessing and using GreedyCart, you agree to be bound by the following terms and conditions.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Nature of Service</h2>
        <p>
          GreedyCart is a price aggregation and comparison tool. We facilitate the discovery of deals but do not sell any products directly. All transactions are completed on third-party merchant websites.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">2. Accuracy of Information</h2>
        <p>
          While we strive for real-time accuracy, e-commerce prices are volatile. GreedyCart does not guarantee that the price shown on our dashboard will be identical to the final checkout price on the merchant's site. Users are encouraged to verify prices before purchase.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">3. Limitation of Liability</h2>
        <p>
          GreedyCart shall not be held liable for any pricing errors, product defects, or shipping delays occurring on third-party platforms. Our role is limited to data aggregation.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">4. User Conduct</h2>
        <p>
          Users agree not to use automated scripts or scrapers to extract data from GreedyCart for commercial purposes.
        </p>
      </div>
    </main>
  );
}
