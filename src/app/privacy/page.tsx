export const metadata = { title: "Privacy Policy | GreedyCart" };
export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert">
        <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use GreedyCart.</p>
        <h2>Information We Collect</h2>
        <p>We do not collect personally identifiable information unless you explicitly provide it (e.g., subscribing to our newsletter). We may collect anonymous usage data to improve our service.</p>
        <h2>How We Use Your Information</h2>
        <p>Any information collected is used solely to provide and improve GreedyCart, such as sending price alerts if requested.</p>
        <h2>Cookies</h2>
        <p>We may use cookies to persist your watchlist and preferences. You can disable cookies in your browser settings.</p>
      </div>
    </main>
  );
}
