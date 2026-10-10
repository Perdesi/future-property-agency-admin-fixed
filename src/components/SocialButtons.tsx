import type { CSSProperties, ReactNode } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import type { Settings } from '../types';
import { socialUrl } from '../utils/contact';

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
  </svg>
);

/** Round social buttons. A button is clickable only when its link is filled in (Admin > Settings > Social media); the others stay greyed out. */
export default function SocialButtons({ s }: { s: Settings }) {
  const items: { name: string; url: string; bg: string; icon: ReactNode }[] = [
    { name: 'Facebook', url: s.facebook, bg: '#1877f2', icon: <Facebook size={20} /> },
    { name: 'Instagram', url: s.instagram, bg: 'linear-gradient(45deg,#f09433,#dc2743 55%,#bc1888)', icon: <Instagram size={20} /> },
    { name: 'YouTube', url: s.youtube, bg: '#e00000', icon: <Youtube size={20} /> },
    { name: 'TikTok', url: s.tiktok, bg: '#111', icon: <TikTokIcon /> },
  ];
  return (
    <div className="social-row">
      {items.map(it => {
        const link = it.url && it.url.trim() ? socialUrl(it.url) : '';
        return link
          ? <a key={it.name} className="soc on" style={{ '--c': it.bg } as CSSProperties} href={link} target="_blank" rel="noopener noreferrer" aria-label={`Follow us on ${it.name}`} title={it.name}>{it.icon}</a>
          : <span key={it.name} className="soc off" role="img" aria-disabled="true" aria-label={`${it.name}: link not added yet`} title={`${it.name}: coming soon`}>{it.icon}</span>;
      })}
    </div>
  );
}
