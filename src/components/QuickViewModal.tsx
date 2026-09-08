"use client";

import { useStore } from "../store/useStore";
import { FaTimes, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useStore();

  if (!quickViewProduct) return null;

  const isLiked = wishlist.includes(quickViewProduct.id);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4 animate-in fade-in duration-300"
        onClick={() => setQuickViewProduct(null)}
      >
        {/* Modal */}
        <div
          className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-gray-500 hover:text-red-500 hover:bg-red-100 transition-all shadow-sm"
          >
            <FaTimes />
          </button>

          {/* Left Image Section */}
          <div className="w-full md:w-1/2 bg-[#f1f1f1] dark:bg-gray-800 p-8 flex items-center justify-center relative min-h-[300px]">
             <button
                onClick={() => {
                  toggleWishlist(quickViewProduct.id);
                  toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist!');
                }}
                className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
              >
                {isLiked ? (
                  <FaHeart className="text-[#ff2d3d] text-xl transition-transform duration-300 scale-110" />
                ) : (
                  <FaRegHeart className="text-gray-500 text-xl transition-transform duration-300 hover:text-[#ff2d3d]" />
                )}
              </button>
            <Image
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              width={400}
              height={400}
              className="object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
            />
          </div>

          {/* Right Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-sm font-bold text-[#ff2d3d] uppercase tracking-wider mb-2">
              {quickViewProduct.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {quickViewProduct.name}
            </h2>
            <p className="text-2xl font-bold text-gray-500 mt-4 mb-6">
              ${quickViewProduct.price}
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              {quickViewProduct.description}
            </p>

            <div className="space-y-4">
              <button 
                onClick={() => {
                  addToCart(quickViewProduct);
                  toast.success(`${quickViewProduct.name} added to cart!`, { icon: '🛒' });
                  setQuickViewProduct(null); // Auto close after adding
                }}
                className="w-full py-4 bg-[#ff2d3d] hover:bg-black dark:hover:bg-white dark:hover:text-black text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg"
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
