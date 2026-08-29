export function formatPrice(amount: number): string {
  return `₹${amount.toFixed(0)}`;
}

export function formatPriceDecimal(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}

export function discountPercent(price: number, mrp: number | null): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
