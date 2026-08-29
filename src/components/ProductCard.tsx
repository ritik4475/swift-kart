import { motion } from 'framer-motion';
import { Plus, Minus, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice, discountPercent } from '@/lib/format';

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const { items, addItem, incrementItem, decrementItem } = useCart();
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;
  const discount = discountPercent(product.price, product.mrp);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🛒</div>
        )}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
            {discount}% OFF
          </span>
        )}
        {product.is_popular && (
          <span className="absolute top-2 right-2 bg-amber-400 text-gray-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 fill-gray-900" /> Popular
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-[11px] font-semibold text-gray-500">{product.rating.toFixed(1)}</span>
          <span className="text-[11px] text-gray-300">·</span>
          <span className="text-[11px] text-gray-400">{product.unit}</span>
        </div>

        <h4 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2 mb-1">
          {product.name}
        </h4>
        {product.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-2 flex-1">{product.description}</p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-base text-gray-900">{formatPrice(product.price)}</span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</span>
            )}
          </div>

          {quantity === 0 ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addItem(product)}
              className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-200 hover:border-emerald-500 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> ADD
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-emerald-500 rounded-lg overflow-hidden"
            >
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => decrementItem(product.id)}
                className="w-7 h-7 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </motion.button>
              <motion.span
                key={quantity}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="text-xs font-bold text-white min-w-[16px] text-center"
              >
                {quantity}
              </motion.span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => incrementItem(product.id)}
                className="w-7 h-7 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
