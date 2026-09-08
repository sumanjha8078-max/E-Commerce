"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaEye, FaShoppingCart } from "react-icons/fa";

const products = [
  { name: "Boat Headphone", price: "$120", image: "/p1.jpg" },
  { name: "Rocky Mountain", price: "$420", image: "/p2.jpg" },
  { name: "Goggles", price: "$320", image: "/p3.jpg" },
  { name: "Printed", price: "$220", image: "/p1.jpg" },
  { name: "Boat Headphone", price: "$120", image: "/p8.jpg" },
  { name: "Rocky Mountain", price: "$420", image: "/p6.jpg" },
  { name: "Goggles", price: "$320", image: "/p7.jpg" },
  { name: "Printed", price: "$220", image: "/p8.jpg" },
];

export default function Products() {
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-black text-black dark:text-white">
          Our Products
        </h2>

        <p className="text-sm text-gray-400 mt-3">Explore Our Products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 max:gap-x-24 gap-y-14">
        {products.map((item, index) => {
          const isLiked = likedItems.includes(index);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="group relative bg-[#f1f1f1] rounded-xl h-[220px] w-full flex items-center justify-center overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={260}
                  height={180}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                />

                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleLike(index, e)}
                  className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-200 group-hover:opacity-100 opacity-0 sm:opacity-100"
                >
                  {isLiked ? (
                    <FaHeart className="text-[#ff2d3d] text-lg transition-transform duration-300 scale-110" />
                  ) : (
                    <FaRegHeart className="text-gray-500 text-lg transition-transform duration-300 hover:text-[#ff2d3d]" />
                  )}
                </button>

                {/* Quick Add / Quick View Hover Area */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 gap-3 bg-black/30 backdrop-blur-[1px]">
                  <button className="bg-[#ff2d3d] text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-black transition-colors duration-300 translate-y-6 group-hover:translate-y-0 shadow-lg">
                    <FaShoppingCart className="text-sm" /> Add to cart
                  </button>
                  
                  <button className="bg-white text-black px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300 translate-y-6 group-hover:translate-y-0 shadow-lg">
                    <FaEye className="text-sm" /> Quick View
                  </button>
                </div>
              </div>

              <h3 className="mt-5 text-lg font-bold text-black dark:text-white transition-colors group-hover:text-[#ff2d3d]">
                {item.name}
              </h3>

              <p className="mt-1 text-lg font-black text-gray-700 dark:text-gray-300">
                {item.price}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}