import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Category } from '@/types';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string | null;
  onSelect: (categoryId: string | null) => void;
}

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', ring: 'ring-rose-200' },
  green: { bg: 'bg-green-50', text: 'text-green-600', ring: 'ring-green-200' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-200' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', ring: 'ring-orange-200' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', ring: 'ring-cyan-200' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-600', ring: 'ring-slate-200' },
};

export default function CategoryNav({ categories, activeCategory, onSelect }: CategoryNavProps) {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Shop by Category</h3>
          <p className="text-sm text-gray-500 mt-0.5">Everything your home needs, sorted</p>
        </div>
        {activeCategory && (
          <button
            onClick={() => onSelect(null)}
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
        {categories.map((cat, i) => {
          const Icon = (Icons as unknown as Record<string, LucideIcon>)[cat.icon] ?? Icons.Apple;
          const colors = colorMap[cat.color] ?? colorMap.emerald;
          const isActive = activeCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(isActive ? null : cat.id)}
              className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border transition-all ${
                isActive
                  ? `${colors.bg} border-transparent ring-2 ${colors.ring}`
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colors.text}`} />
              </div>
              <span className={`text-xs sm:text-sm font-semibold text-center leading-tight ${isActive ? colors.text : 'text-gray-700'}`}>
                {cat.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
