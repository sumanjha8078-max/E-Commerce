"use client";

import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-[#f3f4f6] dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Logo */}
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-[#ff2d3d]">
              GreedyCart
            </h2>

            <p className="mt-5 text-gray-600 dark:text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Maiores alias cum
            </p>

            <p className="mt-6 text-gray-500">
              Made with 💖 by The Coding Journey
            </p>


          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-[20px] md:text-2xl font-bold mb-6 text-black dark:text-white">
              Important Links
            </h3>

            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[20px] md:text-2xl font-bold mb-6 text-black dark:text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>



        </div>
      </div>
    </footer>
  );
}