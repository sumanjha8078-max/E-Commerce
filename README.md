# 🛒 GreedyCart

> **The Ultimate Price Comparison & E-Commerce Aggregator for the Indian Market.**

GreedyCart is a next-generation e-commerce platform. Instead of functioning as a traditional storefront, GreedyCart acts as a **Price Aggregator**. It scans major platforms (Amazon India, Flipkart, Myntra, JioMart, TataCliq) to find the absolute best deals, highlight price drops, and allow users to compare products side-by-side.

---

## 🚀 The Core Concept & Features

### 1. The Aggregator Model
Users do not "checkout" on GreedyCart. Instead, they use our powerful search engine to find products. Once they find the best deal, clicking "View Deal" redirects them to the actual vendor's website (e.g., Amazon) to complete the purchase.

### 2. The Price Comparison Engine
When a user clicks on a product, the **Quick View Modal** opens. This is the heart of the application. It displays:
*   A side-by-side breakdown of the product's price across multiple stores.
*   The "Cheapest Deal" highlighted in red.
*   Stock status and delivery estimates for each vendor.

### 3. The "GreedyScore"
Every product receives a dynamic **GreedyScore** (out of 10). This score represents the "value" of the deal based on the size of the price drop, vendor reliability, and historical pricing data.

### 4. Smart Watchlist (Replacing the Cart)
The traditional "Shopping Cart" has been completely overhauled into a **Price Alert Watchlist**. 
*   Users can click the "Heart" icon on any product to save it.
*   The Watchlist Drawer tracks these products, showing the lowest current price.
*   *Future Feature:* Email alerts when a tracked product drops by more than 5%.

---

## 💻 Tech Stack & Architecture

*   **Frontend Framework:** Next.js 16 (App Router)
*   **Styling:** Tailwind CSS v4 
*   **Animations:** Framer Motion (used heavily in the Product Cards and Modals)
*   **State Management:** Zustand (Local storage persistence for the Watchlist and Search queries)
*   **Icons:** React Icons (`react-icons/fa`) & Lucide React

### Folder Structure
*   `/src/app`: The Next.js App Router structure.
    *   `/api/search`: The backend Mock Engine (see below).
*   `/src/components`: Reusable UI modules (`Navbar.tsx`, `ProductCard.tsx`, `QuickViewModal.tsx`).
*   `/src/store/useStore.ts`: The Zustand global state manager controlling the Watchlist and UI overlays.
*   `/src/types/index.ts`: The core TypeScript models (`Product`, `VendorOffer`) that define the multi-vendor data structure.

---

## 🧠 The Intelligent Mock Engine (`/api/search`)
To allow developers to build the UI for *any product in the world* without paying for expensive scraping APIs during development, GreedyCart includes a brilliant **Deterministic Mock Engine**.

When you search for any query (e.g., "iPhone 15", "Nike Shoes"):
1. The Next.js API route hashes your search term.
2. It generates realistic, varied prices across Amazon, Flipkart, Myntra, etc.
3. Because it relies on a hash, the same search query will *always* return the same simulated prices, making UI testing consistent and easy.

*(In Phase 4 of the roadmap, this Mock Engine will be replaced by a real scraper using RapidAPI or Python).*

---

## 🛠️ How to Run the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
