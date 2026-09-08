"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WatchBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="relative overflow-visible rounded-[28px] bg-[#2ecc71] min-h-[340px]">
        <div className="grid md:grid-cols-3 w-full items-center">
          
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
            className="px-8 md:px-10 py-8 text-white md:text-left"
          >
            <p className="text-lg font-medium">30% OFF</p>

            <h2 className="text-5xl md:text-7xl font-black uppercase md:mt-2 leading-tight">
              Happy Hours
            </h2>

            <p className="md:mt-3 text-lg">14 Jan to 28 Jan</p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 80,
            }}
            viewport={{ once: false, amount: 0.4 }}
            className="relative flex justify-center z-20"
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/smartwatch.png"
                alt="Smart Watch"
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
            className="px-8 md:px-10 py-8 text-white md:text-left"
          >
            <p className="text-2xl font-bold">Smart Solo</p>

            <h2 className="text-5xl md:text-6xl font-black md:mt-4 mt-2">
              Winter Sale
            </h2>

            <p className="md:mt-5 mt-2 text-white/90 max-w-md">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Eaque reiciendis
            </p>

            <a 
              href="https://www.amazon.com/s?k=smartwatch"
              target="_blank"
              rel="noopener noreferrer"
              className="md:mt-8 mt-4 bg-white text-[#2ecc71] px-8 py-3 rounded-full font-medium hover:scale-105 duration-300 inline-block"
            >
              Shop Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}