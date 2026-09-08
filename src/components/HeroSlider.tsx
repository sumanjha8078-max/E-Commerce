"use client";

import Image from "next/image";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useState } from "react";

const slides = [
  {
    small: "Beats Solo",
    title: "Wireless",
    big: "HEADPHONE",
    image: "/headphone.png",
    href: "https://www.amazon.com/s?k=headphones",
  },
  {
    small: "Beats Solo",
    title: "Wireless",
    big: "VIRTUAL",
    image: "/vrmen.png",
    href: "https://www.amazon.com/s?k=vr+headset",
  },
  {
    small: "Beats Solo",
    title: "Branded",
    big: "LAPTOPS",
    image: "/macbook.png",
    href: "https://www.amazon.com/s?k=macbook",
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    afterChange: (current: number) => setActiveSlide(current),
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-6">
      <div className="rounded-[24px] overflow-hidden bg-gradient-to-r from-[#d9dde2] to-[#f5f5f5] dark:from-gray-900 dark:to-gray-800 min-h-[600px] md:min-h-[650px] flex items-center">
        <Slider {...settings} className="w-full">
          {slides.map((item, index) => {
            const isActive = index === activeSlide;

            return (
              <div key={index}>
                <div className="relative grid grid-cols-1 md:grid-cols-2 items-center min-h-[650px] md:px-14">
                  
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
                    <motion.h3
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 25 }
                      }
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="text-[22px] md:text-[26px] font-bold text-black dark:text-white"
                    >
                      {item.small}
                    </motion.h3>

                    <motion.h1
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 35 }
                      }
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-[48px] md:text-[82px] font-bold leading-none mt-4 md:mt-6 text-black dark:text-white"
                    >
                      {item.title}
                    </motion.h1>

                    <motion.h2
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.85 }
                      }
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-[58px] sm:text-[75px] md:text-[130px] lg:text-[145px] font-bold leading-none text-white dark:text-white/5 uppercase mt-4 md:mt-6"
                    >
                      {item.big}
                    </motion.h2>

                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 30 }
                      }
                      transition={{ delay: 0.4, duration: 0.5 }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 md:mt-8 bg-[#ff2d3d] text-white px-8 md:px-9 py-2 md:py-3 rounded-full font-semibold inline-block"
                    >
                      Shop By Category
                    </motion.a>
                  </motion.div>

                  <motion.div
                    initial={false}
                    animate={
                      isActive
                        ? { opacity: 1, x: 0, rotate: 0 }
                        : { opacity: 0, x: 80, rotate: 8 }
                    }
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-30 order-1 md:order-2 flex justify-center md:justify-end"
                  >
                    <Image
                      src={item.image}
                      alt={item.big}
                      width={560}
                      height={560}
                      priority
                      className="object-contain drop-shadow-2xl w-[300px] sm:w-[340px] md:w-auto max-h-[300px] md:max-h-[470px]"
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


