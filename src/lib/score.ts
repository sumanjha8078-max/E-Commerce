import { Product, VendorOffer } from '@/types';

/**
 * Computes the maximum discount percentage among all offers for a product.
 * Returns { maxDiscountPct, savings, bestOffer }
 */
export function computeBestDiscount(product: Product) {
  let maxDiscountPct = 0;
  let savings = 0;
  let bestOffer: VendorOffer | null = null;

  if (!product.offers || product.offers.length === 0) {
    return { maxDiscountPct, savings, bestOffer };
  }

  for (const offer of product.offers) {
    if (offer.originalPrice > offer.price) {
      const diff = offer.originalPrice - offer.price;
      const pct = Math.round((diff / offer.originalPrice) * 100);
      if (pct > maxDiscountPct) {
        maxDiscountPct = pct;
        savings = diff;
        bestOffer = offer;
      }
    }
  }

  return { maxDiscountPct, savings, bestOffer };
}

/**
 * Deterministically computes the GreedyScore (0 to 10) for a product.
 * Formula: heavily weighted towards discount percentage.
 */
export function computeGreedyScore(product: Product): number {
  const { maxDiscountPct } = computeBestDiscount(product);
  
  // Base score is 5.0 just for existing.
  let score = 5.0;
  
  // Add up to 5.0 based on discount percentage (50% discount = max score)
  const discountScore = Math.min((maxDiscountPct / 50) * 5.0, 5.0);
  score += discountScore;
  
  // Ensure we return exactly one decimal place
  return Math.round(score * 10) / 10;
}
