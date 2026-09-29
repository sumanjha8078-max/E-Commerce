const fs = require('fs');
let content = fs.readFileSync('src/data/products.ts', 'utf8');

const replacement = `
function generateRealisticProductUrl(vendor, productName) {
  const v = vendor.toLowerCase();
  const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  if (v.includes('amazon')) {
    // Generate a fake but realistic-looking ASIN based on the string length
    const fakeAsin = 'B0' + Buffer.from(productName).toString('hex').substring(0, 8).toUpperCase();
    return \`https://www.amazon.in/\${slug}/dp/\${fakeAsin}?tag=greedycart-21\`;
  }
  if (v.includes('flipkart')) {
    const fakePid = 'MOB' + Buffer.from(productName).toString('hex').substring(0, 13).toUpperCase();
    return \`https://www.flipkart.com/\${slug}/p/itm\${fakePid}?pid=\${fakePid}&affid=greedycart\`;
  }
  if (v.includes('myntra')) {
    return \`https://www.myntra.com/\${slug}/\${Math.floor(Math.random() * 1000000)}/buy\`;
  }
  if (v.includes('jiomart')) {
    return \`https://www.jiomart.com/p/electronics/\${slug}/\${Math.floor(Math.random() * 100000000)}\`;
  }
  if (v.includes('tatacliq')) {
    return \`https://www.tatacliq.com/\${slug}/p-mp00000000\${Math.floor(Math.random() * 10000000)}\`;
  }
  
  return \`https://www.google.co.in/search?q=\${encodeURIComponent(productName)}+buy\`;
}

export const products: Product[] = rawProducts.map(p => ({
  ...p,
  offers: p.offers.map(o => ({
    ...o,
    url: generateRealisticProductUrl(o.vendorName, p.name)
  }))
}));
`;

content = content.replace(/export const products: Product\[\] = rawProducts\.map\([\s\S]*?\)\)\);\n/g, replacement);

fs.writeFileSync('src/data/products.ts', content);
