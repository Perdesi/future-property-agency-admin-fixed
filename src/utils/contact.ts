import type { Property, Settings } from '../types';

/** Convert a Pakistani local number (03xx / 051) to international digits for wa.me. */
export function toWaNumber(n: string): string {
  const d = n.replace(/\D/g, '');
  return d.startsWith('92') ? d : d.startsWith('0') ? `92${d.slice(1)}` : d;
}
export type WaKind = 'general' | 'property' | 'investment';
export function waMessage(kind: WaKind, p?: Pick<Property, 'id' | 'title'>): string {
  if (kind === 'property' && p) return `Assalam-o-Alaikum, mujhe Property ID ${p.id} (${p.title}) ke bare mein maloomat chahiye.`;
  if (kind === 'investment') return 'Assalam-o-Alaikum, mujhe property investment ke bare mein maloomat chahiye.';
  return 'Assalam-o-Alaikum, mujhe Future Property Agency se property ke bare mein maloomat chahiye.';
}
export const waLink = (s: Settings, kind: WaKind, p?: Pick<Property, 'id' | 'title'>, number?: string): string =>
  `https://wa.me/${toWaNumber(number || s.whatsapp)}?text=${encodeURIComponent(waMessage(kind, p))}`;
export const telLink = (n: string): string => `tel:+${toWaNumber(n)}`;

export const formatPrice = (price: number, unit: string): string => {
  const v = price >= 10_000_000 ? `${+(price / 10_000_000).toFixed(2)} Crore`
    : price >= 100_000 ? `${+(price / 100_000).toFixed(2)} Lakh` : price.toLocaleString('en-PK');
  return `${unit.startsWith('PKR') ? 'PKR' : ''} ${v}${unit.includes('/') ? ' ' + unit.slice(unit.indexOf('/')) : ''}`.trim();
};

/** Accepts "facebook.com/page" or a full link and always returns a working https:// link. */
export const socialUrl = (u: string): string => (/^https?:\/\//i.test(u.trim()) ? u.trim() : `https://${u.trim().replace(/^\/+/, '')}`);
export const socialLinks = (s: Settings): { name: string; url: string }[] =>
  ([['Facebook', s.facebook], ['Instagram', s.instagram], ['YouTube', s.youtube], ['TikTok', s.tiktok]] as const)
    .filter(x => x[1] && x[1].trim()).map(x => ({ name: x[0], url: socialUrl(x[1]) }));

/** Only allows normal web links (blocks "javascript:" and similar). Returns undefined for anything else. */
export const safeUrl = (u?: string): string | undefined => {
  try { const x = new URL((u ?? '').trim()); return x.protocol === 'http:' || x.protocol === 'https:' ? x.href : undefined; } catch { return undefined; }
};

/** The phone numbers that are actually filled in, without repeats. */
export const phoneList = (s: Settings): string[] => Array.from(new Set([s.phone, s.mobile].map(x => (x ?? '').trim()).filter(Boolean)));
