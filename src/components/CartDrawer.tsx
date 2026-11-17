import { useState, type FormEvent } from 'react';
import { products, type Product } from '../data';
import { totals, validateCheckout, type CartLine, type CheckoutForm } from '../cart';
import { formatPrice, t, type Lang } from '../i18n';
import { ProductArt } from './ProductArt';

interface Props {
  open: boolean; lang: Lang; lines: CartLine[];
  onClose: () => void; onQty: (p: Product, qty: number) => void; onOrderPlaced: () => void;
}

const emptyForm: CheckoutForm = { name: '', email: '', address: '', zip: '', city: '' };

export function CartDrawer({ open, lang, lines, onClose, onQty, onOrderPlaced }: Props) {
  const d = t(lang);
  const [step, setStep] = useState<'cart' | 'checkout' | 'done'>('cart');
  const [form, setForm] = useState<CheckoutForm>(emptyForm);
  const [touched, setTouched] = useState(false);
  const [orderNo, setOrderNo] = useState('');
  const sum = totals(lines, products);
  const errors = validateCheckout(form);

  const close = () => { onClose(); if (step === 'done') { setStep('cart'); setForm(emptyForm); setTouched(false); } };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (Object.keys(errors).length) return;
    setOrderNo(`NS-${Date.now().toString().slice(-6)}`);
    setStep('done');
    onOrderPlaced();
  };

  const field = (k: keyof CheckoutForm, label: string, type = 'text', autoComplete?: string) => (
    <label className="field">
      <span>{label}</span>
      <input type={type} value={form[k]} autoComplete={autoComplete} aria-invalid={touched && !!errors[k]}
        onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
      {touched && errors[k] && <small className="error">{d[errors[k]!]}</small>}
    </label>
  );

  return (
    <>
      <div className={`backdrop ${open ? 'backdrop--show' : ''}`} onClick={close} />
      <aside className={`drawer ${open ? 'drawer--open' : ''}`} aria-hidden={!open} aria-label={d.cart}>
        <header className="drawer__head">
          <h2>{step === 'checkout' ? d.checkout : d.cart}</h2>
          <button className="icon-btn" onClick={close} aria-label={d.close}>✕</button>
        </header>

        {step === 'cart' && (
          <>
            {lines.length === 0 ? <p className="muted pad">{d.emptyCart}</p> : (
              <ul className="lines">
                {lines.map((l) => {
                  const p = products.find((x) => x.id === l.id)!;
                  return (
                    <li key={l.id} className="line">
                      <ProductArt product={p} />
                      <div className="line__info">
                        <strong>{p.name[lang]}</strong>
                        <span className="muted">{formatPrice(p.price, lang)}</span>
                        <div className="stepper" aria-label={d.qty}>
                          <button onClick={() => onQty(p, l.qty - 1)} aria-label="−">−</button>
                          <span>{l.qty}</span>
                          <button onClick={() => onQty(p, l.qty + 1)} disabled={l.qty >= p.stock} aria-label="+">+</button>
                        </div>
                      </div>
                      <button className="link" onClick={() => onQty(p, 0)}>{d.remove}</button>
                    </li>
                  );
                })}
              </ul>
            )}
            {lines.length > 0 && (
              <footer className="drawer__foot">
                {sum.missingForFree > 0 && (
                  <div className="progress">
                    <div className="progress__bar" style={{ width: `${100 - (sum.missingForFree / 10000) * 100}%` }} />
                    <small>{d.freeShippingHint(formatPrice(sum.missingForFree, lang))}</small>
                  </div>
                )}
                <dl className="sum">
                  <dt>{d.subtotal}</dt><dd>{formatPrice(sum.subtotal, lang)}</dd>
                  <dt>{d.shipping}</dt><dd>{sum.shipping ? formatPrice(sum.shipping, lang) : d.free}</dd>
                  <dt className="strong">{d.total}</dt><dd className="strong">{formatPrice(sum.total, lang)}</dd>
                </dl>
                <button className="btn btn--primary btn--block" onClick={() => setStep('checkout')}>{d.checkout}</button>
              </footer>
            )}
          </>
        )}

        {step === 'checkout' && (
          <form className="pad checkout" onSubmit={submit} noValidate>
            {field('name', d.name, 'text', 'name')}
            {field('email', d.email, 'email', 'email')}
            {field('address', d.address, 'text', 'street-address')}
            <div className="row2">{field('zip', d.zip, 'text', 'postal-code')}{field('city', d.city, 'text', 'address-level2')}</div>
            <p className="strong">{d.total}: {formatPrice(sum.total, lang)}</p>
            <p className="muted small">{d.demo}</p>
            <button className="btn btn--primary btn--block" type="submit">{d.placeOrder}</button>
            <button className="link" type="button" onClick={() => setStep('cart')}>← {d.back}</button>
          </form>
        )}

        {step === 'done' && (
          <div className="pad done">
            <div className="done__icon" aria-hidden>✓</div>
            <h3>{d.thanks}</h3>
            <p>{d.orderNo}: <strong>{orderNo}</strong></p>
            <button className="btn btn--primary" onClick={close}>{d.continue}</button>
          </div>
        )}
      </aside>
    </>
  );
}
