import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
export default function Footer() {
  const { settings: s } = useApp();
  return (
    <footer className="site-footer"><div className="container fgrid">
      <div><h3>{s.agencyName}</h3><p className="urdu">{s.tagline}</p><p className="small">{s.ceo}</p></div>
      <div><h4>Quick links</h4><ul>{[['/properties', 'Properties'], ['/sale', 'For Sale'], ['/rent', 'For Rent'], ['/commercial', 'Commercial'], ['/investment', 'Investment'], ['/services', 'Services'], ['/about', 'About'], ['/contact', 'Contact']].map(([t, l]) => <li key={t}><Link to={t}>{l}</Link></li>)}</ul></div>
      <div><h4>Contact</h4><p><a href={`tel:${s.phone}`}>{s.phone}</a><br /><a href={`tel:${s.mobile}`}>{s.mobile}</a></p><p>{s.address}</p><p className="small">{s.officeHours}</p>
        <p className="small">{([['Facebook', s.facebook], ['Instagram', s.instagram], ['YouTube', s.youtube], ['TikTok', s.tiktok]] as const).filter(x => x[1]).map(x => <a key={x[0]} href={x[1]} target="_blank" rel="noopener noreferrer">{x[0]} </a>)}</p></div>
    </div><div className="container small copy">© {s.agencyName}. All rights reserved. · <Link to="/admin">Admin</Link></div></footer>
  );
}
