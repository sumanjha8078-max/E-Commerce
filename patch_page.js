const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace(
  /<\/div>\n\s*$/g,
  `
      {/* SEO Text Block */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-gray-600 dark:text-gray-400">
        <h2 className="text-3xl font-black text-black dark:text-white mb-6">How GreedyCart Finds the Best Deals in India</h2>
        <p className="mb-4 leading-relaxed">
          Shopping online across Indian platforms like Amazon, Flipkart, Myntra, JioMart, and TataCliq can be exhausting. Prices fluctuate wildly, and what looks like a "huge discount" on one site might just be an inflated MRP. That's why we built GreedyCart—a dedicated e-commerce aggregator that tracks and compares prices in real-time.
        </p>
        <p className="mb-4 leading-relaxed">
          Our intelligent engine doesn't just list products; it calculates a proprietary <strong>GreedyScore</strong> based on verified price drops and absolute lowest offers. Whether you are looking for the latest smartphones (like the iPhone 15 or Samsung Galaxy S24), premium noise-cancelling headphones, or everyday home appliances, we ensure you never overpay. 
        </p>
        <p className="leading-relaxed">
          We believe in complete transparency. Our data is aggregated directly from search results, and we openly disclose that we use affiliate links to keep our service free. To learn more about our methodology, check out our About page or review our Affiliate Disclosure. Start tracking price drops today and shop with confidence.
        </p>
      </section>
    </div>`
);

fs.writeFileSync('src/app/page.tsx', content);
