import { useEffect, useMemo, useState } from 'react';
import { products, type Product } from './data';
import { addToCart, filterProducts, setQty, totals, type CartLine, type Filters as F } from './cart';
import { t, type Lang } from './i18n';
import { Filters } from './components/Filters';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';

const MAX_PRICE = Math.ceil(Math.max(...products.map((p) => p.price)) / 1000) * 1000;
const initialFilters: F = { query: '', category: 'all', maxPrice: MAX_PRICE, inStockOnly: false, sort: 'featured' };

function loadCart(): CartLine[] {
  try { return JSON.parse(localStorage.getItem('nordic-cart') || '[]'); } catch { return []; }
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (navigator.language.startsWith('de') ? 'de' : 'en'));
  const [filters, setFilters] = useState<F>(initialFilters);
  const [lines, setLines] = useState<CartLine[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [toast, setToast] = useState('');
  const d = t(lang);

  useEffect(() => { try { localStorage.setItem('nordic-cart', JSON.stringify(lines)); } catch { /* storage unavailable */ } }, [lines]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(''), 2200); return () => clearTimeout(id); }, [toast]);

  const visible = useMemo(() => filterProducts(products, filters, lang), [filters, lang]);
  const { count } = totals(lines, products);

  const add = (p: Product) => { setLines((l) => addToCart(l, p)); setToast(`✓ ${p.name[lang]}`); };

  return (
    <>
      <header className="topbar">
        <div className="container topbar__inner">
          <a className="logo" href="#">Nordic<span>Shop</span></a>
          <input className="search" type="search" placeholder={d.search} value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })} aria-label={d.search} />
          <div className="topbar__actions">
            <button className="lang" onClick={() => setLang(lang === 'en' ? 'de' : 'en')} aria-label="Language">{lang === 'en' ? 'DE' : 'EN'}</button>
            <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label={`${d.cart} (${count})`}>
              🛒 <span className="cart-btn__count">{count}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>{d.tagline}</h1>
        </section>
        <Filters value={filters} onChange={setFilters} lang={lang} maxAvailable={MAX_PRICE} />
        <p className="muted" aria-live="polite">{d.results(visible.length)}</p>
        {visible.length === 0 ? (
          <div className="empty">
            <p>{d.noResults}</p>
            <button className="btn" onClick={() => setFilters(initialFilters)}>{d.reset}</button>
          </div>
        ) : (
          <div className="grid">
            {visible.map((p) => <ProductCard key={p.id} product={p} lang={lang} onAdd={add} onOpen={setSelected} />)}
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div className="container">Demo storefront by <a href="https://github.com/Anton-Simeon">Volodymyr Anton-Simeon</a> · React · TypeScript · Vite</div>
      </footer>

      <ProductModal product={selected} lang={lang} onClose={() => setSelected(null)} onAdd={add} />
      <CartDrawer open={cartOpen} lang={lang} lines={lines} onClose={() => setCartOpen(false)}
        onQty={(p, q) => setLines((l) => setQty(l, p, q))} onOrderPlaced={() => setLines([])} />
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
