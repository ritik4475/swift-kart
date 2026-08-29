import { motion } from 'framer-motion';
import { Zap, Clock, Truck, ShieldCheck } from 'lucide-react';

const features = [
  { icon: Zap, label: '10-min delivery' },
  { icon: Clock, label: 'Open 6 AM–11 PM' },
  { icon: Truck, label: 'Free over ₹199' },
  { icon: ShieldCheck, label: 'Quality assured' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-20 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left content */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
          >
            <Zap className="w-3.5 h-3.5 fill-emerald-700" /> Lightning Fast
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.05] tracking-tight"
          >
            Groceries delivered in
            <span className="block text-emerald-600">10 minutes flat.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-gray-600 max-w-md leading-relaxed"
          >
            Fresh fruits, veggies, dairy and daily essentials — handpicked, packed, and at your door before you finish your coffee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <a
              href="#categories"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/30 transition-colors"
            >
              Start Shopping
            </a>
            <a
              href="#popular"
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-6 py-3 rounded-xl font-bold text-sm transition-colors"
            >
              Trending Now
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
          >
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-sm text-gray-600">
                <f.icon className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">{f.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-square max-w-md ml-auto">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-[2.5rem] rotate-6 shadow-2xl shadow-emerald-500/30"
            />
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-tr from-amber-300 to-orange-400 rounded-[2.5rem] -rotate-3 shadow-xl shadow-amber-500/20"
            />
            <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-7xl mb-4"
                >
                  🛒
                </motion.div>
                <p className="text-2xl font-extrabold text-gray-900">SwiftKart</p>
                <p className="text-sm text-gray-500 mt-1">Your neighborhood store, online</p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {['🍎', '🥬', '🥛', '🍞', '🧃', '🧹'].map((emoji, i) => (
                    <motion.div
                      key={emoji}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
                      className="text-2xl bg-gray-50 rounded-xl py-2"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
