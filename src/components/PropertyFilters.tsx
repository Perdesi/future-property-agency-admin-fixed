import type { Filters } from '../utils/filter';
import { CATEGORIES, PROPERTY_TYPES, STATUSES } from '../data/options';
import type { ReactNode } from 'react';
const F = ({ label, children }: { label: string; children: ReactNode }) => <label className="field"><span>{label}</span>{children}</label>;
interface Props { value: Filters; onChange: (k: string, v: string) => void; onReset: () => void }
export default function PropertyFilters({ value: v, onChange, onReset }: Props) {
  const sel = (k: string, opts: string[], any = 'Any') => (
    <select value={v[k] ?? ''} onChange={e => onChange(k, e.target.value)}><option value="">{any}</option>{opts.map(o => <option key={o}>{o}</option>)}</select>);
  const num = (k: string, ph: string) => <input type="number" min="0" inputMode="numeric" placeholder={ph} value={v[k] ?? ''} onChange={e => onChange(k, e.target.value)} />;
  return (
    <form className="card filters" onSubmit={e => e.preventDefault()} aria-label="Property filters">
      <F label="Search (ID, title, area)"><input type="search" value={v.q ?? ''} onChange={e => onChange('q', e.target.value)} placeholder="e.g. FP-003, Gunjmandi" /></F>
      <F label="Purpose">{sel('purpose', ['Sale', 'Rent'])}</F>
      <F label="Category">{sel('category', CATEGORIES)}</F>
      <F label="Property type">{sel('type', PROPERTY_TYPES)}</F>
      <F label="Location"><input value={v.location ?? ''} onChange={e => onChange('location', e.target.value)} placeholder="City or area" /></F>
      <F label="Min price (PKR)">{num('min', '0')}</F><F label="Max price (PKR)">{num('max', 'No limit')}</F>
      <F label="Min area">{num('minArea', '0')}</F>
      <F label="Bedrooms (min)">{sel('beds', ['1', '2', '3', '4', '5'])}</F><F label="Bathrooms (min)">{sel('baths', ['1', '2', '3', '4'])}</F>
      <F label="Status">{sel('status', STATUSES)}</F>
      <F label="Sort by"><select value={v.sort ?? ''} onChange={e => onChange('sort', e.target.value)}>
        <option value="">Newest</option><option value="oldest">Oldest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="featured">Featured</option><option value="views">Most viewed</option></select></F>
      <button type="button" className="btn ghost" onClick={onReset}>Clear filters</button>
    </form>
  );
}
