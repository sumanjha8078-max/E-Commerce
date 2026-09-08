"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SaleBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="relative overflow-visible rounded-[32px] bg-[#ff2d3d] min-h-[340px]">
        
        <div className="grid md:grid-cols-3 w-full items-center">
          
          {/* Left */}
          <motion.div
  initial={{ opacity: 0, x: -80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: false }}
>
          <div className="px-8 md:px-10 py-8 text-white md:text-left">
            <p className="text-lg font-medium">
              30% OFF
            </p>

            <h2 className="text-5xl md:text-7xl font-black uppercase md:mt-2">
              Fine Smile
            </h2>

            <p className="md:mt-3 text-lg">
              10 Jan to 28 Jan
            </p>
          </div>
          </motion.div>

          {/* Center Image */}
<motion.div
  initial={{ opacity: 0, scale: 0.5, y: 100 }}
  whileInView={{ opacity: 1, scale: 1, y: 0 }}
  transition={{
    duration: 0.8,
    type: "spring",
    stiffness: 80,
  }}
  viewport={{
    once: false,
    amount: 0.4,
  }}
  className="relative flex justify-center"
>
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Image
      src="/headphone.png"
      alt="Headphone"
      width={550}
      height={550}
      className="w-70 h-70 md:w-full md:h-full object-contain scale-110 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)] md:-mt-8 md:-mb-8"
    />
  </motion.div>
</motion.div>

          {/* Right */}
          <motion.div
  initial={{ opacity: 0, x: 80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: false }}
>
          <div className="px-8 md:px-10 py-8 text-white md:text-left">
            <p className="text-2xl font-bold">
              Air Solo Bass
            </p>

            <h2 className="text-5xl md:text-6xl font-black md:mt-4 mt-2">
              Winter Sale
            </h2>

            <p className="md:mt-5 mt-2 text-white/90 max-w-md">
              Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Eaque reiciendis
            </p>

            <a 
              href="https://www.amazon.com/s?k=headphones" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="md:mt-8 mt-2 bg-white text-[#ff2d3d] px-8 py-3 rounded-full font-medium hover:scale-105 duration-300 inline-block"
            >
              Shop Now
            </a>
          </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}