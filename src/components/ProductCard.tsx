"use client";
import { formatCurrency } from "../utils/formatCurrency";


import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { useStore } from "../store/useStore";
import { products } from "../data/products";
import { Product } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import PriceTag from "../components/PriceTag";
import { computeBestDiscount } from "../lib/score";
import toast from "react-hot-toast";



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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const effectiveQuery = hideSearch ? defaultQuery : (searchQuery || defaultQuery);
  const debouncedQuery = useDebounce(effectiveQuery, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (data && data.length > 0) {
          let processedData = data;
          if (effectiveQuery.toLowerCase().includes('trending')) {
            // Sort by discount descending and filter out items with < 10% discount
            processedData = data
              .filter((p: Product) => {
                const { maxDiscountPct } = computeBestDiscount(p);
                return maxDiscountPct >= 10;
              })
              .sort((a: Product, b: Product) => {
                const aDesc = computeBestDiscount(a).maxDiscountPct;
                const bDesc = computeBestDiscount(b).maxDiscountPct;
                return bDesc - aDesc;
              });
          }
          setLiveProducts(processedData);
        } else {
          setLiveProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Network connection lost. Please try again.");
      } finally {
        setLoading(false);
      }
    
    };
    fetchProducts();
  }, [debouncedQuery, effectiveQuery]);

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

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/30">
          <span className="text-6xl mb-4">⚠️</span>
          <p className="text-xl font-medium text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full text-sm font-bold hover:bg-red-200 dark:hover:bg-red-900/80 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm animate-pulse">
              <div className="h-[220px] w-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="mt-4 flex justify-between items-end">
                  <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : liveProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center text-gray-500 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
          <svg className="w-32 h-32 mb-6 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14h.01M14 10h.01M10 10h.01M14 14h.01" />
          </svg>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No deals found for &quot;{searchQuery}&quot;</h3>
          <p className="text-gray-400 max-w-md">We couldn&apos;t find any live price drops for this query right now. Try searching for a broader category or check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {liveProducts.map((item, index) => {
            const isTracked = mounted ? watchlist.some(w => w.id === item.id) : false;
             // Already sorted by lowest price
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                className="group cursor-pointer flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#ff2d3d]/50"
                onClick={() => setQuickViewProduct(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setQuickViewProduct(item);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {/* Image Section */}
                <div className="relative h-[220px] w-full bg-[#f8f9fa] dark:bg-gray-900/50 flex items-center justify-center p-6">
                  {/* GreedyScore Badge */}
                  

                   {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 mb-1 leading-tight group-hover:text-[#ff2d3d] transition-colors">
    {item.name}
  </h3>
  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">
    {item.category} • {item.offers.length} Stores
  </span>
                  
                  <div className="mt-auto">
                    
  <PriceTag product={item} />
  
  <div className="flex items-center gap-2 mt-2 mb-4">
      <div className={`text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm flex items-center gap-1 ${item.greedyScore >= 9 ? 'bg-emerald-100 text-emerald-800' : item.greedyScore >= 8 ? 'bg-lime-100 text-lime-800' : item.greedyScore >= 7 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
        GreedyScore: {item.greedyScore.toFixed(1)}
      </div>
      <span className="text-[10px] text-gray-500">
        {item.greedyScore >= 9 ? 'Excellent deal' : item.greedyScore >= 8 ? 'Great deal' : item.greedyScore >= 7 ? 'Good deal' : 'Fair deal'}
      </span>
  </div>
  
  <div className="flex flex-col gap-2 mt-4">
    {item.offers.slice(0, 3).map((offer, idx) => (
      <div key={idx} className={`flex items-center justify-between text-[10px] px-2 py-1 rounded-md ${idx === 0 ? 'bg-red-50 text-red-700 font-bold border border-red-100' : 'bg-gray-50 text-gray-600'}`}>
        <span>{offer.vendorName}</span>
        <span>{formatCurrency(offer.price)}</span>
      </div>
    ))}
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