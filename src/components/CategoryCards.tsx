"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useStore } from "../store/useStore";

const cards = [
  {
    small: "Top Fashion",
    title: "Trending on",
    big: "Myntra",
    image: "/earphone.png", // Keeping existing dummy images but changing context
    className: "bg-gradient-to-br from-[#FF3F6C] to-[#C9294F]",
    btn: "bg-white text-[#FF3F6C]",
    span: "lg:col-span-1",
    categoryQuery: "Fashion",
  },
  {
    small: "Electronics Hub",
    title: "Best Prices on",
    big: "Flipkart",
    image: "/time.png",
    className: "bg-gradient-to-br from-[#2874F0] to-[#1C51A8]",
    btn: "bg-white text-[#2874F0]",
    span: "lg:col-span-1",
    categoryQuery: "Electronics",
  },
  {
    small: "Global Gadgets",
    title: "Imported via",
    big: "Amazon",
    image: "/macbook.png",
    className: "bg-gradient-to-br from-[#232F3E] to-black",
    btn: "bg-[#FF9900] text-black font-black",
    span: "lg:col-span-2",
    categoryQuery: "Mobiles",
  },
  {
    small: "Premium Brands",
    title: "Luxury on",
    big: "TataCliq",
    image: "/gaming.png",
    className: "bg-gradient-to-br from-gray-900 to-black border border-gray-800",
    btn: "bg-white text-black",
    span: "lg:col-span-2",
    categoryQuery: "Gaming",
  },
  {
    small: "Daily Needs",
    title: "Groceries by",
    big: "JioMart",
    image: "/vrmen.png",
    className: "bg-gradient-to-br from-[#008CCF] to-[#006A9C]",
    btn: "bg-white text-[#008CCF]",
    span: "lg:col-span-1",
    categoryQuery: "Home Appliances",
  },
  {
    small: "Audio Gear",
    title: "Lowest Prices",
    big: "Aggregated",
    image: "/speaker.png",
    className: "bg-gradient-to-br from-[#ff2d3d] to-[#b01e29]",
    btn: "bg-white text-[#ff2d3d]",
    span: "lg:col-span-1",
    categoryQuery: "Audio",
  },
];

export default function CategoryCards() {
  const { setSearchQuery } = useStore();

  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 overflow-hidden">
      <div className="mb-8">
        <h2 className="text-2xl font-black">Shop by Top Platforms</h2>
        <p className="text-gray-500 text-sm mt-1">We index deals from India's biggest giants</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
            }}
            onClick={() => {
              setSearchQuery(item.categoryQuery);
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`${item.span} ${item.className} group relative h-[280px] md:h-[320px] rounded-3xl overflow-hidden p-6 md:p-8 flex items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer shadow-lg`}
          >
            <div className="relative z-20 w-full">
              <p className="text-white/80 font-semibold text-xs md:text-sm tracking-wider uppercase">
                {item.small}
              </p>

              <h3 className="text-white text-xl md:text-2xl font-bold mt-1">
                {item.title}
              </h3>

              <h2 className="text-4xl md:text-5xl font-black text-white/90 mt-1 md:mt-2">
                {item.big}
              </h2>

              <button
                className={`${item.btn} mt-6 px-6 py-2 md:px-8 md:py-3 rounded-full font-bold z-20 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block text-sm`}
              >
                Find Deals
              </button>
            </div>

            <Image
              src={item.image}
              alt={item.big}
              width={360}
              height={360}
              className="absolute right-[-20px] bottom-[-20px] object-contain max-h-[200px] md:max-h-[300px] w-auto transition-transform duration-500 group-hover:scale-110 opacity-90 mix-blend-luminosity group-hover:mix-blend-normal"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}