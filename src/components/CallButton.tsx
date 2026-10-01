import { Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { trackClick } from '../services/storageService';
import { telLink } from '../utils/contact';
export default function CallButton({ number, label = 'Call', className = 'btn ghost' }: { number?: string; label?: string; className?: string }) {
  const { settings } = useApp();
  const n = number || settings.phone;
  return <a className={className} href={telLink(n)} onClick={() => trackClick('callClicks')} aria-label={`Call ${n}`}><Phone size={16} />{label}</a>;
}
