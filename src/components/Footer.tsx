import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useJsonLd } from '../hooks/useSeo';
import { socialLinks } from '../utils/contact';
export default function Footer() {
  const { settings: s } = useApp();
  const links = socialLinks(s);
  useJsonLd('agency-social', links.length ? { '@context': 'https://schema.org', '@type': 'RealEstateAgent', '@id': 'https://futurepropertyagency.com/#agency', name: s.agencyName, url: 'https://futurepropertyagency.com', sameAs: links.map(l => l.url) } : null);
  return (
    <footer className="site-footer"><div className="container fgrid">
      <div><h3>{s.agencyName}</h3><p className="urdu">{s.tagline}</p><p className="small">{s.ceo}</p></div>
      <div><h4>Quick links</h4><ul>{[['/properties', 'Properties'], ['/sale', 'For Sale'], ['/rent', 'For Rent'], ['/commercial', 'Commercial'], ['/investment', 'Investment'], ['/services', 'Services'], ['/about', 'About'], ['/contact', 'Contact']].map(([t, l]) => <li key={t}><Link to={t}>{l}</Link></li>)}</ul></div>
      <div><h4>Contact</h4><p><a href={`tel:${s.phone}`}>{s.phone}</a><br /><a href={`tel:${s.mobile}`}>{s.mobile}</a>{s.email && <><br /><a href={`mailto:${s.email}`}>{s.email}</a></>}</p><p>{s.address}</p><p className="small">{s.officeHours}</p>
        <p className="small">{links.map(l => <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer">{l.name} </a>)}</p></div>
    </div><div className="container small copy">© {s.agencyName}. All rights reserved. · <Link to="/privacy">Privacy Policy</Link> · <Link to="/admin">Admin</Link></div></footer>
  );
}
