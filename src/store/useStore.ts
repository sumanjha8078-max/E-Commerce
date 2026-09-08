import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[]; // array of product IDs
  searchQuery: string;
  isCartOpen: boolean;
  quickViewProduct: Product | null;
  
  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      searchQuery: '',
      isCartOpen: false,
      quickViewProduct: null,

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),
    }),
    {
      name: 'greedycart-storage',
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }), // Only persist cart and wishlist in localStorage
    }
  )
);
