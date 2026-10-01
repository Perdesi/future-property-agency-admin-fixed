import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Settings, Theme } from '../types';
import * as store from '../services/storageService';

interface Toast { id: number; message: string; tone: 'success' | 'error' }
interface Ctx {
  settings: Settings; saveSettings: (p: Partial<Settings>) => void;
  favorites: string[]; toggleFavorite: (id: string) => void;
  theme: Theme; toggleTheme: () => void;
  toasts: Toast[]; notify: (message: string, tone?: Toast['tone']) => void; dismiss: (id: number) => void;
  refreshAll: () => void;
}
const AppContext = createContext<Ctx | null>(null);
store.initStorage();

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(store.getSettings);
  const [favorites, setFavorites] = useState(store.getFavorites);
  const [theme, setTheme] = useState<Theme>(store.getTheme);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => { document.documentElement.dataset.theme = theme; store.saveTheme(theme); }, [theme]);
  const dismiss = useCallback((id: number) => setToasts(t => t.filter(x => x.id !== id)), []);
  const notify = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, message, tone }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  const value = useMemo<Ctx>(() => ({
    settings, favorites, theme, toasts, notify, dismiss,
    saveSettings: p => setSettings(store.updateSettings(p)),
    toggleFavorite: id => setFavorites(f => f.includes(id) ? store.removeFavorite(id) : store.addFavorite(id)),
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
    refreshAll: () => { setSettings(store.getSettings()); setFavorites(store.getFavorites()); setTheme(store.getTheme()); },
  }), [settings, favorites, theme, toasts, notify, dismiss]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp(): Ctx {
  const c = useContext(AppContext);
  if (!c) throw new Error('useApp must be used inside AppProvider');
  return c;
}
