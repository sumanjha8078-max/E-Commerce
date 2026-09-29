export const CATEGORIES = [
  "Mobiles",
  "Laptops",
  "Audio",
  "Wearables",
  "Fashion",
  "Home Appliances",
  "Beauty",
  "Gaming",
  "Electronics",
  "General",
  "Search Result",
] as const;

export type Category = typeof CATEGORIES[number];

export function isValidCategory(cat: string): cat is Category {
  return CATEGORIES.includes(cat as Category);
}
