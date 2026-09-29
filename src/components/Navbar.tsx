"use client";

import Link from "next/link";
import { FaSearch, FaChevronDown, FaSun, FaMoon, FaHeart, FaFire, FaBolt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Outfit } from "next/font/google";
import { useStore } from "../store/useStore";
// Note: next/navigation is standard for App router
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { data: session } = useSession();
  
  const { watchlist, setIsCartOpen, searchQuery, setSearchQuery } = useStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setMounted(true);
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${outfit.className} sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 shadow-sm`}>
      {/* Top Banner */}
      <div className="bg-[#ff2d3d] text-white text-xs font-semibold py-1.5 px-6 flex justify-between items-center hidden sm:flex">
         <div className="flex gap-6">
            <span className="flex items-center gap-1"><FaFire className="text-yellow-300"/> Trending: iPhone 15 Pro Price Drop</span>
            <span className="flex items-center gap-1"><FaBolt className="text-yellow-300"/> Flash Deals on Electronics</span>
         </div>
         <div className="flex gap-4">
            <Link href="#" className="hover:underline">Help Center</Link>
            <Link href="#" className="hover:underline">Track Alerts</Link>
         </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Left: Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tight text-black dark:text-white flex items-center gap-1">
          <span className="text-[#ff2d3d]">Greedy</span>Cart
        </Link>

        {/* Center: Massive Search Bar */}
        <div className="flex-1 max-w-3xl hidden md:block">
          <form onSubmit={handleSearch} className="relative group w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FaSearch className="text-gray-400 group-focus-within:text-[#ff2d3d] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for any product across Amazon, Flipkart, Myntra..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-[#ff2d3d] focus:bg-white dark:focus:bg-gray-900 rounded-full py-3 pl-12 pr-4 text-sm font-medium outline-none transition-all duration-300"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff2d3d] hover:bg-black text-white px-6 py-1.5 rounded-full text-sm font-bold transition-colors cursor-pointer">
              Compare
            </button>
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#ff2d3d] dark:hover:text-[#ff2d3d] transition-colors cursor-pointer"
          >
            <div className="relative">
              <FaHeart className="text-2xl" />
              {mounted && watchlist.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#ff2d3d] text-white text-[11px] font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 animate-in zoom-in">
                  {watchlist.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold hidden md:block">Watchlist</span>
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <FaSun className={`absolute text-lg transition-all duration-500 ${theme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100 text-yellow-500'}`} />
              <FaMoon className={`absolute text-lg transition-all duration-500 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100 text-blue-400' : 'opacity-0 -rotate-90 scale-50'}`} />
            </button>
          )}

          {/* Auth Button */}
          {mounted && (
            <div className="hidden sm:block border-l border-gray-200 dark:border-gray-800 pl-4 md:pl-6">
              {session ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] text-gray-500">Welcome,</span>
                    <span className="text-xs font-bold">{session.user?.name || 'User'}</span>
                  </div>
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white px-5 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer">
                    Sign In
                  </Link>
                  <Link href="/login" className="bg-[#ff2d3d] hover:bg-[#e02635] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md transition-colors cursor-pointer">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-3 block md:hidden">
         <form onSubmit={handleSearch} className="relative w-full">
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none"
            />
         </form>
      </div>

      {/* Bottom Categories Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 hidden lg:block">
        <ul className="max-w-[1600px] mx-auto px-8 flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300 overflow-x-auto py-2">
          <li onClick={() => { setSearchQuery(''); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#ff2d3d] flex items-center gap-1"><FaChevronDown className="text-[10px]"/> All Categories</li>
          <li onClick={() => { setSearchQuery('Mobiles'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#ff2d3d]">Mobiles & Gadgets</li>
          <li onClick={() => { setSearchQuery('Laptops'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#ff2d3d]">Laptops</li>
          <li onClick={() => { setSearchQuery('Fashion'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#ff2d3d]">Fashion</li>
          <li onClick={() => { setSearchQuery('Home Appliances'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#ff2d3d]">Home Appliances</li>
          <li onClick={() => { setSearchQuery('Beauty'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#ff2d3d]">Beauty</li>
          <li onClick={() => { setSearchQuery(''); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#ff2d3d] text-[#ff2d3d] font-bold flex items-center gap-1">Today's Best Drops <FaFire/></li>
        </ul>
      </div>
    </nav>
  );
}