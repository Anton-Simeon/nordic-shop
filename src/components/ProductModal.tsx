import { useEffect, useRef } from 'react';
import type { Product } from '../data';
import { formatPrice, t, type Lang } from '../i18n';
import { ProductArt } from './ProductArt';

interface Props { product: Product | null; lang: Lang; onClose: () => void; onAdd: (p: Product) => void }

export function ProductModal({ product, lang, onClose, onAdd }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (product && !el.open) el.showModal();
    if (!product && el.open) el.close();
  }, [product]);
  const d = t(lang);
  return (
    <dialog ref={ref} className="modal" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      {product && (
        <div className="modal__content">
          <ProductArt product={product} size="large" />
          <div>
            <h2>{product.name[lang]}</h2>
            <p className="muted">{product.description[lang]}</p>
            <p className="price">{formatPrice(product.price, lang)}</p>
            <div className="modal__actions">
              <button className="btn btn--primary" disabled={product.stock === 0} onClick={() => { onAdd(product); onClose(); }}>
                {product.stock === 0 ? d.outOfStock : d.addToCart}
              </button>
              <button className="btn" onClick={onClose}>{d.close}</button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
