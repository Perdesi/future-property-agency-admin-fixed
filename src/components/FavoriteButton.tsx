import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
export default function FavoriteButton({ id }: { id: string }) {
  const { favorites, toggleFavorite, notify } = useApp();
  const on = favorites.includes(id);
  return (
    <button className={`icon-btn fav ${on ? 'on' : ''}`} aria-pressed={on} aria-label={on ? 'Remove from favorites' : 'Save to favorites'}
      onClick={e => { e.preventDefault(); toggleFavorite(id); notify(on ? 'Removed from favorites' : 'Saved to favorites'); }}>
      <Heart size={18} fill={on ? 'currentColor' : 'none'} />
    </button>
  );
}
