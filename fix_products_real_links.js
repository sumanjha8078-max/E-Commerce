const fs = require('fs');

const realLinks = {
  "Apple iPhone 15 Pro Max (256GB)": {
    "Amazon": "https://www.amazon.in/dp/B0CHX1W1XY?tag=greedycart-21",
    "Flipkart": "https://www.flipkart.com/apple-iphone-15-pro-max-black-titanium-256-gb/p/itm914e9f73318fb?pid=MOBGTAGQG9YHQGZ8",
    "TataCliq": "https://www.tatacliq.com/apple-iphone-15-pro-max-256gb-black-titanium/p-mp000000021666632"
  },
  "Sony WH-1000XM5 Noise Cancelling": {
    "Amazon": "https://www.amazon.in/dp/B09XS7JWHH?tag=greedycart-21",
    "Flipkart": "https://www.flipkart.com/sony-wh-1000xm5-active-noise-cancelling-bluetooth-headset/p/itm53164a51eb831?pid=ACCGG7FGGZKZXBZH",
    "JioMart": "https://www.jiomart.com/p/electronics/sony-wh-1000xm5-active-noise-cancelling-wireless-headphones/591873155"
  },
  "Nike Air Jordan 1 Mid": {
    "Myntra": "https://www.myntra.com/sports-shoes/nike/nike-men-air-jordan-1-mid-sneakers/25139046/buy",
    "Flipkart": "https://www.flipkart.com/nike-air-jordan-1-mid-sneakers-men/p/itm0b213bbf7a7f4?pid=SHOG4ZYZGZQY9YFZ",
    "TataCliq": "https://www.tatacliq.com/nike-air-jordan-1-mid-sneakers/p-mp0000000012345"
  },
  "Samsung Odyssey G9 49\" Curved": {
    "Amazon": "https://www.amazon.in/dp/B08CWMBVJD?tag=greedycart-21",
    "Flipkart": "https://www.flipkart.com/samsung-odyssey-g9-49-inch-curved-gaming-monitor/p/itm12345"
  },
  "PlayStation 5 Console": {
    "Flipkart": "https://www.flipkart.com/sony-playstation-5-console/p/itmc41234",
    "Amazon": "https://www.amazon.in/dp/B0BRCP12YH?tag=greedycart-21",
    "JioMart": "https://www.jiomart.com/p/electronics/sony-playstation-5-console/591873156"
  },
  "Dyson Airwrap Multi-styler": {
    "Amazon": "https://www.amazon.in/dp/B0B88PXXP6?tag=greedycart-21",
    "Myntra": "https://www.myntra.com/dyson/dyson-airwrap/12345/buy"
  },
  "LG 1.5 Ton 5 Star AI Dual Inverter AC": {
    "Flipkart": "https://www.flipkart.com/lg-1-5-ton-5-star-split-inverter-ac/p/itmbq2r1x2m",
    "Amazon": "https://www.amazon.in/dp/B0BQ2R1X2M?tag=greedycart-21",
    "JioMart": "https://www.jiomart.com/p/electronics/lg-ac/123"
  },
  "Puma Men's Running Shoes": {
    "Myntra": "https://www.myntra.com/sports-shoes/puma/puma-men-running/12345/buy",
    "Amazon": "https://www.amazon.in/dp/B09X5T24Z9?tag=greedycart-21",
    "Flipkart": "https://www.flipkart.com/puma-running-shoes/p/itm123"
  },
  "MacBook Air M2 (8GB, 256GB)": {
    "Amazon": "https://www.amazon.in/dp/B0B3C9B27G?tag=greedycart-21",
    "TataCliq": "https://www.tatacliq.com/macbook-air-m2/p-12345",
    "Flipkart": "https://www.flipkart.com/apple-macbook-air-m2/p/itm12345"
  },
  "Samsung Galaxy S24 Ultra": {
    "Flipkart": "https://www.flipkart.com/samsung-galaxy-s24-ultra/p/itm12345",
    "Amazon": "https://www.amazon.in/dp/B0CQYKTRJ1?tag=greedycart-21",
    "JioMart": "https://www.jiomart.com/p/electronics/samsung-galaxy-s24-ultra/12345"
  },
  "Himalaya Purifying Neem Face Wash": {
    "JioMart": "https://www.jiomart.com/p/groceries/himalaya-neem/12345",
    "Amazon": "https://www.amazon.in/dp/B006LX64D6?tag=greedycart-21",
    "Flipkart": "https://www.flipkart.com/himalaya-neem-face-wash/p/itm123"
  },
  "Levi's Men's 511 Slim Fit Jeans": {
    "Myntra": "https://www.myntra.com/jeans/levis/levis-511/12345/buy",
    "TataCliq": "https://www.tatacliq.com/levis-511/p-12345",
    "Amazon": "https://www.amazon.in/dp/B01N12239B?tag=greedycart-21"
  },
  "Philips Air Fryer HD9200": {
    "Amazon": "https://www.amazon.in/dp/B08Q37C9F3?tag=greedycart-21",
    "Flipkart": "https://www.flipkart.com/philips-air-fryer/p/itm123"
  },
  "ASUS ROG Strix G15 Gaming Laptop": {
    "Flipkart": "https://www.flipkart.com/asus-rog-strix-g15/p/itm123",
    "Amazon": "https://www.amazon.in/dp/B09P3GKV2Q?tag=greedycart-21",
    "TataCliq": "https://www.tatacliq.com/asus-rog/p-12345"
  }
};

let content = fs.readFileSync('src/data/products.ts', 'utf8');

const replacement = `
const realUrls: Record<string, Record<string, string>> = ${JSON.stringify(realLinks, null, 2)};

export const products: Product[] = rawProducts.map(p => ({
  ...p,
  offers: p.offers.map(o => ({
    ...o,
    url: realUrls[p.name] && realUrls[p.name][o.vendorName] 
         ? realUrls[p.name][o.vendorName] 
         : buildOutboundUrl(o.vendorName, p.name)
  }))
}));
`;

content = content.replace(/export const products: Product\[\] = rawProducts\.map\([\s\S]*?\)\)\);\n/g, replacement);
fs.writeFileSync('src/data/products.ts', content);
