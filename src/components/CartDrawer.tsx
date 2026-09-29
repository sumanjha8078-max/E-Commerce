"use client";

import { useStore } from "../store/useStore";
import { FaTimes, FaTrash, FaBell, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, watchlist, removeFromWatchlist, setQuickViewProduct } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
          <h2 className="text-2xl font-black flex items-center gap-2">
            Price Watchlist <span className="text-sm bg-[#ff2d3d] text-white px-2 py-0.5 rounded-full">{watchlist.length}</span>
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {watchlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <FaBell className="text-6xl text-gray-200 dark:text-gray-700" />
              <p className="text-xl font-medium text-center">Your watchlist is empty.</p>
              <p className="text-sm text-center max-w-[250px]">Save products here to get notified when their prices drop across any platform.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 mt-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform"
              >
                Find Deals
              </button>
            </div>
          ) : (
            watchlist.map((item) => {
               const topOffer = item.offers[0];
               return (
              <div 
                 key={item.id} 
                 className="flex flex-col gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => {
                    setQuickViewProduct(item);
                    setIsCartOpen(false);
                 }}
              >
                 <div className="flex gap-4 items-start">
                    <div className="h-20 w-20 bg-[#f8f9fa] dark:bg-gray-900 rounded-xl overflow-hidden flex-shrink-0 p-2 border border-gray-100 dark:border-gray-800">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight mb-1">{item.name}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-lg font-black text-[#ff2d3d]">₹{item.lowestPrice.toLocaleString('en-IN')}</span>
                        {topOffer.originalPrice > topOffer.price && (
                           <span className="text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                              ↓ Price Dropped
                           </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">
                         Best price found on <span className="font-bold text-gray-700 dark:text-gray-300">{topOffer.vendorName}</span>
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWatchlist(item.id);
                        toast.error(`Alert removed for ${item.name}`);
                      }}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                 </div>
                 
                 <div className="flex gap-2 mt-2">
                    <a 
                       href={topOffer.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       onClick={(e) => e.stopPropagation()}
                       className="flex-1 py-2 bg-[#ff2d3d] text-white rounded-xl text-xs font-bold flex justify-center items-center gap-2 hover:bg-black transition-colors"
                    >
                       Buy on {topOffer.vendorName} <FaExternalLinkAlt className="text-[10px]"/>
                    </a>
                 </div>
              </div>
            )})
          )}
        </div>

        {watchlist.length > 0 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <button className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-lg">
              <FaBell /> Enable Email Alerts for All
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-4">We will notify you instantly if any of these prices drop by more than 5%.</p>
          </div>
        )}
      </div>
    </>
  );
}
