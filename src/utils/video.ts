export interface VideoEmbed { src: string; vertical: boolean; youtubeId?: string }

/** Turns a YouTube / Facebook / Google Drive video link into a player address that can be shown inside the page. Returns null for other links. */
export function videoEmbed(raw: string): VideoEmbed | null {
  const text = (raw || '').trim();
  if (!text) return null;
  let u: URL;
  try { u = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`); } catch { return null; }
  const host = u.hostname.replace(/^(www|m)\./, '');
  const clean = (id: string | null | undefined): string | null => (id && /^[\w-]{11}$/.test(id) ? id : null);
  let id: string | null = null;
  let vertical = false;
  if (host === 'youtu.be') id = clean(u.pathname.slice(1).split('/')[0]);
  else if (host === 'youtube.com') {
    const m = u.pathname.match(/^\/(shorts|embed|live|v)\/([\w-]{11})/);
    if (u.pathname === '/watch') id = clean(u.searchParams.get('v'));
    else if (m) { id = clean(m[2]); vertical = m[1] === 'shorts'; }
  }
  if (id) return { src: `https://www.youtube-nocookie.com/embed/${id}?rel=0`, vertical, youtubeId: id };
  if (host === 'facebook.com' || host === 'fb.watch') return { src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(u.toString())}&show_text=false`, vertical: false };
  if (host === 'drive.google.com') {
    const m = u.pathname.match(/^\/file\/d\/([\w-]+)/);
    if (m) return { src: `https://drive.google.com/file/d/${m[1]}/preview`, vertical: false };
  }
  return null;
}
