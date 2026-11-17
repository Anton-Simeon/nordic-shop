import { describe, expect, it } from 'vitest';
import { products } from './data';
import { addToCart, filterProducts, setQty, totals, validateCheckout, FREE_SHIPPING_FROM } from './cart';

const lamp = products.find((p) => p.id === 'p1')!;
const soldOut = products.find((p) => p.stock === 0)!;

describe('cart', () => {
  it('adds items and merges quantities', () => {
    let lines = addToCart([], lamp);
    lines = addToCart(lines, lamp, 2);
    expect(lines).toEqual([{ id: 'p1', qty: 3 }]);
  });

  it('never exceeds stock and ignores sold-out products', () => {
    expect(addToCart([], lamp, 999)[0].qty).toBe(lamp.stock);
    expect(addToCart([], soldOut)).toEqual([]);
  });

  it('removes a line when quantity drops to zero', () => {
    expect(setQty([{ id: 'p1', qty: 2 }], lamp, 0)).toEqual([]);
  });

  it('charges shipping below the free-shipping threshold only', () => {
    const small = totals([{ id: 'p7', qty: 1 }], products);
    expect(small.shipping).toBeGreaterThan(0);
    const big = totals([{ id: 'p5', qty: 1 }], products);
    expect(big.subtotal).toBeGreaterThanOrEqual(FREE_SHIPPING_FROM);
    expect(big.shipping).toBe(0);
  });
});

describe('filters', () => {
  it('filters by category, price and stock and sorts by price', () => {
    const res = filterProducts(products, { query: '', category: 'kitchen', maxPrice: 100000, inStockOnly: true, sort: 'priceAsc' }, 'en');
    expect(res.every((p) => p.category === 'kitchen' && p.stock > 0)).toBe(true);
    expect(res.map((p) => p.price)).toEqual([...res.map((p) => p.price)].sort((a, b) => a - b));
  });

  it('searches in the selected language', () => {
    expect(filterProducts(products, { query: 'Leuchte', category: 'all', maxPrice: 100000, inStockOnly: false, sort: 'featured' }, 'de').length).toBeGreaterThan(0);
  });
});

describe('checkout validation', () => {
  it('reports required, email and postal code errors', () => {
    const errors = validateCheckout({ name: '', email: 'nope', address: 'Main St 1', zip: '12', city: 'Wien' });
    expect(errors).toEqual({ name: 'required', email: 'invalidEmail', zip: 'invalidZip' });
  });
});
