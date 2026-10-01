/**
 * Single persistence layer. UI code imports ONLY from here.
 * To move to Supabase/Firebase/REST, reimplement these functions (make them async then)
 * — no component touches localStorage directly.
 */
import type { Admin, Analytics, BackupFile, Inquiry, Property, Settings, Theme } from '../types';
import { buildDemoProperties, defaultAdmin, defaultAnalytics, defaultSettings } from '../data/defaults';

export const STORAGE_VERSION = 1;
export const KEYS = {
  properties: 'future_property_properties', inquiries: 'future_property_inquiries',
  favorites: 'future_property_favorites', settings: 'future_property_settings',
  admin: 'future_property_admin', analytics: 'future_property_analytics',
  theme: 'future_property_theme', version: 'future_property_storage_version',
} as const;

function read<T>(key: string, fallback: T, valid: (v: unknown) => boolean): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return valid(parsed) ? (parsed as T) : fallback;
  } catch { return fallback; }
}
function write(key: string, value: unknown): boolean {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}
const isArr = (v: unknown) => Array.isArray(v);
const isObj = (v: unknown) => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Runs on app start. Creates missing/corrupted data, NEVER overwrites existing valid data. */
export function initStorage(): void {
  const ok = (k: string, valid: (v: unknown) => boolean) => read<unknown>(k, undefined, valid) !== undefined;
  const storedVersion = read<number>(KEYS.version, 0, v => typeof v === 'number');
  if (!ok(KEYS.properties, isArr)) write(KEYS.properties, buildDemoProperties());
  if (!ok(KEYS.inquiries, isArr)) write(KEYS.inquiries, []);
  if (!ok(KEYS.favorites, isArr)) write(KEYS.favorites, []);
  if (!ok(KEYS.settings, isObj)) write(KEYS.settings, defaultSettings);
  if (!ok(KEYS.analytics, isObj)) write(KEYS.analytics, defaultAnalytics);
  if (!ok(KEYS.admin, isObj)) write(KEYS.admin, defaultAdmin);
  if (!ok(KEYS.theme, v => v === 'light' || v === 'dark')) write(KEYS.theme, 'light');
  if (storedVersion < STORAGE_VERSION) migrate(storedVersion);
}
function migrate(_from: number): void { /* add per-version schema migrations here */ write(KEYS.version, STORAGE_VERSION); }

// Properties
export const getProperties = (): Property[] => read<Property[]>(KEYS.properties, [], isArr);
export const getProperty = (idOrSlug: string): Property | undefined =>
  getProperties().find(p => p.id === idOrSlug || p.slug === idOrSlug);
export function nextPropertyId(): string {
  const nums = getProperties().map(p => parseInt(p.id.replace(/\D/g, ''), 10)).filter(n => !isNaN(n));
  return `FP-${String((nums.length ? Math.max(...nums) : 0) + 1).padStart(3, '0')}`;
}
export function createProperty(data: Omit<Property, 'createdAt'|'updatedAt'|'views'>): Property {
  const all = getProperties();
  if (all.some(p => p.id.toLowerCase() === data.id.toLowerCase())) throw new Error(`Property ID ${data.id} already exists.`);
  const ts = new Date().toISOString();
  const created: Property = { ...data, createdAt: ts, updatedAt: ts, views: 0 };
  write(KEYS.properties, [created, ...all]);
  return created;
}
export function updateProperty(id: string, patch: Partial<Property>): Property | undefined {
  let updated: Property | undefined;
  const next = getProperties().map(p => p.id === id ? (updated = { ...p, ...patch, id: p.id, updatedAt: new Date().toISOString() }) : p);
  write(KEYS.properties, next);
  return updated;
}
export const deleteProperty = (id: string): void => { write(KEYS.properties, getProperties().filter(p => p.id !== id)); };

