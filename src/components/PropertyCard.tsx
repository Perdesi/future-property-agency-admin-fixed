import { Link } from 'react-router-dom';
import { BedDouble, Bath, Ruler, MapPin } from 'lucide-react';
import type { Property } from '../types';
import { formatPrice } from '../utils/contact';
import FavoriteButton from './FavoriteButton';
import WhatsAppButton from './WhatsAppButton';
import CallButton from './CallButton';
import PropImg from './PropImg';
export default function PropertyCard({ p, list }: { p: Property; list?: boolean }) {
  return (
    <article className={`card pcard ${list ? 'list' : ''}`}>
      <Link to={`/property/${p.id}`} className="pimg" aria-label={`View ${p.title}`}>
        <PropImg src={p.images[0]} alt={`${p.propertyType} in ${p.area}, ${p.city}`} label={p.propertyType} />
        <span className="badges">{p.featured && <b className="badge gold">Featured</b>}<b className="badge">{p.transactionType === 'Sale' ? 'For Sale' : 'For Rent'}</b>
          {p.status !== 'Available' && <b className={`badge st-${p.status.toLowerCase()}`}>{p.status}</b>}</span>
        {p.isDemo && <span className="demo">Sample</span>}
      </Link>
      <div className="pbody">
        <div className="muted small">{p.propertyType} · {p.id}</div>
        <h3><Link to={`/property/${p.id}`}>{p.title}</Link></h3>
        <div className="muted small"><MapPin size={14} /> {p.area}, {p.city}</div>
        <div className="price">{formatPrice(p.price, p.priceUnit)}</div>
        <div className="facts small"><span><Ruler size={14} /> {p.size} {p.sizeUnit}</span>
          {p.bedrooms > 0 && <span><BedDouble size={14} /> {p.bedrooms}</span>}{p.bathrooms > 0 && <span><Bath size={14} /> {p.bathrooms}</span>}</div>
        <p className="small muted clamp">{p.shortDescription}</p>
        <div className="row"><Link className="btn primary" to={`/property/${p.id}`}>View Details</Link>
          <WhatsAppButton kind="property" property={p} label="" className="icon-btn wa" /><CallButton number={p.contactPhone} label="" className="icon-btn" /><FavoriteButton id={p.id} /></div>
      </div>
    </article>
  );
}
