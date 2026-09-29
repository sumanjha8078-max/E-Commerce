"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaEye, FaFire } from "react-icons/fa";
import { useStore } from "../store/useStore";
import { products } from "../data/products";
import toast from "react-hot-toast";

const getVendorColors = (vendorName: string) => {
  switch(vendorName) {
    case 'Amazon': return 'bg-[#232F3E] text-white';
    case 'Flipkart': return 'bg-[#2874F0] text-[#FFE11B]';
    case 'Myntra': return 'bg-[#FF3F6C] text-white';
    case 'JioMart': return 'bg-[#008CCF] text-white';
    case 'TataCliq': return 'bg-black text-white';
    default: return 'bg-gray-800 text-white';
  }
};

export default function ProductCard({ 
  title = "Trending Price Drops", 
  defaultQuery = "trending",
  hideSearch = false 
}: { 
  title?: React.ReactNode, 
  defaultQuery?: string,
  hideSearch?: boolean 
} = {}) {
  const { toggleWatchlist, watchlist, searchQuery, setQuickViewProduct } = useStore();
  const [mounted, setMounted] = useState(false);

  const [liveProducts, setLiveProducts] = useState(products);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveQuery = hideSearch ? defaultQuery : (searchQuery || defaultQuery);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(effectiveQuery)}`);
        const data = await res.json();
        if (data && data.length > 0) {
          setLiveProducts(data);
        } else {
          setLiveProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce the search slightly
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [effectiveQuery]);

  // If hideSearch is true, don't show the section if it's empty during a search
  if (hideSearch && searchQuery) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 min-h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-black dark:text-white flex items-center gap-3">
            {title}
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-50 dark:bg-gray-800/30 rounded-3xl">
          <div className="w-12 h-12 border-4 border-[#ff2d3d] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-medium">Hunting down the best deals...</p>
        </div>
      ) : liveProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-50 dark:bg-gray-800/30 rounded-3xl">
          <span className="text-6xl mb-4">🔍</span>
          <p className="text-xl font-medium">No deals found for "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {liveProducts.map((item, index) => {
            const isTracked = mounted ? watchlist.some(w => w.id === item.id) : false;
            const topOffer = item.offers[0]; // Already sorted by lowest price
            const vendorColors = getVendorColors(topOffer.vendorName);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                className="group cursor-pointer flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300"
                onClick={() => setQuickViewProduct(item)}
              >
                {/* Image Section */}
                <div className="relative h-[220px] w-full bg-[#f8f9fa] dark:bg-gray-900/50 flex items-center justify-center p-6">
                  {/* GreedyScore Badge */}
                  <div className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    Score: <span className="text-[#00ff88]">{item.greedyScore}</span>
                  </div>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[200px] h-[200px] object-contain transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Watchlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(item);
                      toast.success(isTracked ? 'Removed from Watchlist' : 'Deal Alert Set!');
                    }}
                    className="absolute top-3 right-3 z-20 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition-all cursor-pointer"
                  >
                    {isTracked ? (
                      <FaHeart className="text-[#ff2d3d] text-sm" />
                    ) : (
                      <FaRegHeart className="text-gray-400 hover:text-[#ff2d3d] text-sm" />
                    )}
                  </button>
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <FaEye /> Compare Prices
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                    {item.category} • {item.offers.length} Stores
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 mb-3 leading-tight group-hover:text-[#ff2d3d] transition-colors">
                    {item.name}
                  </h3>
                  
                  <div className="mt-auto">
                    <p className="text-[11px] text-gray-500 mb-1">Lowest price found on:</p>
                    <div className="flex items-center justify-between">
                       <div className="flex flex-col">
                          <span className="text-xl font-black text-[#ff2d3d]">
                            ₹{item.lowestPrice.toLocaleString('en-IN')}
                          </span>
                          {topOffer.originalPrice > topOffer.price && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{topOffer.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                       </div>
                       
                       <div className="text-right">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm ${vendorColors}`}>
                            {topOffer.vendorName}
                          </span>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}