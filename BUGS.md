# GreedyCart Comprehensive Issues & Bugs Report

This document provides a detailed, exhaustive audit of the GreedyCart e-commerce aggregator website. The audit covers functional bugs, UI/UX inconsistencies, content gaps, and dead-end elements.

---

## 🛠️ Functional Bugs & Broken Features

### 1. Authentication & User Account
- **[CRITICAL] Missing Sign-In/Sign-Up Logic**: While the `Navbar` has "Sign In" and "Sign Up" buttons, they both trigger `openLoginModal`. The `LoginModal` provides a Google sign-in and a Guest sign-in, but the actual integration with `next-auth` may be partially implemented or failing in production (as reported by the crawl).
- **[BUG] Guest Login Loop**: The "Continue as Guest" button in `LoginModal.tsx` calls `signIn("credentials", ...)`. If the backend isn't configured for these specific demo credentials, users are stuck.
- **[BUG] Watchlist Persistence**: The `useStore` uses `persist` from Zustand, but the crawl suggests users may find it difficult to track if the session doesn't sync correctly with the `next-auth` session.

### 2. Search & Filtering
- **[BUG] Search Button Empty**: In `Navbar.tsx` (line 72), the search submit button is empty: `<button type="submit" ...></button>`. There is no text or icon inside the button, making it visually "invisible" or just a red blob.
- **[BUG] Category Mapping Mismatch**: The crawl identified that "Fashion & Apparel" and "Home & Kitchen" sections are displaying iPhones and Gaming consoles. This indicates the `defaultQuery` in `page.tsx` or the `/api/search` logic is returning incorrect results for these keywords.
- **[BUG] Redundant Content**: Certain products (e.g., MacBook, Sony headphones) appear twice in the same section, suggesting a lack of deduplication in the `ProductCard` fetch logic or the `products.ts` data source.

### 3. Navigation & Links
- **[BUG] Dead Category Links**: The bottom category bar in `Navbar.tsx` (lines 150-157) uses `setSearchQuery` and `scrollIntoView`. However, if the `ProductCard` component doesn't react instantly or if the API call is slow, the user scrolls to a loading state or an empty section.
- **[BUG] "See More Deals" Inconsistency**: In `ProductCard.tsx` (line 237), the "See More Deals" link points to `/category/${encodeURIComponent(defaultQuery)}`. However, the `defaultQuery` is often a phrase (e.g., "laptops and smartwatches") which differs from the cleaned slugs in `CategoryCards.tsx` (e.g., "laptops").
- **[BUG] Footer Company Link**: The "Company" section in `Footer.tsx` only has "About Us". Other standard links (Careers, Contact, Blog) are missing.

### 4. Watchlist & Cart
- **[BUG] "Enable Email Alerts" Idle Button**: In `CartDrawer.tsx` (line 129), there is a massive "Enable Email Alerts for All" button. This button has no `onClick` handler. It is a completely idle UI element.
- **[BUG] Watchlist Redundancy**: If a user adds a product via the `HeroSlider` and then via a `ProductCard`, the system handles it, but the `toast` notifications might overlap or behave inconsistently.

### 5. Newsletter
- **[BUG] Client-Side Only Subscription**: The Newsletter form in `Footer.tsx` (line 12) only sets a local state `setSubscribed(true)`. There is no actual API call to a mailing list service (like Mailchimp or SendGrid), meaning subscriptions are fake.

---

## 🎨 UI/UX & Design Inconsistencies

### 1. Visual Polish & Layout
- **[UI] Generic Images**: Many products use `placehold.co` images. This makes the site look like a template rather than a finished product.
- **[UI] Hero Slider Image Mismatch**: In `HeroSlider.tsx` (line 27), the PS5 slide uses `/vrmen.png` (a VR person) instead of a PS5 console image.
- **[UI] Contrast Issues**: The "GreedyScore" badges in `ProductCard.tsx` use very light background colors (e.g., `bg-emerald-100`) which may have poor contrast against white backgrounds in certain lighting.

### 2. Responsiveness & Accessibility
- **[UX] Mobile Search Experience**: The mobile search bar (line 134 of `Navbar.tsx`) does not have a submit button, only the input. While `Enter` works, it's not intuitive for all users.
- **[A11y] Image Alt Text**: Some images lack descriptive alt text, relying on `item.name` which might be too long or generic.
- **[UX] Modal Overlay**: The `QuickViewModal` and `LoginModal` have backdrops, but the transition between them (if one is opened from another) is not handled.

### 3. Content Gaps
- **[CONTENT] Empty Legal Pages**: The "Privacy Policy", "Terms of Service", and "Affiliate Disclosure" pages exist as files but likely contain boilerplate or minimal text.
- **[CONTENT] About Page**: The "About Us" page is underdeveloped compared to the high-energy landing page.

---

## 📉 Technical Debt & Performance

### 1. API & Data
- **[PERF] API Polling/Fetching**: `ProductCard.tsx` fetches data on every `debouncedQuery` change. If multiple `ProductCard` components are on one page (which they are), this creates a burst of API requests on initial load.
- **[DEBT] Hardcoded Data**: The `slides` in `HeroSlider.tsx` are hardcoded to specific product IDs (`"2"`, `"5"`, `"9"`). If these IDs change in `products.ts`, the slider will crash (due to the `!` non-null assertion).

### 2. Error Handling
- **[BUG] Generic Error Messages**: The error state in `ProductCard.tsx` (line 101) says "Network connection lost," even if the error is a 500 Internal Server Error or a 404.

---

## 📝 Summary Checklist for Fixes

- [ ] Fix Navbar Search Button (Add Icon/Text)
- [ ] Implement real Newsletter API
- [ ] Implement real Email Alert logic in CartDrawer
- [ ] Fix Category mapping (Fashion/Home)
- [ ] Replace placeholder images with real product assets
- [ ] Fix HeroSlider image for PS5
- [ ] Resolve "See More" link slug inconsistencies
- [ ] Remove `!` assertions in `HeroSlider.tsx` to prevent crashes
- [ ] Flesh out Legal and About pages
- [ ] Add submit button to Mobile Search
