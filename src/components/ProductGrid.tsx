import { motion } from 'framer-motion';
import { Loader2, PackageSearch } from 'lucide-react';
import type { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  title: string;
  subtitle?: string;
  id?: string;
}

export default function ProductGrid({ products, loading, title, subtitle, id }: ProductGridProps) {
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <PackageSearch className="w-16 h-16 mb-3" />
          <p className="font-semibold text-gray-500">No products found</p>
          <p className="text-sm">Try a different category or search</p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-5">
        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
      >
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
