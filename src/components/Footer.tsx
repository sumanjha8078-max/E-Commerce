"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPaperPlane, FaCheck, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubscribed(true);
        setTimeout(() => {
          setSubscribed(false);
          setEmail("");
        }, 3000);
      } catch (err) {
        toast.error("Something went wrong. Please try again.");
      }
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
              Compare prices instantly across all top Indian platforms. Never overpay again.
            </p>

            <p className="mt-6 text-gray-500">
              © {new Date().getFullYear()} GreedyCart
            </p>
          </motion.div>

          {/* Company */}
          <motion.div variants={childVariants}>
            <h3 className="text-[20px] md:text-2xl font-bold mb-6 text-black dark:text-white">
              Company
            </h3>

            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
              <Link href="/about" className="hover:text-[#ff2d3d] transition-colors">About Us</Link>
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div variants={childVariants}>
            <h3 className="text-[20px] md:text-2xl font-bold mb-6 text-black dark:text-white">
              Legal
            </h3>

            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
              <Link href="/privacy" className="hover:text-[#ff2d3d] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#ff2d3d] transition-colors">Terms of Service</Link>
              <Link href="/affiliate-disclosure" className="hover:text-[#ff2d3d] transition-colors">Affiliate Disclosure</Link>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={childVariants} className="lg:col-span-1">
            <h3 className="text-[20px] md:text-2xl font-bold mb-6 text-black dark:text-white">
              Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to get notified about major price drops.
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
