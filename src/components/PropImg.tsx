import { useState } from 'react';
const fallback = (label: string) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560"><rect width="800" height="560" fill="#cfdcd5"/><path d="M250 380V250l150-90 150 90v130z" fill="#0d4a3a" opacity=".85"/><rect x="365" y="290" width="70" height="90" fill="#cfdcd5"/><text x="400" y="440" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#0d4a3a">${label.replace(/[<&]/g,'')}</text></svg>`)}`;
export default function PropImg({ src, alt, label }: { src?: string; alt: string; label: string }) {
  const [bad, setBad] = useState(false);
  return <img src={!src || bad ? fallback(label) : src} alt={alt} loading="lazy" onError={() => setBad(true)} />;
}
