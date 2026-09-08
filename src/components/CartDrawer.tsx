"use client";

import { useStore } from "../store/useStore";
import { FaTimes, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Cart ({cart.length})</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <span className="text-6xl text-gray-300">🛒</span>
              <p className="text-xl font-medium">Your cart is empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 bg-[#ff2d3d] text-white rounded-full font-medium hover:bg-black transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                <div className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                  <p className="text-[#ff2d3d] font-bold">${item.price}</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 bg-white dark:bg-gray-700 shadow-sm rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 bg-white dark:bg-gray-700 shadow-sm rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.error(`${item.name} removed from cart`);
                  }}
                  className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-black">${total.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">Shipping and taxes calculated at checkout.</p>
            <button className="w-full py-4 bg-[#ff2d3d] hover:bg-black text-white rounded-full font-bold text-lg transition-colors shadow-lg">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
