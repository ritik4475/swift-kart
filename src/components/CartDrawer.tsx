import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, incrementItem, decrementItem, removeItem, clearCart, totalAmount, totalSavings, totalItems } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'success'>('cart');

  const deliveryFee = totalAmount >= 199 || totalAmount === 0 ? 0 : 25;
  const grandTotal = totalAmount + deliveryFee;

  const handleCheckout = () => {
    setCheckoutStep('success');
    clearCart();
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setCheckoutStep('cart'), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-500" />
                <h3 className="font-extrabold text-lg text-gray-900">
                  {checkoutStep === 'success' ? 'Order Placed!' : 'Your Cart'}
                </h3>
                {checkoutStep === 'cart' && totalItems > 0 && (
                  <span className="text-sm text-gray-400">({totalItems} items)</span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {checkoutStep === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4"
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
                <h4 className="text-xl font-extrabold text-gray-900 mb-1">Thank you!</h4>
                <p className="text-sm text-gray-500 mb-6">Your order is on its way. Expect delivery in ~10 minutes.</p>
                <button
                  onClick={handleClose}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-gray-300" />
                </div>
                <h4 className="font-bold text-gray-700 mb-1">Your cart is empty</h4>
                <p className="text-sm text-gray-400 mb-6">Add some products to get started</p>
                <button
                  onClick={handleClose}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {items.map((item) => (
                    <motion.div
                      layout
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 bg-gray-50 rounded-xl p-2.5"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0">
                        {item.product.image_url ? (
                          <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🛒</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-sm text-gray-900 truncate">{item.product.name}</h5>
                        <p className="text-xs text-gray-400">{item.product.unit}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="font-extrabold text-sm text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          <div className="flex items-center gap-1 bg-emerald-500 rounded-lg">
                            <button
                              onClick={() => decrementItem(item.product.id)}
                              className="w-7 h-7 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-white min-w-[16px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => incrementItem(item.product.id)}
                              className="w-7 h-7 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="self-start text-gray-300 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t border-gray-100 p-4 space-y-3 bg-white">
                  {totalSavings > 0 && (
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg text-xs font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      You save {formatPrice(totalSavings)} on this order!
                    </div>
                  )}
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">{formatPrice(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery fee</span>
                      <span className="font-semibold">
                        {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : formatPrice(deliveryFee)}
                      </span>
                    </div>
                    {deliveryFee > 0 && (
                      <p className="text-[11px] text-gray-400">
                        Add {formatPrice(199 - totalAmount)} more for free delivery
                      </p>
                    )}
                    <div className="flex justify-between text-base font-extrabold text-gray-900 pt-1.5 border-t border-gray-100">
                      <span>Total</span>
                      <span>{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-colors"
                  >
                    Checkout · {formatPrice(grandTotal)} <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
