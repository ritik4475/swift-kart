import { useState, useEffect, useMemo } from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryNav from '@/components/CategoryNav';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { fetchCategories, fetchProducts } from '@/lib/data';
import type { Category, Product } from '@/types';

function StoreFront() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [cats, prods] = await Promise.all([fetchCategories(), fetchProducts()]);
        setCategories(cats);
        setAllProducts(prods);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const popularProducts = useMemo(
    () => allProducts.filter((p) => p.is_popular).slice(0, 10),
    [allProducts]
  );

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (activeCategory) {
      result = result.filter((p) => p.category_id === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false)
      );
    }
    return result;
  }, [allProducts, activeCategory, searchQuery]);

  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name;
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="flex-1">
        {!isSearching && !activeCategory && <Hero />}

        {isSearching ? (
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            title={`Search results for "${searchQuery}"`}
            subtitle={`${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
          />
        ) : activeCategory ? (
          <div className="pt-4">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              title={activeCategoryName ?? 'Category'}
              subtitle={`${filteredProducts.length} products available`}
            />
          </div>
        ) : (
          <>
            <CategoryNav
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
            <ProductGrid
              id="popular"
              products={popularProducts}
              loading={loading}
              title="Trending Now"
              subtitle="Most-loved picks from our customers"
            />
            <ProductGrid
              products={allProducts}
              loading={loading}
              title="All Products"
              subtitle="Browse our complete catalog"
            />
          </>
        )}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreFront />
    </CartProvider>
  );
}
