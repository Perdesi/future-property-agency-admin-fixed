import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, KeyRound, Landmark, ShieldCheck, Handshake, MapPinned } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getProperties } from '../services/storageService';
import PropertyGrid from '../components/PropertyGrid';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';
import { PROPERTY_TYPES } from '../data/options';
import { useSeo } from '../hooks/useSeo';
import type { Property } from '../types';

function Row({ title, to, items }: { title: string; to: string; items: Property[] }) {
  if (!items.length) return null;
  return <section className="section"><div className="container"><div className="row between"><h2>{title}</h2><Link className="btn ghost" to={to}>View all</Link></div><PropertyGrid items={items.slice(0, 3)} /></div></section>;
}
export default function Home() {
  useSeo();
  const { settings: s } = useApp();
  const nav = useNavigate();
  const [q, setQ] = useState({ purpose: 'Sale', type: '', location: '', min: '', max: '', beds: '' });
  const all = getProperties();
  const submit = (e: FormEvent) => { e.preventDefault(); const p = new URLSearchParams(); Object.entries(q).forEach(([k, v]) => v && p.set(k, v)); nav(`/properties?${p}`); };
  const up = (k: keyof typeof q) => (e: { target: { value: string } }) => setQ(x => ({ ...x, [k]: e.target.value }));
  return (
    <>
      <section className="hero"><div className="container">
        <h1>{s.heroHeading}</h1><p>{s.heroDescription}</p>
        <div className="row"><Link className="btn brass" to="/properties">View Properties</Link><Link className="btn light" to="/contact">Contact Us</Link></div>
        <form className="card searchbar" onSubmit={submit} aria-label="Property search">
          <label className="field"><span>Purpose</span><select value={q.purpose} onChange={up('purpose')}><option value="Sale">Buy</option><option value="Rent">Rent</option></select></label>
          <label className="field"><span>Type</span><select value={q.type} onChange={up('type')}><option value="">Any</option>{PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}</select></label>
          <label className="field"><span>Location</span><input value={q.location} onChange={up('location')} placeholder="Area or city" /></label>
          <label className="field"><span>Min price</span><input type="number" min="0" value={q.min} onChange={up('min')} /></label>
          <label className="field"><span>Max price</span><input type="number" min="0" value={q.max} onChange={up('max')} /></label>
          <label className="field"><span>Bedrooms</span><select value={q.beds} onChange={up('beds')}><option value="">Any</option>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+</option>)}</select></label>
          <button className="btn primary" type="submit">Search</button></form>
      </div></section>
      <Row title="Featured properties" to="/properties?sort=featured" items={all.filter(p => p.featured)} />
      <Row title="Properties for sale" to="/sale" items={all.filter(p => p.transactionType === 'Sale')} />
      <Row title="Properties for rent" to="/rent" items={all.filter(p => p.transactionType === 'Rent')} />
      <Row title="Commercial properties" to="/commercial" items={all.filter(p => p.category === 'Commercial')} />
      <Row title="Residential properties" to="/residential" items={all.filter(p => p.category === 'Residential')} />
      <section className="section alt"><div className="container"><h2>Why choose {s.agencyName}</h2><div className="pgrid">
        {[[MapPinned, 'Local market knowledge', 'Based in Gunjmandi, Rawalpindi, we know the areas we work in.'], [ShieldCheck, 'Clear dealing', 'Straightforward guidance from viewing to paperwork.'], [Handshake, 'Buying, selling and renting', 'One office for residential, commercial and land.']].map(([I, t, d]) => { const Icon = I as typeof Building2; return <div className="card pad" key={t as string}><Icon /><h3>{t as string}</h3><p className="muted">{d as string}</p></div>; })}</div>
        <div className="row"><Link className="btn ghost" to="/services"><KeyRound size={16} />Our services</Link><Link className="btn ghost" to="/investment"><Landmark size={16} />Investment guidance</Link><Link className="btn ghost" to="/about"><Building2 size={16} />About us</Link></div></div></section>
      <section className="section"><div className="container card pad cta row between"><div><h2>Talk to us about your next property</h2><p className="muted">{s.address}<br />{s.officeHours}</p></div><div className="row"><WhatsAppButton /><CallButton className="btn primary" /><Link className="btn ghost" to="/contact">Contact page</Link></div></div></section>
    </>
  );
}
