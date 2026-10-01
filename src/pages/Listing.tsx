import { Link, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { getProperties } from '../services/storageService';
import { applyFilters, type Filters } from '../utils/filter';
import PropertyFilters from '../components/PropertyFilters';
import PropertyGrid from '../components/PropertyGrid';
import { useSeo } from '../hooks/useSeo';
import type { Property } from '../types';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Listing({ title, intro, base }: { title: string; intro: string; base?: (p: Property) => boolean }) {
  useSeo(title, intro);
  const [sp, setSp] = useSearchParams();
  const f: Filters = Object.fromEntries(sp.entries());
  const all = useMemo(() => getProperties().filter(base ?? (() => true)), [base]);
  const items = applyFilters(all, f);
  const change = (k: string, v: string) => setSp(prev => { const n = new URLSearchParams(prev); v ? n.set(k, v) : n.delete(k); return n; }, { replace: true });
  const list = f.view === 'list';
  return (
    <>
      <section className="pagehead"><div className="container"><h1>{title}</h1><p className="muted">{intro}</p></div></section>
      <div className="container listing">
        <PropertyFilters value={f} onChange={change} onReset={() => setSp({}, { replace: true })} />
        <div>
          <div className="row between"><strong>{items.length} {items.length === 1 ? 'property' : 'properties'}</strong>
            <div className="row"><button className={`icon-btn ${!list ? 'sel' : ''}`} onClick={() => change('view', '')} aria-label="Grid view" aria-pressed={!list}><LayoutGrid size={16} /></button>
              <button className={`icon-btn ${list ? 'sel' : ''}`} onClick={() => change('view', 'list')} aria-label="List view" aria-pressed={list}><List size={16} /></button></div></div>
          <PropertyGrid items={items} list={list} />
          <div className="card pad cta row between"><span>Can't find what you need? Tell us your budget and location.</span>
            <span className="row"><WhatsAppButton /><Link className="btn ghost" to="/contact">Contact us</Link></span></div>
        </div>
      </div>
    </>
  );
}
