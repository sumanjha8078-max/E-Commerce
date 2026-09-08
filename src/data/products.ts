export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const products: Product[] = [
  { id: "1", name: "Boat Headphone", price: 120, image: "/p1.jpg", category: "Audio", description: "High-quality wireless headphones with active noise cancellation and a 20-hour battery life. Perfect for music lovers and professionals." },
  { id: "2", name: "Rocky Mountain", price: 420, image: "/p2.jpg", category: "Wearables", description: "Durable and stylish smartwatch built for the outdoors. Features health tracking, GPS, and water resistance up to 50 meters." },
  { id: "3", name: "Goggles", price: 320, image: "/p3.jpg", category: "Accessories", description: "Premium UV protection goggles designed for extreme sports and everyday wear. Sleek and comfortable." },
  { id: "4", name: "Printed", price: 220, image: "/p1.jpg", category: "Accessories", description: "Stylish printed accessories that add a pop of personality to your everyday carry." },
  { id: "5", name: "Boat Earbuds", price: 120, image: "/p8.jpg", category: "Audio", description: "Compact true wireless earbuds delivering deep bass, crystal clear calls, and a secure fit for workouts." },
  { id: "6", name: "Smart Band", price: 420, image: "/p6.jpg", category: "Wearables", description: "Advanced fitness tracker with real-time heart rate monitoring, sleep analysis, and a brilliant OLED display." },
  { id: "7", name: "VR Goggles", price: 320, image: "/p7.jpg", category: "Gaming", description: "Immersive virtual reality headset designed for next-gen gaming and stunning 3D experiences." },
  { id: "8", name: "Printed Case", price: 220, image: "/p8.jpg", category: "Accessories", description: "Durable and aesthetic printed case featuring unique designs to protect your gear in style." },
];
