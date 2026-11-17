import type { Product } from './data';

export interface CartLine { id: string; qty: number }

export const FREE_SHIPPING_FROM = 10000; // € 100
export const SHIPPING_COST = 690;

export function addToCart(lines: CartLine[], product: Product, qty = 1): CartLine[] {
  if (product.stock <= 0) return lines;
  const existing = lines.find((l) => l.id === product.id);
  if (existing) {
    return lines.map((l) => (l.id === product.id ? { ...l, qty: Math.min(l.qty + qty, product.stock) } : l));
  }
  return [...lines, { id: product.id, qty: Math.min(qty, product.stock) }];
}

export function setQty(lines: CartLine[], product: Product, qty: number): CartLine[] {
  if (qty <= 0) return lines.filter((l) => l.id !== product.id);
  return lines.map((l) => (l.id === product.id ? { ...l, qty: Math.min(qty, product.stock) } : l));
}

export function totals(lines: CartLine[], catalog: Product[]) {
  const subtotal = lines.reduce((sum, l) => {
    const p = catalog.find((x) => x.id === l.id);
    return p ? sum + p.price * l.qty : sum;
  }, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const count = lines.reduce((n, l) => n + l.qty, 0);
  return { subtotal, shipping, total: subtotal + shipping, count, missingForFree: Math.max(0, FREE_SHIPPING_FROM - subtotal) };
}

export type SortKey = 'featured' | 'priceAsc' | 'priceDesc' | 'rating';

export interface Filters { query: string; category: string; maxPrice: number; inStockOnly: boolean; sort: SortKey }

export function filterProducts(list: Product[], f: Filters, lang: 'en' | 'de'): Product[] {
  const q = f.query.trim().toLowerCase();
  const out = list.filter(
    (p) =>
      (f.category === 'all' || p.category === f.category) &&
      p.price <= f.maxPrice &&
      (!f.inStockOnly || p.stock > 0) &&
      (!q || p.name[lang].toLowerCase().includes(q) || p.description[lang].toLowerCase().includes(q)),
  );
  const sorted = [...out];
  if (f.sort === 'priceAsc') sorted.sort((a, b) => a.price - b.price);
  if (f.sort === 'priceDesc') sorted.sort((a, b) => b.price - a.price);
  if (f.sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}

export interface CheckoutForm { name: string; email: string; address: string; zip: string; city: string }

export function validateCheckout(form: CheckoutForm) {
  const errors: Partial<Record<keyof CheckoutForm, 'required' | 'invalidEmail' | 'invalidZip'>> = {};
  (Object.keys(form) as (keyof CheckoutForm)[]).forEach((k) => {
    if (!form[k].trim()) errors[k] = 'required';
  });
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'invalidEmail';
  if (!errors.zip && !/^\d{4,5}$/.test(form.zip.trim())) errors.zip = 'invalidZip';
  return errors;
}
