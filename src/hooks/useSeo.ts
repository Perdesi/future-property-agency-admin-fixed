import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
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
    set('name', 'description', desc); set('property', 'og:title', document.title);
    set('property', 'og:description', desc); set('property', 'og:type', 'website');
  }, [title, description, settings]);
}
