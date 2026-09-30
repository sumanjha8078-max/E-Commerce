const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace(
  /<ProductCard \n        title="Top Gadgets & Tech 💻" \n        defaultQuery="laptops and smartwatches" \n        hideSearch={true}\n      \/>/g,
  `<ProductCard 
        title="Top Gadgets & Tech 💻" 
        defaultQuery="laptops and smartwatches" 
        hideSearch={true}
        limit={5}
        showSeeMore={true}
      />`
);

content = content.replace(
  /<ProductCard \n        title="Fashion & Apparel 👕" \n        defaultQuery="clothing and shoes" \n        hideSearch={true}\n      \/>/g,
  `<ProductCard 
        title="Fashion & Apparel 👕" 
        defaultQuery="clothing and shoes" 
        hideSearch={true}
        limit={5}
        showSeeMore={true}
      />`
);

content = content.replace(
  /<ProductCard \n        title="Home & Kitchen Appliances 🏠" \n        defaultQuery="appliances" \n        hideSearch={true}\n      \/>/g,
  `<ProductCard 
        title="Home & Kitchen Appliances 🏠" 
        defaultQuery="appliances" 
        hideSearch={true}
        limit={5}
        showSeeMore={true}
      />`
);

fs.writeFileSync('src/app/page.tsx', content);
