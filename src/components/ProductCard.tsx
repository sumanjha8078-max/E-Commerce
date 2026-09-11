"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaEye, FaShoppingCart } from "react-icons/fa";
import { useStore } from "../store/useStore";
import { products } from "../data/products";
import toast from "react-hot-toast";

export default function Products() {
  const { addToCart, wishlist, toggleWishlist, searchQuery, setQuickViewProduct } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter products based on the global search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-20 min-h-[500px]">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-black text-black dark:text-white">
          Our Products
        </h2>

        <p className="text-sm text-gray-400 mt-3">Explore Our Products</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <span className="text-6xl mb-4">🔍</span>
          <p className="text-xl font-medium">No products found for "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-14">
          {filteredProducts.map((item, index) => {
            const isLiked = mounted ? wishlist.includes(item.id) : false;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: (index % 4) * 0.1, // Stagger effect
                }}
                className="group cursor-pointer flex flex-col items-center"
              >
                <div className="group relative bg-[#f1f1f1] dark:bg-gray-800 rounded-xl h-[240px] w-full flex items-center justify-center overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={260}
                    height={200}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item.id);
                      toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist!');
                    }}
                    className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-200 group-hover:opacity-100 opacity-0 sm:opacity-100"
                  >
                    {isLiked ? (
                      <FaHeart className="text-[#ff2d3d] text-lg transition-transform duration-300 scale-110" />
                    ) : (
                      <FaRegHeart className="text-gray-500 text-lg transition-transform duration-300 hover:text-[#ff2d3d]" />
                    )}
                  </button>

                  {/* Quick Add / Quick View Hover Area */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 gap-3 bg-black/40 backdrop-blur-[2px]">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                        toast.success(`${item.name} added to cart!`, { icon: '🛒' });
                      }}
                      className="bg-[#ff2d3d] text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-black transition-colors duration-300 translate-y-6 group-hover:translate-y-0 shadow-lg"
                    >
                      <FaShoppingCart className="text-sm" /> Add to cart
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(item);
                      }}
                      className="bg-white text-black px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300 translate-y-6 group-hover:translate-y-0 shadow-lg"
                    >
                      <FaEye className="text-sm" /> Quick View
                    </button>
                  </div>
                </div>

                <div className="w-full text-center mt-5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-black dark:text-white transition-colors group-hover:text-[#ff2d3d]">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <span className="text-lg font-black text-[#ff2d3d] dark:text-[#ff2d3d]">
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <>
                        <span className="text-sm font-medium text-gray-400 line-through">
                          ${item.originalPrice}
                        </span>
                        <span className="text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                        </span>
                      </>
                    )}
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