import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Building2, ClipboardList, DatabaseBackup, LayoutDashboard, LogOut, Menu, Settings, User, X } from 'lucide-react';
import { useState } from 'react';
import * as store from '../services/storageService';
import { useApp } from '../context/AppContext';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { notify } = useApp();
  const [open, setOpen] = useState(false);
  const logout = () => { store.logout(); notify('You have been logged out.'); navigate('/admin/login'); };
  const links = [
    ['/admin','Dashboard',LayoutDashboard], ['/admin/properties','Properties',Building2], ['/admin/inquiries','Inquiries',ClipboardList],
    ['/admin/settings','Website Settings',Settings], ['/admin/profile','Admin Profile',User], ['/admin/backup','Backup & Restore',DatabaseBackup],
  ] as const;
  return <div className="admin-shell">
    <aside className={`admin-sidebar ${open?'open':''}`}>
      <div className="admin-brand"><div className="brand-mark"><Building2 size={21}/></div><div><strong>Future</strong><span>Property Admin</span></div><button className="admin-close" onClick={()=>setOpen(false)}><X size={20}/></button></div>
      <nav>{links.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/admin'} onClick={()=>setOpen(false)}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <button className="admin-logout" onClick={logout}><LogOut size={18}/> Logout</button>
    </aside>
    {open && <button className="admin-overlay" aria-label="Close menu" onClick={()=>setOpen(false)} />}
    <main className="admin-main"><header className="admin-topbar"><button className="admin-menu" onClick={()=>setOpen(true)}><Menu size={22}/></button><div><strong>Future Property Agency</strong><span>Administration</span></div><button className="admin-view" onClick={()=>navigate('/')}>View Website</button></header><section className="admin-content"><Outlet /></section></main>
  </div>;
}
