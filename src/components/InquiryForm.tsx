import { useState, type FormEvent } from 'react';
import { useApp } from '../context/AppContext';
import { submitInquiry } from '../services/storageService';
import type { Property } from '../types';
export default function InquiryForm({ property, withSubject }: { property?: Property; withSubject?: boolean }) {
  const { notify } = useApp();
  const blank = { name: '', phone: '', email: '', subject: '', message: '' };
  const [f, setF] = useState(blank);
  const [err, setErr] = useState<Record<string, string>>({});
  const set = (k: keyof typeof blank) => (e: { target: { value: string } }) => setF(s => ({ ...s, [k]: e.target.value }));
  const [sending, setSending] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = 'Enter your name.';
    if (!/^[+\d][\d\s-]{8,15}$/.test(f.phone.trim())) er.phone = 'Enter a valid phone number.';
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Enter a valid email address.';
    if (f.message.trim().length < 5) er.message = 'Write a short message.';
    setErr(er);
    if (Object.keys(er).length) return notify('Please fix the highlighted fields.', 'error');
    setSending(true);
    try {
      await submitInquiry({ name: f.name.trim(), phone: f.phone.trim(), whatsapp: f.phone.trim(), email: f.email.trim(),
        propertyId: property?.id ?? '', propertyTitle: property?.title ?? '', message: f.subject ? `[${f.subject}] ${f.message.trim()}` : f.message.trim() });
      notify('Inquiry sent. We will contact you soon.'); setF(blank);
    } catch { notify('Could not send your inquiry. Please call or WhatsApp us instead.', 'error'); }
    setSending(false);
  }
  const L = (k: keyof typeof blank, label: string, type = 'text') => (
    <label className="field"><span>{label}</span><input type={type} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} />{err[k] && <em className="err">{err[k]}</em>}</label>);
  return (
    <form className="card pad form" onSubmit={submit} noValidate>
      <h3>{property ? 'Ask about this property' : 'Send us a message'}</h3>
      {property && <p className="muted small">{property.id} · {property.title}</p>}
      {L('name', 'Name')}{L('phone', 'Phone', 'tel')}{L('email', 'Email (optional)', 'email')}{withSubject && L('subject', 'Subject')}
      <label className="field"><span>Message</span><textarea rows={4} value={f.message} onChange={set('message')} aria-invalid={!!err.message} />{err.message && <em className="err">{err.message}</em>}</label>
      <button className="btn primary" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send inquiry'}</button>
    </form>
  );
}
