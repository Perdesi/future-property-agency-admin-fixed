import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
export default function PublicLayout() {
  return <><a href="#main" className="skip">Skip to content</a><Header /><main id="main"><Outlet /></main><Footer /><FloatingWhatsApp /></>;
}
