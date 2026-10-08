// Vercel serverless function: serves /sitemap.xml (see vercel.json). Lists main pages + every property in the database.
const SITE = 'https://futurepropertyagency.com';
const PAGES = ['/', '/properties', '/sale', '/rent', '/commercial', '/residential', '/investment', '/services', '/about', '/contact', '/privacy'];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req, res) {
  const base = (process.env.VITE_SUPABASE_URL || '').replace(/\/+$/, '');
  const key = process.env.VITE_SUPABASE_ANON_KEY || '';
  let rows = [];
  if (base && key) {
    try {
      const r = await fetch(`${base}/rest/v1/properties?select=id,updated_at,images:data->images&order=created_at.desc&limit=5000`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
      if (r.ok) rows = await r.json();
    } catch { /* fall back to main pages only */ }
  }
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...PAGES.map(p => `<url><loc>${SITE}${p === '/' ? '' : p}</loc><lastmod>${today}</lastmod><changefreq>${p === '/' || p === '/properties' ? 'daily' : 'monthly'}</changefreq><priority>${p === '/' ? '1.0' : '0.7'}</priority></url>`),
    ...rows.map(x => `<url><loc>${SITE}/property/${esc(encodeURIComponent(x.id))}</loc><lastmod>${esc(String(x.updated_at || today).slice(0, 10))}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority>${(Array.isArray(x.images) ? x.images : []).filter(u => typeof u === 'string' && u.startsWith('http')).slice(0, 5).map(u => `<image:image><image:loc>${esc(u)}</image:loc></image:image>`).join('')}</url>`),
  ];
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>`);
}
