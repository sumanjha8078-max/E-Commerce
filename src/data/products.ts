import { Product } from '@/types';

export const products: Product[] = [
  { 
    id: "1", name: "Apple iPhone 15 Pro Max (256GB)", lowestPrice: 148900, greedyScore: 9.8, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop", category: "Mobiles", 
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip.",
    offers: [
      { vendorName: 'Amazon', price: 148900, originalPrice: 159900, url: 'https://amazon.in', inStock: true, deliveryDays: 1 },
      { vendorName: 'Flipkart', price: 149900, originalPrice: 159900, url: 'https://flipkart.com', inStock: true, deliveryDays: 2 },
      { vendorName: 'TataCliq', price: 151900, originalPrice: 159900, url: 'https://tatacliq.com', inStock: true, deliveryDays: 4 },
    ]
  },
  { 
    id: "2", name: "Sony WH-1000XM5 Noise Cancelling", lowestPrice: 25990, greedyScore: 9.5, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop", category: "Audio", 
    description: "Industry leading noise cancellation with two processors and 8 microphones.",
    offers: [
      { vendorName: 'Flipkart', price: 25990, originalPrice: 34990, url: 'https://flipkart.com', inStock: true, deliveryDays: 2 },
      { vendorName: 'Amazon', price: 26990, originalPrice: 34990, url: 'https://amazon.in', inStock: true, deliveryDays: 1 },
      { vendorName: 'JioMart', price: 28990, originalPrice: 34990, url: 'https://jiomart.com', inStock: false, deliveryDays: 0 },
    ]
  },
  { 
    id: "3", name: "Nike Air Jordan 1 Mid", lowestPrice: 11495, greedyScore: 8.7, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop", category: "Fashion", 
    description: "Inspired by the original AJ1, offering fans a glimpse of Jordan's journey.",
    offers: [
      { vendorName: 'Myntra', price: 11495, originalPrice: 12995, url: 'https://myntra.com', inStock: true, deliveryDays: 3 },
      { vendorName: 'Flipkart', price: 11995, originalPrice: 12995, url: 'https://flipkart.com', inStock: true, deliveryDays: 4 },
      { vendorName: 'TataCliq', price: 12995, originalPrice: 12995, url: 'https://tatacliq.com', inStock: true, deliveryDays: 2 },
    ]
  },
  { 
    id: "4", name: "Samsung Odyssey G9 49\" Curved", lowestPrice: 124999, greedyScore: 9.1, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop", category: "Electronics", 
    description: "Dual QHD curved gaming monitor with 240Hz refresh rate.",
    offers: [
      { vendorName: 'Amazon', price: 124999, originalPrice: 150000, url: 'https://amazon.in', inStock: true, deliveryDays: 5 },
      { vendorName: 'Flipkart', price: 130000, originalPrice: 150000, url: 'https://flipkart.com', inStock: true, deliveryDays: 7 },
    ]
  },
  { 
    id: "5", name: "PlayStation 5 Console", lowestPrice: 44990, greedyScore: 9.9, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop", category: "Gaming", 
    description: "Lightning fast loading with an ultra-high speed SSD.",
    offers: [
      { vendorName: 'Flipkart', price: 44990, originalPrice: 54990, url: 'https://flipkart.com', inStock: true, deliveryDays: 2 },
      { vendorName: 'Amazon', price: 44990, originalPrice: 54990, url: 'https://amazon.in', inStock: false, deliveryDays: 0 },
      { vendorName: 'JioMart', price: 49990, originalPrice: 54990, url: 'https://jiomart.com', inStock: true, deliveryDays: 3 },
    ]
  },
  { 
    id: "6", name: "Dyson Airwrap Multi-styler", lowestPrice: 49900, greedyScore: 8.5, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop", category: "Beauty", 
    description: "Dry, curl, shape and hide flyaways with the Coanda effect.",
    offers: [
      { vendorName: 'Amazon', price: 49900, originalPrice: 55900, url: 'https://amazon.in', inStock: true, deliveryDays: 2 },
      { vendorName: 'Myntra', price: 51900, originalPrice: 55900, url: 'https://myntra.com', inStock: true, deliveryDays: 3 },
    ]
  },
  { 
    id: "7", name: "LG 1.5 Ton 5 Star AI Dual Inverter AC", lowestPrice: 46990, greedyScore: 9.0, image: "https://images.unsplash.com/photo-1623512918881-2292f7a93cb3?q=80&w=800&auto=format&fit=crop", category: "Home Appliances", 
    description: "Super convertible 6-in-1 cooling with artificial intelligence.",
    offers: [
      { vendorName: 'Flipkart', price: 46990, originalPrice: 75990, url: 'https://flipkart.com', inStock: true, deliveryDays: 2 },
      { vendorName: 'Amazon', price: 47990, originalPrice: 75990, url: 'https://amazon.in', inStock: true, deliveryDays: 4 },
      { vendorName: 'JioMart', price: 47490, originalPrice: 75990, url: 'https://jiomart.com', inStock: true, deliveryDays: 1 },
    ]
  },
  { 
    id: "8", name: "Puma Men's Running Shoes", lowestPrice: 2199, greedyScore: 7.8, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop", category: "Fashion", 
    description: "Lightweight, breathable mesh upper for maximum comfort.",
    offers: [
      { vendorName: 'Myntra', price: 2199, originalPrice: 4999, url: 'https://myntra.com', inStock: true, deliveryDays: 2 },
      { vendorName: 'Amazon', price: 2499, originalPrice: 4999, url: 'https://amazon.in', inStock: true, deliveryDays: 3 },
      { vendorName: 'Flipkart', price: 2399, originalPrice: 4999, url: 'https://flipkart.com', inStock: true, deliveryDays: 5 },
    ]
  },
  { 
    id: "9", name: "MacBook Air M2 (8GB, 256GB)", lowestPrice: 99900, greedyScore: 9.6, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop", category: "Laptops", 
    description: "Supercharged by M2 chip. Incredibly thin and light.",
    offers: [
      { vendorName: 'Amazon', price: 99900, originalPrice: 114900, url: 'https://amazon.in', inStock: true, deliveryDays: 1 },
      { vendorName: 'TataCliq', price: 101900, originalPrice: 114900, url: 'https://tatacliq.com', inStock: true, deliveryDays: 2 },
      { vendorName: 'Flipkart', price: 104900, originalPrice: 114900, url: 'https://flipkart.com', inStock: true, deliveryDays: 3 },
    ]
  },
  { 
    id: "10", name: "Samsung Galaxy S24 Ultra", lowestPrice: 129999, greedyScore: 8.9, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop", category: "Mobiles", 
    description: "Galaxy AI is here. Welcome to the era of mobile AI.",
    offers: [
      { vendorName: 'Flipkart', price: 129999, originalPrice: 134999, url: 'https://flipkart.com', inStock: true, deliveryDays: 1 },
      { vendorName: 'Amazon', price: 129999, originalPrice: 134999, url: 'https://amazon.in', inStock: true, deliveryDays: 2 },
      { vendorName: 'JioMart', price: 132999, originalPrice: 134999, url: 'https://jiomart.com', inStock: true, deliveryDays: 1 },
    ]
  },
  { 
    id: "11", name: "Himalaya Purifying Neem Face Wash", lowestPrice: 195, greedyScore: 7.2, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop", category: "Beauty", 
    description: "Clinically proven to clear pimples and prevent marks.",
    offers: [
      { vendorName: 'JioMart', price: 195, originalPrice: 250, url: 'https://jiomart.com', inStock: true, deliveryDays: 1 },
      { vendorName: 'Amazon', price: 210, originalPrice: 250, url: 'https://amazon.in', inStock: true, deliveryDays: 1 },
      { vendorName: 'Flipkart', price: 225, originalPrice: 250, url: 'https://flipkart.com', inStock: true, deliveryDays: 2 },
    ]
  },
  { 
    id: "12", name: "Levi's Men's 511 Slim Fit Jeans", lowestPrice: 1499, greedyScore: 8.3, image: "https://images.unsplash.com/photo-1542272604-780c8d52f6c0?q=80&w=800&auto=format&fit=crop", category: "Fashion", 
    description: "A modern slim with room to move. Added stretch for all-day comfort.",
    offers: [
      { vendorName: 'Myntra', price: 1499, originalPrice: 3299, url: 'https://myntra.com', inStock: true, deliveryDays: 2 },
      { vendorName: 'TataCliq', price: 1699, originalPrice: 3299, url: 'https://tatacliq.com', inStock: true, deliveryDays: 3 },
      { vendorName: 'Amazon', price: 1799, originalPrice: 3299, url: 'https://amazon.in', inStock: true, deliveryDays: 4 },
    ]
  },
  { 
    id: "13", name: "Philips Air Fryer HD9200", lowestPrice: 6499, greedyScore: 8.8, image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=800&auto=format&fit=crop", category: "Home Appliances", 
    description: "Rapid Air technology, 90% less fat. Fry, bake, grill, roast.",
    offers: [
      { vendorName: 'Amazon', price: 6499, originalPrice: 9995, url: 'https://amazon.in', inStock: true, deliveryDays: 2 },
      { vendorName: 'Flipkart', price: 6999, originalPrice: 9995, url: 'https://flipkart.com', inStock: true, deliveryDays: 3 },
    ]
  },
  { 
    id: "14", name: "ASUS ROG Strix G15 Gaming Laptop", lowestPrice: 85990, greedyScore: 9.3, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop", category: "Laptops", 
    description: "Ryzen 7 6800H, RTX 3050. Built for serious gaming.",
    offers: [
      { vendorName: 'Flipkart', price: 85990, originalPrice: 110990, url: 'https://flipkart.com', inStock: true, deliveryDays: 2 },
      { vendorName: 'Amazon', price: 87990, originalPrice: 110990, url: 'https://amazon.in', inStock: true, deliveryDays: 3 },
      { vendorName: 'TataCliq', price: 89990, originalPrice: 110990, url: 'https://tatacliq.com', inStock: false, deliveryDays: 0 },
    ]
  },
];
