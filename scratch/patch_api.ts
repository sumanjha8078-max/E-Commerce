import fs from 'fs';

let content = fs.readFileSync('src/app/api/search/route.ts', 'utf8');

const regex = /url:\s*item\.link,/g;

content = content.replace(
  `url: item.link,`,
  `url: name === 'Amazon' ? \`https://www.amazon.in/s?k=\${encodeURIComponent(item.title)}\` : name === 'Flipkart' ? \`https://www.flipkart.com/search?q=\${encodeURIComponent(item.title)}\` : name === 'Myntra' ? \`https://www.myntra.com/\${encodeURIComponent(item.title)}\` : item.link,`
);

fs.writeFileSync('src/app/api/search/route.ts', content);
