import type { Property } from '../types';
export type Filters = Record<string, string>;
export function applyFilters(list: Property[], f: Filters): Property[] {
  const q = (f.q ?? '').trim().toLowerCase();
  const loc = (f.location ?? '').trim().toLowerCase();
  const r = list.filter(p => {
    if (q && ![p.id, p.title, p.city, p.area, p.locality, p.address].join(' ').toLowerCase().includes(q)) return false;
    if (loc && ![p.city, p.area, p.locality].join(' ').toLowerCase().includes(loc)) return false;
    if (f.purpose && p.transactionType !== f.purpose) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.type && p.propertyType !== f.type) return false;
    if (f.status && p.status !== f.status) return false;
    if (f.min && p.price < Number(f.min)) return false;
    if (f.max && p.price > Number(f.max)) return false;
    if (f.minArea && p.size < Number(f.minArea)) return false;
    if (f.beds && p.bedrooms < Number(f.beds)) return false;
    if (f.baths && p.bathrooms < Number(f.baths)) return false;
    return true;
  });
  const by: Record<string, (a: Property, b: Property) => number> = {
    low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price,
    featured: (a, b) => Number(b.featured) - Number(a.featured), views: (a, b) => b.views - a.views,
    oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
  };
  return [...r].sort(by[f.sort ?? ''] ?? ((a, b) => b.createdAt.localeCompare(a.createdAt)));
}
