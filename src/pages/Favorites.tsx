import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getProperties } from '../services/storageService';
import PropertyGrid from '../components/PropertyGrid';
import EmptyState from '../components/EmptyState';
import { useSeo } from '../hooks/useSeo';
export default function Favorites() {
  useSeo('Favorites', 'Properties you saved.');
  const { favorites } = useApp();
  const items = getProperties().filter(p => favorites.includes(p.id));
  return <div className="container section"><h1>Saved properties</h1>
    {items.length ? <PropertyGrid items={items} /> : <EmptyState title="No saved properties yet" text="Tap the heart on any listing to save it here." action={<Link className="btn primary" to="/properties">Browse properties</Link>} />}</div>;
}
