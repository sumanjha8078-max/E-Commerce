import { NextResponse } from 'next/server';
import { Product, VendorName, VendorOffer } from '@/types';

// A simple hash function to generate deterministic mock data based on the query string
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
  
  // Create an intelligent mock response for *any* product searched globally
  const basePrice = (hashString(query) % 50000) + 500; // Random price between ₹500 and ₹50500
  
  const generateOffer = (vendor: VendorName, base: number, isWinner: boolean): VendorOffer => {
    // The winner gets the lowest price
    const priceModifier = isWinner ? 0.8 : (1 + (Math.random() * 0.2)); 
    const price = Math.floor(base * priceModifier);
    const originalPrice = Math.floor(price * (1.2 + Math.random() * 0.3)); // 20-50% markup for original
    
    return {
      vendorName: vendor,
      price: price,
      originalPrice: originalPrice,
      url: `https://example.com/redirect?vendor=${vendor}&q=${encodeURIComponent(query)}`,
      inStock: Math.random() > 0.1, // 90% chance in stock
      deliveryDays: Math.floor(Math.random() * 5) + 1,
    };
  };

  const isFashion = query.toLowerCase().includes('shirt') || query.toLowerCase().includes('shoe');
  
  const vendors: VendorName[] = isFashion 
    ? ['Myntra', 'Amazon', 'Flipkart', 'TataCliq'] 
    : ['Amazon', 'Flipkart', 'JioMart'];

  // Shuffle and pick winner
  const winnerIndex = hashString(query) % vendors.length;

  const offers = vendors.map((v, i) => generateOffer(v, basePrice, i === winnerIndex));
  
  const lowestPrice = Math.min(...offers.map(o => o.price));
  const greedyScore = (Math.random() * 3 + 7).toFixed(1); // Score between 7.0 and 10.0

  const mockProduct: Product = {
    id: `prod-${hashString(query)}`,
    name: `${query.charAt(0).toUpperCase() + query.slice(1)} - Best Options`,
    category: isFashion ? 'Fashion' : 'General',
    image: `https://picsum.photos/seed/${hashString(query)}/400/400`,
    description: `Compare prices across Indian platforms for ${query}. We found the best deals!`,
    offers: offers.sort((a, b) => a.price - b.price), // Sort by lowest price first
    lowestPrice,
    greedyScore: parseFloat(greedyScore),
  };

  // We return an array to simulate search results (could generate multiple variations if needed)
  return NextResponse.json([mockProduct, {
      ...mockProduct,
      id: `prod-${hashString(query)}-2`,
      name: `${query.charAt(0).toUpperCase() + query.slice(1)} (Alternative)`,
      lowestPrice: lowestPrice + 200,
      image: `https://picsum.photos/seed/${hashString(query)+1}/400/400`,
  }]);
}
