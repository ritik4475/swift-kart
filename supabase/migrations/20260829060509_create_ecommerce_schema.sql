/*
# Create ecommerce schema for quick-commerce store

1. New Tables
- `categories` — product categories (Fruits, Vegetables, Dairy, Snacks, Bakery, Beverages, Household)
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `slug` (text, unique, not null)
  - `icon` (text, lucide icon name)
  - `color` (text, tailwind color hint for category accent)
  - `sort_order` (int, default 0)
  - `created_at` (timestamp)
- `products` — individual products belonging to a category
  - `id` (uuid, primary key)
  - `category_id` (uuid, FK to categories, cascade delete)
  - `name` (text, not null)
  - `description` (text)
  - `price` (numeric, not null)
  - `mrp` (numeric, original price for discount display)
  - `unit` (text, e.g. "500 g", "1 L", "2 pcs")
  - `image_url` (text)
  - `stock` (int, default 100)
  - `rating` (numeric, default 4.5)
  - `is_popular` (boolean, default false)
  - `created_at` (timestamp)

2. Security
- Enable RLS on both tables.
- This is a no-auth single-tenant storefront: all reads are public.
- SELECT policy scoped to `anon, authenticated` so the anon-key frontend can read data.
- No INSERT/UPDATE/DELETE policies — data is managed via migrations only.

3. Notes 
- Prices in INR (₹) to match quick-commerce style.
- `mrp` lets us show discount percentages; `price` is the selling price.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text NOT NULL,
  color text NOT NULL DEFAULT 'emerald',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  mrp numeric(10,2),
  unit text NOT NULL,
  image_url text,
  stock int NOT NULL DEFAULT 100,
  rating numeric(2,1) NOT NULL DEFAULT 4.5,
  is_popular boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_popular ON products(is_popular);
