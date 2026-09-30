import { computeGreedyScore } from '@/lib/score';
import { buildOutboundUrl } from "@/lib/vendors";
import { NextResponse } from 'next/server';
import { Product, VendorName, VendorOffer } from '@/types';

// Simple hash function for fallback mock data
function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'trending';
  const SERPAPI_KEY = process.env.SERPAPI_KEY;

  if (SERPAPI_KEY) {
    try {
      // 1. Fetch real product data from Google Shopping via SerpApi
      const res = await fetch(`https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&gl=in&hl=en&api_key=${SERPAPI_KEY}`);
      const data = await res.json();

      if (data.shopping_results && data.shopping_results.length > 0) {
        // Filter out products that don't have images so we don't use weird Picsum landscape photos
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const validResults = data.shopping_results.filter((item: any) => item.thumbnail);
        
        // 2. Map the real results into our Product type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const realProducts: Product[] = validResults.slice(0, 5).map((item: any, index: number) => {
          const priceRaw = item.extracted_price || 0;
          const price = typeof priceRaw === 'number' ? priceRaw : parseFloat(String(priceRaw).replace(/[^0-9.]/g, ''));
          
          // Generate realistic variations for the same product to simulate competitors
          const generateCompetitor = (name: string, priceMod: number): VendorOffer => ({
            vendorName: name,
            price: Math.floor(price * priceMod),
            originalPrice: Math.floor(price * (priceMod + 0.2)),
            url: item.link || buildOutboundUrl(name, item.title),
            inStock: true,
            deliveryDays: Math.floor(Math.random() * 4) + 1,
          });

          // The primary offer is the real one from SerpApi
          const storeName = item.source || 'Store';
          const realOffer: VendorOffer = {
            vendorName: storeName,
            price: price,
            originalPrice: Math.floor(price * 1.15),
            url: buildOutboundUrl(storeName, item.title || query), 
            inStock: true,
            deliveryDays: 2,
          };

          const offers = [
            realOffer,
            generateCompetitor('Amazon', 1.05),
            generateCompetitor('Flipkart', 1.08),
          ].sort((a, b) => a.price - b.price);

          const lowestPrice = offers[0].price;

          const prod = {
            id: `real-${index}-${item.product_id || item.id || Date.now()}`,
            name: item.title || query,
            category: 'Search Result',
            image: item.thumbnail || `https://picsum.photos/seed/${index}/400/400`,
            description: item.snippet || `Real-time search result for ${query}`,
            offers: offers,
            lowestPrice: lowestPrice,
            greedyScore: 0,
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prod.greedyScore = computeGreedyScore(prod as any);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return prod as any;
        });

        return NextResponse.json(realProducts);
      }
    } catch (error) {
      console.error("Failed to fetch from SerpApi:", error);
      // Fall through to mock data on error
    }
  }

  // --- FALLBACK MOCK DATA (If no API key is present) ---
  const basePrice = (hashString(query) % 50000) + 500;
  
  const generateOffer = (vendor: VendorName, base: number, isWinner: boolean): VendorOffer => {
    const priceModifier = isWinner ? 0.8 : (1 + (Math.random() * 0.2)); 
    const price = Math.floor(base * priceModifier);
    return {
      vendorName: vendor,
      price: price,
      originalPrice: Math.floor(price * (1.2 + Math.random() * 0.3)),
      url: buildOutboundUrl(vendor, query), 
      inStock: Math.random() > 0.1,
      deliveryDays: Math.floor(Math.random() * 5) + 1,
    };
  };

  const isFashion = query.toLowerCase().includes('shirt') || query.toLowerCase().includes('shoe') || query.toLowerCase().includes('clothing') || query.toLowerCase().includes('apparel') || query.toLowerCase().includes('dress');
  const isHome = query.toLowerCase().includes('appliance') || query.toLowerCase().includes('kitchen') || query.toLowerCase().includes('home') || query.toLowerCase().includes('furniture');
  const vendors: VendorName[] = isFashion
    ? ['Myntra', 'Amazon', 'Flipkart', 'TataCliq']
    : isHome ? ['Amazon', 'Flipkart', 'JioMart'] : ['Amazon', 'Flipkart', 'JioMart'];


  const winnerIndex = hashString(query) % vendors.length;
  const offers = vendors.map((v, i) => generateOffer(v, basePrice, i === winnerIndex));
  const inStockOffers = offers.filter(o => o.inStock);
  const lowestPrice = inStockOffers.length > 0 ? Math.min(...inStockOffers.map(o => o.price)) : Math.min(...offers.map(o => o.price));

  const mockProduct: Product = {
    id: `prod-${hashString(query)}`,
    name: `${query.charAt(0).toUpperCase() + query.slice(1)} - Best Options`,
    category: isFashion ? 'Fashion' : isHome ? 'Home Appliances' : 'General',
    image: `https://picsum.photos/seed/${hashString(query)}/400/400`,
    description: `Compare prices across Indian platforms for ${query}. We found the best deals!`,
    offers: offers.sort((a, b) => a.price - b.price),
    lowestPrice,
    greedyScore: 0,
  };
  mockProduct.greedyScore = computeGreedyScore(mockProduct);

  return NextResponse.json([mockProduct, {
      ...mockProduct,
      id: `prod-${hashString(query)}-2`,
      name: `${query.charAt(0).toUpperCase() + query.slice(1)} (Alternative)`,
      lowestPrice: lowestPrice + 200,
      image: `https://picsum.photos/seed/${hashString(query) + 1}/400/400`,
  }]);
}
