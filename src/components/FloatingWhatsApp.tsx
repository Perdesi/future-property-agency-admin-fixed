import { useApp } from '../context/AppContext';
import { trackClick } from '../services/storageService';
import { waLink } from '../utils/contact';
export default function FloatingWhatsApp() {
  const { settings } = useApp();
  return (
    <a className="fab-wa" href={waLink(settings, 'general')} target="_blank" rel="noopener noreferrer"
      onClick={() => trackClick('whatsappClicks')} aria-label="Chat with us on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11 19.8L3 29l6.4-2A13 13 0 1 0 16 3Zm0 2.4a10.6 10.6 0 1 1-5.6 19.6l-.4-.2-3.8 1.2 1.2-3.7-.3-.4A10.6 10.6 0 0 1 16 5.4Zm-4 5.3c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.4 3.6 1.5 3.8c.2.2 2.600 4.100 6.400 5.600 3.200 1.200 3.800 1 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.3-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.6-.2-.8.2-.2.300-.9 1.100-1.100 1.300-.2.200-.4.200-.7.100-.4-.2-1.500-.6-2.800-1.700-1-.9-1.700-2-1.900-2.400-.2-.4 0-.6.200-.8l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.400c-.3-.6-.5-.5-.8-.5Z" /></svg>
    </a>
  );
}
