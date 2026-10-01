import type { Property } from '../types';
import PropertyCard from './PropertyCard';
import EmptyState from './EmptyState';
export default function PropertyGrid({ items, list, empty }: { items: Property[]; list?: boolean; empty?: string }) {
  if (!items.length) return <EmptyState title="No properties found" text={empty ?? 'Try changing or clearing your filters.'} />;
  return <div className={list ? 'plist' : 'pgrid'}>{items.map(p => <PropertyCard key={p.id} p={p} list={list} />)}</div>;
}
