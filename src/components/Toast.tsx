import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
export default function ToastHost() {
  const { toasts, dismiss } = useApp();
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map(t => (
        <button key={t.id} className={`toast ${t.tone}`} onClick={() => dismiss(t.id)}>
          {t.tone === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}{t.message}
        </button>
      ))}
    </div>
  );
}
