import { MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { trackClick } from '../services/storageService';
import { waLink, type WaKind } from '../utils/contact';
import type { Property } from '../types';
export default function WhatsAppButton({ kind = 'general', property, label = 'WhatsApp', className = 'btn wa' }:
  { kind?: WaKind; property?: Pick<Property, 'id' | 'title' | 'contactWhatsApp'>; label?: string; className?: string }) {
  const { settings } = useApp();
  return (
    <a className={className} href={waLink(settings, kind, property, property?.contactWhatsApp)} target="_blank" rel="noopener noreferrer"
      onClick={() => trackClick('whatsappClicks')} aria-label={`${label} on WhatsApp`}><MessageCircle size={16} />{label}</a>
  );
}
