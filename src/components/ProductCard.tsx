"use client";


import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-black text-black dark:text-white">
          Our Products
        </h2>

        <p className="text-sm text-gray-400 mt-3">
          Explore Our Products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 max:gap-x-24 gap-y-14">
        {products.map((item, index) => (
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
          {/* <div key={index}> */}
            <div className="group relative bg-[#f1f1f1] rounded-md h-[180px] flex items-center justify-center overflow-hidden">
  <Image
    src={item.image}
    alt={item.name}
    width={260}
    height={180}
    className="h-[180] w-[260] object-cover transition-all duration-500 group-hover:blur-sm"
  />

  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
    <button className="bg-[#ff2d3d] text-white px-8 py-3 rounded-full font-semibold">
      Add to cart
    </button>
  </div>
</div>

            <h3 className="mt-2 text-lg font-bold text-black dark:text-white">
              {item.name}
            </h3>

            <p className="mt-1 text-lg font-black text-black dark:text-white">
              {item.price}
            </p>
          {/* </div> */}
          </motion.div>
        ))}
      </div>
    </section>
  );
}