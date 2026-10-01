import type { ReactNode } from 'react';
export default function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return <div className="empty"><h3>{title}</h3><p>{text}</p>{action}</div>;
}
