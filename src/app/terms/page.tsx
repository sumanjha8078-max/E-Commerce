export const metadata = { title: "Terms of Service | GreedyCart" };
export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
      <div className="prose dark:prose-invert">
        <p>By using GreedyCart, you agree to these Terms of Service.</p>
        <h2>Use of Service</h2>
        <p>GreedyCart is a price aggregation tool. We do not sell products directly. All purchases are made on third-party websites.</p>
        <h2>Accuracy of Information</h2>
        <p>While we strive to provide accurate and up-to-date pricing, we do not guarantee the accuracy, completeness, or reliability of any information on our site. Prices and availability are subject to change without notice.</p>
        <h2>Limitation of Liability</h2>
        <p>GreedyCart shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our service.</p>
      </div>
    </main>
  );
}
