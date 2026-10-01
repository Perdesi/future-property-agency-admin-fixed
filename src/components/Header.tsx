import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Moon, Sun, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import WhatsAppButton from './WhatsAppButton';
import CallButton from './CallButton';
const NAV: [string, string][] = [['/', 'Home'], ['/properties', 'Properties'], ['/sale', 'For Sale'], ['/rent', 'For Rent'], ['/commercial', 'Commercial'], ['/residential', 'Residential'], ['/investment', 'Investment'], ['/services', 'Services'], ['/about', 'About'], ['/contact', 'Contact']];
export default function Header() {
  const { settings, favorites, theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="site-header">
      <div className="container bar">
        <Link to="/" className="brand" aria-label={`${settings.agencyName} home`}>
          {settings.logo ? <img className="brand-logo" src={settings.logo} alt={settings.agencyName} /> : <span>{settings.agencyName}</span>}</Link>
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Main">
          {NAV.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'}>{l}</NavLink>)}
          <div className="navcta"><WhatsAppButton /><CallButton className="btn primary" /></div></nav>
        <div className="row tools">
          <Link to="/favorites" className="icon-btn favlink" aria-label={`Favorites (${favorites.length})`}><Heart size={18} />{favorites.length > 0 && <b>{favorites.length}</b>}</Link>
          <button className="icon-btn" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          <span className="dsk"><WhatsAppButton label="" className="icon-btn wa" /></span>
          <button className="icon-btn burger" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Toggle menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
    </header>
  );
}
