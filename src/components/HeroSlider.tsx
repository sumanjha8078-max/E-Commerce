"use client";

import Image from "next/image";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useState } from "react";

import { useStore } from "../store/useStore";

import { products } from "../data/products";

import toast from "react-hot-toast";

const slides = [
  {
    small: "Massive Price Drop",
    product: products.find(p => p.id === "2") || products[0], // Sony WH-1000XM5
    big: "HEADPHONES",
    image: "/headphone.png",
    btnText: "View Offers",
    action: "view",
  },
  {
    small: "Deal of the Day",
    product: products.find(p => p.id === "5") || products[1], // PS5
    big: "GAMING",
    image: "/ps5.png", // Fixed from /vrmen.png
    btnText: "Compare Prices",
    action: "view",
  },
  {
    small: "Top Selling",
    product: products.find(p => p.id === "9") || products[2], // MacBook
    big: "LAPTOPS",
    image: "/macbook.png",
    btnText: "Add to Watchlist",
    action: "track",
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { setQuickViewProduct, toggleWatchlist, watchlist } = useStore();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    afterChange: (current: number) => setActiveSlide(current),
  };

  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-8 pt-6">
      <div className="rounded-[24px] overflow-hidden bg-gradient-to-r from-[#d9dde2] to-[#f5f5f5] dark:from-gray-900 dark:to-gray-800 min-h-[500px] md:min-h-[550px] flex items-center">
        <Slider {...settings} className="w-full">
          {slides.map((item, index) => {
            const isActive = index === activeSlide;

            return (
              <div key={index}>
                <div className="relative grid grid-cols-1 md:grid-cols-2 items-center min-h-[550px] md:px-14">
                  
                  <motion.div
                    initial={false}
                    animate={
                      isActive
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -60 }
                    }
                    transition={{ duration: 0.7 }}
                    className="relative z-20 order-2 md:order-1 text-center md:text-left pb-10 md:pb-0"
                  >
                    <motion.p
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 25 }
                      }
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="text-[20px] md:text-[24px] font-bold text-[#ff2d3d] uppercase tracking-wider"
                    >
                      {item.small}
                    </motion.p>

                    <motion.p
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 35 }
                      }
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-[40px] md:text-[70px] font-black leading-tight mt-2 md:mt-4 text-black dark:text-white"
                    >
                      {item.product.name}
                    </motion.p>

                    <motion.p
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.85 }
                      }
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-[50px] sm:text-[65px] md:text-[110px] lg:text-[130px] font-bold leading-none text-black/5 dark:text-white/5 uppercase mt-2 md:mt-4 absolute -z-10 top-0 left-0"
                    >
                      {item.big}
                    </motion.p>

                    <motion.button
                      onClick={() => {
                         if (item.action === 'view') {
                            setQuickViewProduct(item.product);
                         } else if (item.action === 'track') {
                            toggleWatchlist(item.product);
                            const isTracked = watchlist.some(w => w.id === item.product.id);
                            if (!isTracked) {
                               toast.success(item.product.name + " added to tracking alerts!");
                            } else {
                               toast.success(item.product.name + " removed from tracking alerts.");
                            }
                         }
                      }}
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 30 }
                      }
                      transition={{ delay: 0.4, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 md:mt-8 bg-black dark:bg-white text-white dark:text-black px-8 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-xl inline-block cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#ff2d3d]/50"
                      aria-label={`${item.btnText} for ${item.product.name}`}
                    >
                      {item.btnText}
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={false}
                    animate={
                      isActive
                        ? { opacity: 1, x: 0, scale: 1 }
                        : { opacity: 0, x: 80, scale: 0.9 }
                    }
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-30 order-1 md:order-2 flex justify-center md:justify-end mt-10 md:mt-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.big}
                      width={500}
                      height={500}
                      priority
                      className="object-contain drop-shadow-2xl w-[260px] sm:w-[320px] md:w-auto max-h-[280px] md:max-h-[420px]"
                    />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
