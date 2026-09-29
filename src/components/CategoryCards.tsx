"use client";

import { useStore } from "../store/useStore";

const categories = [
  { name: "Mobiles", slug: "mobiles", icon: "📱", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { name: "Laptops", slug: "laptops", icon: "💻", bg: "bg-gray-50 dark:bg-gray-800/30" },
  { name: "Audio", slug: "audio", icon: "🎧", bg: "bg-purple-50 dark:bg-purple-900/20" },
  { name: "Wearables", slug: "wearables", icon: "⌚", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  { name: "Fashion", slug: "fashion", icon: "👕", bg: "bg-pink-50 dark:bg-pink-900/20" },
  { name: "Home Appliances", slug: "appliances", icon: "🏠", bg: "bg-orange-50 dark:bg-orange-900/20" },
  { name: "Beauty", slug: "beauty", icon: "💄", bg: "bg-rose-50 dark:bg-rose-900/20" },
  { name: "Gaming", slug: "gaming", icon: "🎮", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
];

const vendors = [
  { name: "Amazon", logo: "A", color: "bg-[#232F3E] text-white" },
  { name: "Flipkart", logo: "F", color: "bg-[#2874F0] text-[#FFE11B]" },
  { name: "Myntra", logo: "M", color: "bg-[#FF3F6C] text-white" },
  { name: "JioMart", logo: "J", color: "bg-[#008CCF] text-white" },
  { name: "TataCliq", logo: "T", color: "bg-black text-white" },
];

export default function CategoryCards() {
  const { setSearchQuery } = useStore();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const el = document.getElementById('products');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 overflow-hidden">
      
      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-2xl font-black">Shop by Category</h2>
        <p className="text-gray-500 text-sm mt-1">Find the best deals across all departments</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-16">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => handleSearch(cat.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSearch(cat.name);
              }
            }}
            role="button"
            tabIndex={0}
            className={`${cat.bg} rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2d3d]`}
            aria-label={`Search for ${cat.name}`}
          >
            <span className="text-4xl">{cat.icon}</span>
            <span className="font-semibold text-sm text-center">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Stores */}
      <div className="mb-6">
        <h2 className="text-2xl font-black">Compare across stores</h2>
        <p className="text-gray-500 text-sm mt-1">We index deals from India&apos;s biggest giants</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {vendors.map((vendor) => (
          <div
            key={vendor.name}
            onClick={() => handleSearch(vendor.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSearch(vendor.name);
              }
            }}
            role="button"
            tabIndex={0}
            className={`${vendor.color} flex-1 min-w-[150px] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-gray-400`}
            aria-label={`Search deals on ${vendor.name}`}
          >
            <span className="text-2xl font-black tracking-tight">{vendor.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
