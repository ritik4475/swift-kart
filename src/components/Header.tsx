import { motion } from 'framer-motion';
import { Search, ShoppingCart, MapPin, Clock, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const { totalItems, setIsOpen } = useCart();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm"
    >
      {/* Top bar */}
      <div className="bg-emerald-600 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span className="font-semibold">Delivery in 10 minutes</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 6 AM — 11 PM
            </span>
            <span>Help · Contact</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center gap-3 sm:gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.div
            whileHover={{ rotate: -15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30"
          >
            <Zap className="w-6 h-6 text-white fill-white" />
          </motion.div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-extrabold text-gray-900 leading-none tracking-tight">SwiftKart</h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide">GROCERY IN MINUTES</p>
          </div>
        </div>

        {/* Location */}
        <div className="hidden lg:flex items-center gap-2 text-sm shrink-0 max-w-[200px]">
          <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
          <div className="truncate">
            <p className="text-gray-400 text-[11px] leading-none">Deliver to</p>
            <p className="font-semibold text-gray-700 truncate">Home — 560001</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder='Search "milk", "chips", "bread"...'
            className="w-full bg-gray-100 rounded-xl py-2.5 pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all"
          />
        </div>

        {/* Cart */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-emerald-500/30 transition-colors shrink-0"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 text-gray-900 text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white"
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}
