import { useState } from 'react';
const fallback = (label: string) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560"><rect width="800" height="560" fill="#cfdcd5"/><path d="M250 380V250l150-90 150 90v130z" fill="#0d4a3a" opacity=".85"/><rect x="365" y="290" width="70" height="90" fill="#cfdcd5"/><text x="400" y="440" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#0d4a3a">${label.replace(/[<&]/g,'')}</text></svg>`)}`;
/** Shows the whole photo (portrait or landscape) over a blurred copy of itself. With `cover`, landscape photos fill the frame and only portrait photos are letterboxed. */
export default function PropImg({ src, alt, label, eager, cover }: { src?: string; alt: string; label: string; eager?: boolean; cover?: boolean }) {
  const [bad, setBad] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const url = !src || bad ? fallback(label) : src;
  const loading = eager ? 'eager' : 'lazy';
  return (
    <span className="fit">
      <img className="fit-bg" src={url} alt="" aria-hidden="true" loading={loading} />
      <img className={`fit-fg${cover && !portrait ? ' cover' : ''}`} src={url} alt={alt} loading={loading}
        onLoad={e => setPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth * 1.05)} onError={() => setBad(true)} />
    </span>
  );
}