// Inquiries
export const getInquiries = (): Inquiry[] => read<Inquiry[]>(KEYS.inquiries, [], isArr);
export function createInquiry(data: Pick<Inquiry,'name'|'phone'|'whatsapp'|'email'|'propertyId'|'propertyTitle'|'message'>): Inquiry {
  const all = getInquiries();
  const inq: Inquiry = { ...data, id: `INQ-${String(all.length + 1).padStart(4,'0')}-${Date.now().toString(36).toUpperCase()}`, status:'New', read:false, createdAt:new Date().toISOString() };
  write(KEYS.inquiries, [inq, ...all]);
  const a = getAnalytics(); write(KEYS.analytics, { ...a, inquiries: a.inquiries + 1 });
  return inq;
}
export function updateInquiry(id: string, patch: Partial<Inquiry>): void { write(KEYS.inquiries, getInquiries().map(i => i.id === id ? { ...i, ...patch, id: i.id } : i)); }
export const deleteInquiry = (id: string): void => { write(KEYS.inquiries, getInquiries().filter(i => i.id !== id)); };

// Favorites
export const getFavorites = (): string[] => read<string[]>(KEYS.favorites, [], isArr);
export const addFavorite = (id: string): string[] => { const f = [...new Set([...getFavorites(), id])]; write(KEYS.favorites, f); return f; };
export const removeFavorite = (id: string): string[] => { const f = getFavorites().filter(x => x !== id); write(KEYS.favorites, f); return f; };

// Settings
export const getSettings = (): Settings => { const s = { ...defaultSettings, ...read<Partial<Settings>>(KEYS.settings, {}, isObj) }; if (!s.logo) s.logo = defaultSettings.logo; return s; };
export function updateSettings(patch: Partial<Settings>): Settings { const s = { ...getSettings(), ...patch }; write(KEYS.settings, s); return s; }

// Analytics
export const getAnalytics = (): Analytics => ({ ...defaultAnalytics, ...read<Partial<Analytics>>(KEYS.analytics, {}, isObj) });
export function trackPropertyView(id: string): void {
  const a = getAnalytics();
  a.propertyViews[id] = (a.propertyViews[id] ?? 0) + 1; write(KEYS.analytics, a);
  const p = getProperty(id); if (p) updateProperty(id, { views: p.views + 1, updatedAt: p.updatedAt });
}
export function trackClick(kind: 'whatsappClicks' | 'callClicks'): void { const a = getAnalytics(); write(KEYS.analytics, { ...a, [kind]: a[kind] + 1 }); }

// Admin (prototype only — NOT secure auth). Replace with a real auth provider later.
export const getAdmin = (): Admin => ({ ...defaultAdmin, ...read<Partial<Admin>>(KEYS.admin, {}, isObj) });
export const saveAdmin = (a: Admin): void => { write(KEYS.admin, a); };

// Theme
export const getTheme = (): Theme => read<Theme>(KEYS.theme, 'light', v => v === 'light' || v === 'dark');
export const saveTheme = (t: Theme): void => { write(KEYS.theme, t); };

// Backup / restore
export function exportBackup(): BackupFile {
  return { version: STORAGE_VERSION, exportedAt: new Date().toISOString(), properties: getProperties(), inquiries: getInquiries(),
    favorites: getFavorites(), settings: getSettings(), analytics: getAnalytics(), admin: getAdmin(), theme: getTheme() };
}
export function validateBackup(data: unknown): data is BackupFile {
  if (!isObj(data)) return false;
  const d = data as Record<string, unknown>;
  return typeof d.version === 'number' && isArr(d.properties) && isArr(d.inquiries) && isArr(d.favorites) && isObj(d.settings) &&
    (d.properties as Record<string, unknown>[]).every(p => isObj(p) && typeof p.id === 'string' && typeof p.title === 'string');
}
export function restoreBackup(b: BackupFile): void {
  write(KEYS.properties, b.properties); write(KEYS.inquiries, b.inquiries); write(KEYS.favorites, b.favorites);
  write(KEYS.settings, { ...defaultSettings, ...b.settings }); write(KEYS.analytics, { ...defaultAnalytics, ...b.analytics });
  if (isObj(b.admin)) write(KEYS.admin, { ...defaultAdmin, ...b.admin, loggedIn: false });
  if (b.theme === 'light' || b.theme === 'dark') write(KEYS.theme, b.theme);
  write(KEYS.version, STORAGE_VERSION);
}
export function resetDemoData(): void { Object.values(KEYS).forEach(k => localStorage.removeItem(k)); initStorage(); }
