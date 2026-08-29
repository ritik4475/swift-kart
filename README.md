# SwiftKart — Quick-Commerce Grocery Store

A professional, production-ready ecommerce storefront for a 10-minute grocery delivery service. Built with React, TypeScript, Framer Motion, Tailwind CSS, and Supabase.

## Features

### Shopping Experience
- **Hero section** with animated visuals and a 10-minute delivery promise
- **7 product categories** — Fruits, Vegetables, Dairy & Eggs, Snacks & Munchies, Bakery, Beverages, and Household Essentials
- **33 seeded products** with real photography, pricing, discount badges, ratings, and popularity tags
- **Live search** — filter products by name or description as you type
- **Category filtering** — click any category tile to view only its products
- **Trending section** showcasing the most popular products

### Cart & Checkout
- **Slide-in cart drawer** with smooth spring animations
- **Quantity controls** — increment, decrement, and remove items
- **Smart pricing** — automatic savings calculation, free delivery over ₹199, and a progress hint to reach the free-delivery threshold
- **Checkout flow** with an animated order-success confirmation

### Animations (Framer Motion)
- Spring-animated header drop-in
- Animated cart badge counter that pops on update
- Hover lift effects on product cards and category tiles
- Staggered fade-in for product grids
- Floating, rotating hero visuals
- Animated checkmark draw on successful order placement

### Design
- Emerald and amber color palette with a clean, modern aesthetic
- 8px spacing system for consistent layout
- Fully responsive — mobile, tablet, and desktop breakpoints
- Dark footer with social links and navigation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |

## Database Schema

Two tables power the storefront, both with Row Level Security enabled:

- **`categories`** — name, slug, icon (Lucide name), accent color, sort order
- **`products`** — name, description, price, MRP, unit, image URL, stock, rating, popularity flag, category foreign key

Both tables have `SELECT` policies scoped to `anon, authenticated` so the storefront can read data without requiring user sign-in.

## Getting Started

The dev server runs automatically — no need to start it manually.

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Type check
npm run typecheck
```

## Project Structure

```
src/
├── components/
│   ├── CartDrawer.tsx      # Slide-in cart with checkout flow
│   ├── CategoryNav.tsx     # Category filter tiles
│   ├── Footer.tsx          # Dark footer with links
│   ├── Header.tsx          # Sticky header with search & cart
│   ├── Hero.tsx            # Animated landing hero
│   ├── ProductCard.tsx     # Product tile with add-to-cart
│   └── ProductGrid.tsx     # Responsive product grid
├── context/
│   └── CartContext.tsx     # Cart state provider & hook
├── lib/
│   ├── data.ts             # Supabase data-fetch helpers
│   ├── format.ts           # Price formatting utilities
│   └── supabase.ts         # Supabase client singleton
├── types/
│   └── index.ts            # Category, Product, CartItem types
├── App.tsx                 # Main app composition
├── main.tsx                # React entry point
└── index.css               # Tailwind directives
```

## Environment Variables

Supabase credentials are pre-populated in `.env`:

- `VITE_SUPABASE_URL` — Project URL
- `VITE_SUPABASE_ANON_KEY` — Anonymous API key

No manual configuration required.

## License

© 2026 SwiftKart. All rights reserved.
