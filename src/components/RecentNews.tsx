"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const blogs = [
  {
    image: "/blog-iphone.jpg",
    date: "Sep 22, 2023",
    author: "The Verge",
    title: "iPhone 15 Pro Review",
    summary: "Apple's latest flagship phone features a new lighter titanium design and upgraded cameras, making a strong case for the Pro models.",
    url: "https://www.theverge.com/23877190/apple-iphone-15-pro-max-review"
  },
  {
    image: "/blog-vision.jpg",
    date: "Jan 30, 2024",
    author: "The Verge",
    title: "Apple Vision Pro Review",
    summary: "The Vision Pro offers moments of technological magic with impressive displays, but it's fundamentally a VR headset masquerading as AR.",
    url: "https://www.theverge.com/24054862/apple-vision-pro-review-vr-ar-headset-features-price"
  },
  {
    image: "/blog-macbook.jpg",
    date: "Nov 6, 2023",
    author: "The Verge",
    title: "MacBook Pro M3 Max",
    summary: "The M3 series chips bring exceptional power for demanding professional workflows, retaining the well-regarded design.",
    url: "https://www.theverge.com/23951655/apple-macbook-pro-m3-max-review"
  },
];

export default function RecentNews() {
  return (
    <section id="news" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-black dark:text-white">
          Recent News
        </h2>

        <p className="text-sm text-gray-400 mt-3">
          Explore Our Blogs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              className="group cursor-pointer flex flex-col items-left"
              onClick={() => window.open(item.url, '_blank')}
            >
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={260}
                className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"
              />
            </div>

            <p className="text-sm text-gray-500 mt-3">
              {item.date} by {item.author}
            </p>

            <h3 className="text-lg font-bold text-black dark:text-white mt-3 group-hover:text-red-500 transition-colors">
              {item.title}
            </h3>

            <p className="text-base text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
              {item.summary}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
