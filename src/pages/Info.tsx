import { Link } from 'react-router-dom';
import { phoneList, safeUrl, telLink } from '../utils/contact';
import SocialButtons from '../components/SocialButtons';
import { Home, Key, Building, Store, TrendingUp, Megaphone, Search, Handshake, MapPin, Phone, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSeo } from '../hooks/useSeo';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';
import InquiryForm from '../components/InquiryForm';
import PropertyGrid from '../components/PropertyGrid';
import { getProperties } from '../services/storageService';

const SERVICES = [[Handshake, 'Property Buying', 'Help finding, checking and buying the right property.'], [Home, 'Property Selling', 'Listing, promotion and buyer coordination for your property.'], [Key, 'Property Rental', 'Rental listings and tenant matching for homes and shops.'], [Store, 'Commercial Property', 'Shops, offices, plazas, plots and buildings.'], [Building, 'Residential Property', 'Houses, flats and residential plots.'], [TrendingUp, 'Property Investment Guidance', 'Guidance based on location, budget and objectives.'], [Megaphone, 'Property Marketing', 'Wider visibility for your listing.'], [Search, 'Property Search Assistance', 'Tell us what you need; we search on your behalf.']] as const;
export function Services() {
  useSeo('Services', 'Property buying, selling, rental, commercial, residential and investment guidance in Rawalpindi.');
  return <div className="container section"><h1>Our services</h1><div className="pgrid">{SERVICES.map(([I, t, d]) => <div className="card pad" key={t}><I /><h3>{t}</h3><p className="muted">{d}</p><Link className="btn ghost" to="/contact">Enquire</Link></div>)}</div></div>;
}
export function About() {
  const { settings: s } = useApp();
  useSeo('About', `About ${s.agencyName}`);
  return <div className="container section prose"><h1>About {s.agencyName}</h1><p className="urdu">{s.tagline}</p>
    <p>{s.agencyName} is a property agency in Gunjmandi, Rawalpindi, helping people buy, sell and rent residential and commercial property, and think through investment options.</p>
    <h2>What we do</h2><p>We assist with buying and selling, rentals, commercial property, residential property and investment guidance, with clear communication at each step.</p>
    <h2>Leadership</h2><p>{s.ceo}</p><h2>Visit us</h2><p><MapPin size={14} /> {s.address}<br /><Phone size={14} /> {phoneList(s).join(' · ')}</p><div className="row"><CallButton className="btn primary" /><WhatsAppButton /></div></div>;
}
export function Investment() {
  useSeo('Investment', 'Property investment guidance in Rawalpindi.');
  const items = getProperties().filter(p => p.features.includes('Rental Income') || p.category !== 'Residential').slice(0, 6);
  return <><section className="pagehead"><div className="container"><h1>Invest in Property with Confidence</h1>
    <p className="muted">We help clients identify property opportunities based on location, budget and investment objectives. Property values and rental income can rise or fall, and we do not guarantee profit or returns.</p></div></section>
    <div className="container section"><div className="pgrid">{[['Commercial investment', 'Shops, offices and buildings in busy commercial areas.'], ['Rental investment', 'Properties that can be let out for regular rent.'], ['Plot investment', 'Residential and commercial plots, with document checks.'], ['Buying guidance', 'Budget, location and paperwork explained before you commit.']].map(([t, d]) => <div className="card pad" key={t}><h3>{t}</h3><p className="muted">{d}</p></div>)}</div>
      <h2>Opportunities</h2><PropertyGrid items={items} />
      <div className="card pad cta row between"><span>Behtareen investment ke liye Future Property Agency se rabta kijiye.</span><WhatsAppButton kind="investment" label="WhatsApp us" /></div></div></>;
}
export function Contact() {
  const { settings: s } = useApp();
  useSeo('Contact', `Contact ${s.agencyName}`);
  return <div className="container section"><h1>Contact us</h1><div className="detail"><div className="card pad"><h3>{s.agencyName}</h3>
    <p><MapPin size={14} /> {s.address}</p><p><Phone size={14} /> {phoneList(s).map((n, i) => <span key={n}>{i > 0 && <br />}<a href={telLink(n)}>{n}</a></span>)}</p>{s.email && <p><Mail size={14} /> <a href={`mailto:${s.email}`}>{s.email}</a></p>}<div className="follow"><strong>Follow us</strong><SocialButtons s={s} /></div><p>{s.ceo}</p><p className="muted">{s.officeHours}</p>
    <div className="row"><CallButton className="btn primary" label="Call now" /><WhatsAppButton /><a className="btn ghost" target="_blank" rel="noopener noreferrer" href={safeUrl(s.mapUrl)}>Get directions</a></div></div>
    <InquiryForm withSubject /></div></div>;
}
export function Privacy() {
  const { settings: s } = useApp();
  useSeo('Privacy Policy', `Privacy policy of ${s.agencyName}`);
  return <div className="container section"><h1>Privacy Policy</h1><div className="card pad">
    <p className="muted">Last updated: October 2026</p>
    <h3>Information we collect</h3>
    <p>When you send an inquiry through our contact or property forms, we collect the details you type in (name, phone number, email address and message). We use them only to reply to you about properties and our services. We do not sell your personal information.</p>
    <h3>Cookies and advertising</h3>
    <p>This website may display ads served by Google AdSense. Google and its partners use cookies to show ads based on your previous visits to this and other websites. You can opt out of personalised advertising at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a>. Your saved favourites and theme choice are kept in your own browser.</p>
    <h3>Third-party links</h3>
    <p>Our pages may link to WhatsApp, maps or social media. Those services have their own privacy policies and we are not responsible for them.</p>
    <h3>Contact us</h3>
    <p>For any privacy question, contact {s.agencyName}{s.email ? ` at ${s.email}` : ''}{s.mobile ? ` or ${s.mobile}` : ''}.</p>
  </div></div>;
}
export function NotFound() {
  useSeo('Page not found');
  return <div className="container section" style={{ textAlign: 'center' }}><h1>404 — Page not found</h1><p className="muted">The page you are looking for does not exist.</p><Link className="btn primary" to="/">Go home</Link></div>;
}
