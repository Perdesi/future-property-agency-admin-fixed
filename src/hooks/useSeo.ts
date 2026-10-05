import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
const SITE = 'https://futurepropertyagency.com';
export function useSeo(title?: string, description?: string): void {
  const { settings } = useApp();
  useEffect(() => {
    document.title = title ? `${title} | ${settings.agencyName}` : settings.seoTitle;
    const set = (attr: 'name' | 'property', key: string, val: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.content = val;
    };
    const desc = description || settings.seoDescription;
    const url = `${SITE}${window.location.pathname === '/' ? '' : window.location.pathname}`;
    set('name', 'description', desc); set('property', 'og:title', document.title);
    set('property', 'og:description', desc); set('property', 'og:type', 'website'); set('property', 'og:url', url);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = url;
  }, [title, description, settings]);
}
/** Adds a JSON-LD structured-data block to the page while the component is mounted. */
export function useJsonLd(id: string, data: object | null): void {
  const json = data ? JSON.stringify(data) : '';
  useEffect(() => {
    if (!json) return;
    const el = document.createElement('script');
    el.type = 'application/ld+json'; el.id = `ld-${id}`; el.textContent = json;
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [id, json]);
}
/** Keeps a page out of search results (used for the admin panel). */
export function useNoIndex(): void {
  useEffect(() => {
    const el = document.createElement('meta');
    el.name = 'robots'; el.content = 'noindex, nofollow';
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, []);
}
