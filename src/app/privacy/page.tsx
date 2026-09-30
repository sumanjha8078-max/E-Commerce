export const metadata = { title: "Privacy Policy | GreedyCart" };
export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          At GreedyCart, we are committed to protecting your privacy. This policy outlines how we handle data when you interact with our price aggregation services.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Data Collection</h2>
        <p>
          GreedyCart is designed to be privacy-first. We do not require account creation for core search and comparison features. We only collect personally identifiable information (PII) when you explicitly provide it, such as:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>Newsletter Subscription:</strong> Your email address when you opt-in to price drop alerts.</li>
          <li><strong>Account Creation:</strong> Basic profile information if you choose to sign in via Google or our demo account.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Cookies & Local Storage</h2>
        <p>
          We use browser-based local storage (via Zustand persist) to maintain your <strong>Watchlist</strong>. This data stays on your device and is not uploaded to our servers unless you are signed into a synchronized account.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">3. Third-Party Links</h2>
        <p>
          Our core service redirects you to partner merchants (Amazon, Flipkart, etc.). Once you leave GreedyCart, your data is subject to the privacy policies of those respective platforms. We do not track your activity on external sites.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect any data we collect. We never sell your personal information to third-party data brokers.
        </p>
      </div>
    </main>
  );
}
