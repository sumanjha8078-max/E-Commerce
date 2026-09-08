"use client";


import Image from "next/image";
import { motion } from "framer-motion";

const blogs = [
  {
    image: "/blog1.jpg",
    date: "Jan 20, 2024",
    author: "Dilshad",
    title: "How to choose perfect smartwatch",
  },
  {
    image: "/blog2.jpg",
    date: "Jan 20, 2024",
    author: "Satya",
    title: "How to choose perfect gadget",
  },
  {
    image: "/blog3.jpg",
    date: "Jan 20, 2024",
    author: "Sabir",
    title: "How to choose perfect VR headset",
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
            >
          {/* <div key={index}> */}
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

            <h3 className="text-lg font-bold text-black dark:text-white mt-3">
              {item.title}
            </h3>

            <p className="text-base text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
              minima facere deserunt vero illo beatae deleniti eius dolores
              consequuntur, eligendi corporis maiores molestiae laudantium.
              Porro?
            </p>
          {/* </div> */}
          </motion.div>
        ))}
      </div>
    </section>
  );
}


