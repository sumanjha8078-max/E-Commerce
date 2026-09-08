"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPaperPlane, FaCheck, FaShoppingCart } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="bg-[#f3f4f6] dark:bg-gray-900 py-20 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo */}
          <motion.div variants={childVariants} className="lg:col-span-1">
            <h2 className="text-2xl md:text-4xl font-black text-[#ff2d3d] flex items-center gap-2">
              <FaShoppingCart />
              GreedyCart
            </h2>

            <p className="mt-5 text-gray-600 dark:text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
              alias cum
            </p>

            <p className="mt-6 text-gray-500">
              Made with 💖 by The Coding Journey
            </p>
          </motion.div>

          {/* Important Links */}
          <motion.div variants={childVariants}>
            <h3 className="text-[20px] md:text-2xl font-bold mb-6 text-black dark:text-white">
              Important Links
            </h3>

            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
              <Link
                href="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#ff2d3d] transition-colors"
              >
                Home
              </Link>
              <Link href="/about" className="hover:text-[#ff2d3d] transition-colors">About</Link>
              <Link href="/contact" className="hover:text-[#ff2d3d] transition-colors">Contact</Link>
              <Link href="/blog" className="hover:text-[#ff2d3d] transition-colors">Blog</Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={childVariants}>
            <h3 className="text-[20px] md:text-2xl font-bold mb-6 text-black dark:text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
              <Link
                href="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-[#ff2d3d] transition-colors"
              >
                Home
              </Link>
              <Link href="/about" className="hover:text-[#ff2d3d] transition-colors">About</Link>
              <Link href="/contact" className="hover:text-[#ff2d3d] transition-colors">Contact</Link>
              <Link href="/blog" className="hover:text-[#ff2d3d] transition-colors">Blog</Link>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={childVariants} className="lg:col-span-1">
            <h3 className="text-[20px] md:text-2xl font-bold mb-6 text-black dark:text-white">
              Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full px-5 py-3 pr-14 focus:outline-none focus:border-[#ff2d3d] transition-colors disabled:opacity-70"
              />
              <button
                type="submit"
                disabled={subscribed}
                className={`absolute right-1 top-1 bottom-1 px-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                  subscribed
                    ? "bg-green-500 text-white"
                    : "bg-[#ff2d3d] text-white hover:bg-black dark:hover:bg-white dark:hover:text-black"
                }`}
              >
                {subscribed ? <FaCheck className="animate-bounce" /> : <FaPaperPlane />}
              </button>
            </form>
            {subscribed && (
              <p className="text-green-500 text-sm mt-3 font-medium animate-pulse">
                Thanks for subscribing!
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}