import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface StoreState {
  watchlist: Product[];
  searchQuery: string;
  isCartOpen: boolean; // Reused for Watchlist Drawer
  quickViewProduct: Product | null;
  
  // Actions
  toggleWatchlist: (product: Product) => void;
  removeFromWatchlist: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      watchlist: [],
      searchQuery: '',
      isCartOpen: false,
      quickViewProduct: null,

      toggleWatchlist: (product) =>
        set((state) => {
          const exists = state.watchlist.find((item) => item.id === product.id);
          if (exists) {
            return { watchlist: state.watchlist.filter((item) => item.id !== product.id) };
          }
          return { watchlist: [...state.watchlist, product] };
        }),

      removeFromWatchlist: (productId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((item) => item.id !== productId),
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),
    }),
    {
      name: 'greedycart-storage',
      skipHydration: true,
      partialize: (state) => ({ watchlist: state.watchlist }), 
    }
  )
);
