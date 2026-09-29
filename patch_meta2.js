const fs = require('fs');
let content = fs.readFileSync('src/app/layout.tsx', 'utf8');

content = content.replace(
  /locale: 'en_IN',\n    type: 'website',\n  \},/,
  `locale: 'en_IN',\n    type: 'website',\n    images: [{ url: '/headphone.png', width: 1200, height: 630, alt: 'GreedyCart' }],\n  },`
);

content = content.replace(
  /twitter: \{\n    card: 'summary_large_image',\n    title: 'GreedyCart — Compare Prices Across Amazon, Flipkart, Myntra & More',\n    description: 'Compare prices instantly across all top Indian platforms\. Stop overpaying\.',\n  \},/,
  `twitter: {\n    card: 'summary_large_image',\n    title: 'GreedyCart — Compare Prices Across Amazon, Flipkart, Myntra & More',\n    description: 'Compare prices instantly across all top Indian platforms. Stop overpaying.',\n    images: ['/headphone.png'],\n  },`
);

fs.writeFileSync('src/app/layout.tsx', content);
