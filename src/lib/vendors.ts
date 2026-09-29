export function buildOutboundUrl(vendor: string, productQueryOrId: string) {
  const v = vendor.toLowerCase();
  const slug = encodeURIComponent(productQueryOrId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''));
  const tag = process.env.AMAZON_TAG || 'greedycart-21';
  
  if (v.includes('amazon')) {
    // Generate a fake but structurally valid ASIN for mock data
    const fakeAsin = 'B0' + Buffer.from(productQueryOrId).toString('hex').substring(0, 8).toUpperCase();
    return `https://www.amazon.in/${slug}/dp/${fakeAsin}?tag=${tag}`;
  }
  if (v.includes('flipkart')) {
    const fakePid = 'MOB' + Buffer.from(productQueryOrId).toString('hex').substring(0, 13).toUpperCase();
    return `https://www.flipkart.com/${slug}/p/itm${fakePid}?pid=${fakePid}&affid=greedycart`;
  }
  if (v.includes('myntra')) {
    return `https://www.myntra.com/${slug}/${Math.floor(Math.random() * 1000000)}/buy`;
  }
  if (v.includes('jiomart')) {
    return `https://www.jiomart.com/p/electronics/${slug}/${Math.floor(Math.random() * 100000000)}`;
  }
  if (v.includes('tatacliq')) {
    return `https://www.tatacliq.com/${slug}/p-mp00000000${Math.floor(Math.random() * 10000000)}`;
  }
  
  return `https://www.google.co.in/search?q=${encodeURIComponent(productQueryOrId)}+buy`;
}
