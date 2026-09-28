# GreedyCart: The Ultimate Indian Price Aggregator
## Project Roadmap

### Phase 1: Foundation & Aggregator Engine (Current)
- [x] Define multi-vendor data structures (`Product`, `VendorOffer`).
- [x] Create a dynamic Next.js API route (`/api/search`) to handle global search queries.
  - *Note:* We will use an intelligent mock engine initially so the UI can be built for *any* product globally, simulating responses from Amazon IN, Flipkart, Myntra, etc.
- [ ] Refactor the global state (`zustand`) from a traditional Cart to a "Watchlist / Price Alert" system.

### Phase 2: Complete Frontend Revamp (The UI/UX)
- [ ] **Navbar & Global Search:** Implement a massive, prominent search bar at the core of the UI (the Google-like search experience for products).
- [ ] **Product Cards:** Redesign to emphasize "Starting from ₹XXX", displaying vendor logos (Amazon, Flipkart), and highlighting the "GreedyScore".
- [ ] **Landing Page:** Revamp to show "Trending Drops", "Top Searched Categories", and "Deal of the Day" across platforms.
- [ ] **Product Detail / Comparison Page:** 
  - Build the side-by-side comparison table.
  - Show a list of all vendor offers sorted by lowest price.
  - Add visual price history charts.

### Phase 3: Indian Market Specific Integrations
- [ ] Integrate specific UI branding for Amazon India, Flipkart, Myntra, Tata Cliq, and JioMart.
- [ ] Handle category-specific logic (e.g., Myntra is better for fashion, Flipkart/Amazon for electronics).

### Phase 4: Backend & Real API Transition
- [ ] Swap the mock API engine for a real backend (e.g., integrating with SerpApi, Rainforest API, or a custom Python web scraper).
- [ ] Implement user authentication (NextAuth) so users can save their Watchlists permanently.
- [ ] Setup a database (PostgreSQL + Prisma) to cache product searches and track price history over time.
