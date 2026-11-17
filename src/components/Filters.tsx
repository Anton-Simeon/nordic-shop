import { categories } from '../data';
import type { Filters as F, SortKey } from '../cart';
import { formatPrice, t, type Lang } from '../i18n';

interface Props { value: F; onChange: (f: F) => void; lang: Lang; maxAvailable: number }

export function Filters({ value, onChange, lang, maxAvailable }: Props) {
  const d = t(lang);
  const set = <K extends keyof F>(k: K, v: F[K]) => onChange({ ...value, [k]: v });
  return (
    <section className="filters" aria-label="Filters">
      <div className="chips" role="group" aria-label="Category">
        {(['all', ...categories] as const).map((c) => (
          <button key={c} className={`chip ${value.category === c ? 'chip--active' : ''}`} aria-pressed={value.category === c} onClick={() => set('category', c)}>
            {d[c]}
          </button>
        ))}
      </div>
      <div className="filters__row">
        <label className="field field--inline">
          <span>{d.maxPrice}: {formatPrice(value.maxPrice, lang)}</span>
          <input type="range" min={2000} max={maxAvailable} step={1000} value={value.maxPrice} onChange={(e) => set('maxPrice', Number(e.target.value))} />
        </label>
        <label className="check">
          <input type="checkbox" checked={value.inStockOnly} onChange={(e) => set('inStockOnly', e.target.checked)} /> {d.inStockOnly}
        </label>
        <label className="field field--inline">
          <span>{d.sort}</span>
          <select value={value.sort} onChange={(e) => set('sort', e.target.value as SortKey)}>
            <option value="featured">{d.sortFeatured}</option>
            <option value="priceAsc">{d.sortPriceAsc}</option>
            <option value="priceDesc">{d.sortPriceDesc}</option>
            <option value="rating">{d.sortRating}</option>
          </select>
        </label>
      </div>
    </section>
  );
}
