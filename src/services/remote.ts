/**
 * Tiny Supabase client using plain fetch (no extra npm package needed).
 * Active only when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.
 */
const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;
const URL_BASE = (env.VITE_SUPABASE_URL ?? '').replace(/\/+$/, '');
const ANON = env.VITE_SUPABASE_ANON_KEY ?? '';
export const REMOTE = Boolean(URL_BASE && ANON);
export const IS_PROD = Boolean(env.PROD);
export const BUCKET = 'property-images';

interface Session { access_token: string; refresh_token: string; expires_at: number; email: string }
const SESSION_KEY = 'future_property_session';

let errorHandler: (message: string) => void = () => {};
export const setRemoteErrorHandler = (fn: (message: string) => void): void => { errorHandler = fn; };
export const reportError = (message: string): void => errorHandler(message);

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Session;
    return s && typeof s.access_token === 'string' && typeof s.refresh_token === 'string' ? s : null;
  } catch { return null; }
}
function saveSession(s: Session | null): void {
  try { if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s)); else localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
}
export const hasSession = (): boolean => REMOTE && loadSession() !== null;
export const sessionEmail = (): string => loadSession()?.email ?? '';

interface TokenResponse { access_token?: string; refresh_token?: string; expires_in?: number; user?: { email?: string }; error_description?: string; msg?: string; error?: string }
function toSession(d: TokenResponse, fallbackEmail: string): Session | null {
  if (!d.access_token || !d.refresh_token) return null;
  return { access_token: d.access_token, refresh_token: d.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + (d.expires_in ?? 3600), email: d.user?.email ?? fallbackEmail };
}

/** Returns null on success, otherwise an error message. */
export async function signIn(email: string, password: string): Promise<string | null> {
  try {
    const r = await fetch(`${URL_BASE}/auth/v1/token?grant_type=password`, {
      method: 'POST', headers: { apikey: ANON, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const d = (await r.json()) as TokenResponse;
    const s = r.ok ? toSession(d, email) : null;
    if (!s) return 'Incorrect email or password.';
    saveSession(s); return null;
  } catch { return 'Could not reach the server. Check your internet connection.'; }
}
export function signOut(): void { saveSession(null); }

async function getToken(): Promise<string> {
  const s = loadSession();
  if (!s) return ANON;
  if (s.expires_at - 60 > Math.floor(Date.now() / 1000)) return s.access_token;
  try {
    const r = await fetch(`${URL_BASE}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST', headers: { apikey: ANON, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: s.refresh_token }) });
    const next = r.ok ? toSession((await r.json()) as TokenResponse, s.email) : null;
    if (next) { saveSession(next); return next.access_token; }
    saveSession(null); return ANON;
  } catch { return s.access_token; }
}

/** Returns null on success, otherwise an error message. */
export async function changePassword(password: string): Promise<string | null> {
  try {
    const token = await getToken();
    const r = await fetch(`${URL_BASE}/auth/v1/user`, {
      method: 'PUT', headers: { apikey: ANON, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (r.ok) return null;
    const d = (await r.json().catch(() => ({}))) as TokenResponse;
    return d.msg ?? d.error_description ?? 'Could not change the password.';
  } catch { return 'Could not reach the server.'; }
}

async function request(path: string, init: RequestInit & { timeoutMs?: number } = {}): Promise<Response> {
  const token = await getToken();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), init.timeoutMs ?? 20000);
  try {
    const headers: Record<string, string> = { apikey: ANON, Authorization: `Bearer ${token}`, ...(init.headers as Record<string, string> | undefined) };
    const r = await fetch(`${URL_BASE}${path}`, { ...init, headers, signal: ctrl.signal });
    if (!r.ok) {
      const text = await r.text().catch(() => '');
      if (r.status === 401) { if (loadSession()) saveSession(null); throw new Error('Your login expired. Please log in again.'); }
      if (r.status === 403) throw new Error('You are not allowed to do this.');
      throw new Error(`Server error ${r.status}${text ? `: ${text.slice(0, 140)}` : ''}`);
    }
    return r;
  } finally { clearTimeout(timer); }
}
const JSON_HEADERS = { 'Content-Type': 'application/json' };

export async function selectData<T>(table: string, query = ''): Promise<T[]> {
  const r = await request(`/rest/v1/${table}?select=data${query}`, { timeoutMs: 8000 });
  const rows = (await r.json()) as { data: T }[];
  return rows.map(x => x.data);
}
export async function upsertRow(table: string, row: Record<string, unknown> | Record<string, unknown>[]): Promise<void> {
  await request(`/rest/v1/${table}`, { method: 'POST', headers: { ...JSON_HEADERS, Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(row) });
}
export async function insertRow(table: string, row: Record<string, unknown>): Promise<void> {
  await request(`/rest/v1/${table}`, { method: 'POST', headers: { ...JSON_HEADERS, Prefer: 'return=minimal' }, body: JSON.stringify(row) });
}
export async function deleteRow(table: string, id: string): Promise<void> {
  await request(`/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
}
export async function rpc(fn: string, args: Record<string, unknown>): Promise<void> {
  await request(`/rest/v1/rpc/${fn}`, { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(args) });
}

async function compressImage(file: File): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image(); el.onload = () => resolve(el); el.onerror = () => reject(new Error('This file is not a valid image.')); el.src = url;
    });
    const max = 1600;
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not process the image.');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve, reject) => canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Could not compress the image.'))), 'image/jpeg', 0.82));
  } finally { URL.revokeObjectURL(url); }
}

/** Compresses and uploads an image to the public bucket; returns its public URL. */
export async function uploadImage(file: File): Promise<string> {
  const blob = await compressImage(file);
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  await request(`/storage/v1/object/${BUCKET}/${path}`, { method: 'POST', headers: { 'Content-Type': 'image/jpeg' }, body: blob, timeoutMs: 60000 });
  return `${URL_BASE}/storage/v1/object/public/${BUCKET}/${path}`;
}
