import type { Product } from '../data';

/** Lightweight generated artwork, so the demo ships without heavy image files. */
export function ProductArt({ product, size = 'card' }: { product: Product; size?: 'card' | 'large' }) {
  const [a, b] = product.colors;
  const shapes: Record<Product['category'], JSX.Element> = {
    lighting: (
      <>
        <line x1="100" y1="0" x2="100" y2="70" stroke={b} strokeWidth="3" />
        <path d="M55 120 Q100 50 145 120 Z" fill={a} />
        <circle cx="100" cy="132" r="14" fill="#fff8e1" opacity="0.9" />
      </>
    ),
    furniture: (
      <>
        <rect x="45" y="95" width="110" height="40" rx="10" fill={a} />
        <rect x="45" y="65" width="110" height="38" rx="10" fill={b} opacity="0.85" />
        <rect x="55" y="135" width="8" height="30" fill={b} />
        <rect x="137" y="135" width="8" height="30" fill={b} />
      </>
    ),
    textiles: (
      <>
        <rect x="50" y="50" width="100" height="100" rx="12" fill={a} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="50" y1={70 + i * 20} x2="150" y2={70 + i * 20} stroke={b} strokeWidth="5" opacity="0.7" />
        ))}
      </>
    ),
    kitchen: (
      <>
        <rect x="60" y="70" width="70" height="80" rx="12" fill={a} />
        <path d="M130 90 q28 0 28 25 q0 25 -28 25" fill="none" stroke={a} strokeWidth="9" />
        <ellipse cx="95" cy="72" rx="35" ry="7" fill={b} opacity="0.8" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={product.name.en}
      className={size === 'large' ? 'art art--large' : 'art'}
      style={{ background: `linear-gradient(135deg, ${b}22, ${a}33)` }}
    >
      {shapes[product.category]}
    </svg>
  );
}
