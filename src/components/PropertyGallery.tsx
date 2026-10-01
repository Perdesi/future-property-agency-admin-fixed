import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { Property } from '../types';
import PropImg from './PropImg';
import Modal from './Modal';
export default function PropertyGallery({ p }: { p: Property }) {
  const imgs = p.images.length ? p.images : [''];
  const [i, setI] = useState(0); const [full, setFull] = useState(false);
  const go = (d: number) => setI(x => (x + d + imgs.length) % imgs.length);
  const main = <PropImg src={imgs[i]} alt={`${p.title} — photo ${i + 1}`} label={p.propertyType} />;
  return (
    <div className="gallery">
      <div className="gmain">{main}
        {imgs.length > 1 && <><button className="icon-btn gprev" onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft /></button>
          <button className="icon-btn gnext" onClick={() => go(1)} aria-label="Next image"><ChevronRight /></button></>}
        <button className="icon-btn gfull" onClick={() => setFull(true)} aria-label="Open fullscreen"><Maximize2 size={16} /></button>
        <span className="gcount">{i + 1} / {imgs.length}</span></div>
      {imgs.length > 1 && <div className="thumbs">{imgs.map((s, n) => <button key={n} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`}><PropImg src={s} alt="" label="" /></button>)}</div>}
      <Modal open={full} title={p.title} onClose={() => setFull(false)}><div className="gfullimg">{main}</div>
        <div className="row end"><button className="btn ghost" onClick={() => go(-1)}>Previous</button><button className="btn ghost" onClick={() => go(1)}>Next</button></div></Modal>
    </div>
  );
}
