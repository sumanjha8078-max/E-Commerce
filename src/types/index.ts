export type VendorName = 'Amazon' | 'Flipkart' | 'Myntra' | 'JioMart' | 'TataCliq';

export interface VendorOffer {
  vendorName: VendorName;
  price: number;
  originalPrice: number;
  url: string;
  inStock: boolean;
  deliveryDays: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  offers: VendorOffer[];
  lowestPrice: number;
  greedyScore: number; // Out of 10, based on price drop & vendor reliability
}
