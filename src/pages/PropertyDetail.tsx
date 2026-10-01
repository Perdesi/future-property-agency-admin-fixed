import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, Printer, Share2 } from 'lucide-react';
import { getProperties, getProperty, trackPropertyView } from '../services/storageService';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/contact';
import PropertyGallery from '../components/PropertyGallery';
import InquiryForm from '../components/InquiryForm';
import FavoriteButton from '../components/FavoriteButton';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';
import PropertyGrid from '../components/PropertyGrid';
import EmptyState from '../components/EmptyState';
import { useSeo } from '../hooks/useSeo';
export default function PropertyDetail() {
  const { id = '' } = useParams();
  const { settings: s, notify } = useApp();
  const p = useMemo(() => getProperty(id), [id]);
  useSeo(p?.title ?? 'Property not found', p?.shortDescription);
  useEffect(() => { if (p) trackPropertyView(p.id); }, [p?.id]); // eslint-disable-line
  if (!p) return <div className="container"><EmptyState title="Property not found" text="This listing may have been removed." action={<Link className="btn primary" to="/properties">Browse properties</Link>} /></div>;
  const similar = getProperties().filter(x => x.id !== p.id && (x.propertyType === p.propertyType || x.area === p.area)).slice(0, 3);
  const share = async () => {
    const url = window.location.href;
    try { if (navigator.share) await navigator.share({ title: p.title, url }); else { await navigator.clipboard.writeText(url); notify('Link copied'); } } catch { /* cancelled */ }
  };
  const facts: [string, string | number][] = [['Property ID', p.id], ['Purpose', p.transactionType], ['Type', p.propertyType], ['Area', `${p.size} ${p.sizeUnit}`], ['Bedrooms', p.bedrooms || '—'], ['Bathrooms', p.bathrooms || '—'], ['Floors', p.floors], ['Parking', p.parking || '—'], ['Facing', p.facing || '—'], ['Construction', p.constructionStatus || '—'], ['Possession', p.possession || '—'], ['Status', p.status]];
  return (
    <div className="container detail">
      <div><PropertyGallery p={p} />
        <div className="card pad"><div className="row between"><div><h1>{p.title}</h1><div className="muted"><MapPin size={14} /> {p.address}</div></div><div className="price big">{formatPrice(p.price, p.priceUnit)}</div></div>
          {p.isDemo && <p className="notice">SAMPLE / DEMO listing — not a real available property.</p>}
          <div className="row"><FavoriteButton id={p.id} /><button className="btn ghost" onClick={share}><Share2 size={16} />Share</button><button className="btn ghost" onClick={() => window.print()}><Printer size={16} />Print</button></div>
          <dl className="facts-grid">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <h2>Description</h2><p>{p.description}</p>
          {p.features.length > 0 && <><h2>Features</h2><ul className="chips">{p.features.map(f => <li key={f}>{f}</li>)}</ul></>}
          <p className="row">{p.videoUrl && <a className="btn ghost" href={p.videoUrl} target="_blank" rel="noopener noreferrer">Watch video</a>}{p.virtualTourUrl && <a className="btn ghost" href={p.virtualTourUrl} target="_blank" rel="noopener noreferrer">Virtual tour</a>}
            <a className="btn ghost" target="_blank" rel="noopener noreferrer" href={p.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address)}`}>View on map</a></p></div></div>
      <aside><div className="card pad"><h3>Contact {p.contactName || s.agencyName}</h3><p className="muted small">{s.ceo}</p><div className="row"><WhatsAppButton kind="property" property={p} /><CallButton number={p.contactPhone} className="btn primary" /></div></div>
        <InquiryForm property={p} /></aside>
      {similar.length > 0 && <section className="wide"><h2>Similar properties</h2><PropertyGrid items={similar} /></section>}
    </div>
  );
}
