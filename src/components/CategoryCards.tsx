"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const cards = [
  {
    small: "Enjoy",
    title: "With",
    big: "Earphone",
    image: "/earphone.png",
    className: "bg-gradient-to-br from-black/90 to-black/70",
    btn: "bg-[#ff2d3d] text-white",
    span: "lg:col-span-1",
    href: "https://www.amazon.com/s?k=headphones",
  },
  {
    small: "Enjoy",
    title: "With",
    big: "Watch",
    image: "/time.png",
    className: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    btn: "bg-white text-yellow-500",
    span: "lg:col-span-1",
    href: "https://www.amazon.com/s?k=smartwatch",
  },
  {
    small: "Enjoy",
    title: "With",
    big: "Laptop",
    image: "/macbook.png",
    className: "bg-gradient-to-br from-[#ff2d3d] to-[#f72737]",
    btn: "bg-white text-[#ff2d3d]",
    span: "lg:col-span-2",
    href: "https://www.amazon.com/s?k=macbook",
  },
  {
    small: "Enjoy",
    title: "With",
    big: "Gaming",
    image: "/gaming.png",
    className: "bg-gradient-to-br from-gray-400 to-gray-200",
    btn: "bg-[#ff2d3d] text-white",
    span: "lg:col-span-2",
    href: "https://www.amazon.com/s?k=playstation+5",
  },
  {
    small: "Enjoy",
    title: "With",
    big: "Headset",
    image: "/vrmen.png",
    className: "bg-gradient-to-br from-green-400 to-green-500",
    btn: "bg-white text-green-500",
    span: "lg:col-span-1",
    href: "https://www.amazon.com/s?k=vr+headset",
  },
  {
    small: "Enjoy",
    title: "With",
    big: "Gadget",
    image: "/speaker.png",
    className: "bg-gradient-to-br from-blue-500 to-blue-600",
    btn: "bg-white text-blue-500",
    span: "lg:col-span-1",
    href: "https://www.amazon.com/s?k=bluetooth+speaker",
  },
];

export default function CategoryCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
            className={`${item.span} ${item.className} group relative h-[320px] rounded-[24px] overflow-hidden p-8 flex items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer`}
          >
            <div className="relative z-20">
              <p className="text-white/80 font-medium">
                {item.small}
              </p>

              <h3 className="text-white text-2xl font-bold mt-1">
                {item.title}
              </h3>

              <h2 className="text-5xl font-bold text-white/30 mt-2">
                {item.big}
              </h2>

              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${item.btn} mt-5 px-8 py-3 rounded-full font-medium z-20 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block`}
              >
                Browse
              </a>
            </div>

            <Image
              src={item.image}
              alt={item.big}
              width={360}
              height={360}
              className="absolute right-0 bottom-0 object-contain max-h-[300px] w-auto transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}