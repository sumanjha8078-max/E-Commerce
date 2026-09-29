export function buildOutboundUrl(vendor: string, productQueryOrId: string) {
  const v = vendor.toLowerCase();
  const q = encodeURIComponent(productQueryOrId);
  const tag = process.env.AMAZON_TAG || 'greedycart-21';
  
  if (v.includes('amazon')) return `https://www.amazon.in/s?k=${q}&tag=${tag}`;
  if (v.includes('flipkart')) return `https://www.flipkart.com/search?q=${q}`;
  if (v.includes('myntra')) return `https://www.myntra.com/${q}`;
  if (v.includes('jiomart')) return `https://www.jiomart.com/catalogsearch/result?q=${q}`;
  if (v.includes('tatacliq')) return `https://www.tatacliq.com/search/?searchCategory=all&text=${q}`;
  
  return `https://www.google.co.in/search?q=${q}+buy`;
}
