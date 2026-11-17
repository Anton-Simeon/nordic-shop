import type { Product } from '../data';
import { formatPrice, t, type Lang } from '../i18n';
import { ProductArt } from './ProductArt';

interface Props { product: Product; lang: Lang; onAdd: (p: Product) => void; onOpen: (p: Product) => void }

export function ProductCard({ product, lang, onAdd, onOpen }: Props) {
  const d = t(lang);
  const soldOut = product.stock === 0;
  return (
    <article className="card">
      <button className="card__media" onClick={() => onOpen(product)} aria-label={product.name[lang]}>
        <ProductArt product={product} />
        {product.isNew && <span className="badge">{d.new}</span>}
      </button>
      <div className="card__body">
        <h3 className="card__title">{product.name[lang]}</h3>
        <p className="card__meta">
          <span aria-label={`${product.rating} / 5`}>★ {product.rating.toFixed(1)}</span>
          {product.stock > 0 && product.stock <= 5 && <span className="warn">{d.onlyLeft(product.stock)}</span>}
        </p>
        <div className="card__footer">
          <strong>{formatPrice(product.price, lang)}</strong>
          <button className="btn btn--primary" disabled={soldOut} onClick={() => onAdd(product)}>
            {soldOut ? d.outOfStock : d.addToCart}
          </button>
        </div>
      </div>
    </article>
  );
}
