import { FormEvent, useState } from 'react';
import { LockKeyhole, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as store from '../services/storageService';
import { useApp } from '../context/AppContext';
export default function Login(){
 const nav=useNavigate(); const loc=useLocation(); const {notify}=useApp(); const [username,setUsername]=useState('admin'); const [password,setPassword]=useState('admin123'); const [busy,setBusy]=useState(false);
 const submit=(e:FormEvent)=>{e.preventDefault();setBusy(true);const a=store.getAdmin();if(username.trim()===a.username&&password===a.password){store.saveAdmin({...a,loggedIn:true});notify('Welcome to the admin panel.');const from=(loc.state as {from?:string}|null)?.from||'/admin';nav(from,{replace:true});}else notify('Incorrect username or password.','error');setBusy(false)};
 return <div className="admin-login"><div className="login-card"><div className="login-logo"><img src="/logo.png" alt="Future Property Agency" style={{height:56,width:"auto"}}/><div><span>Admin Panel</span></div></div><h1>Welcome back</h1><p>Sign in to manage properties and website content.</p><form onSubmit={submit}><label>Username<div className="input-icon"><User size={17}/><input value={username} onChange={e=>setUsername(e.target.value)} autoComplete="username" required/></div></label><label>Password<div className="input-icon"><LockKeyhole size={17}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/></div></label><button className="primary-btn" disabled={busy}>{busy?'Signing in…':'Sign in'}</button></form><div className="login-note">Demo login: <b>admin</b> / <b>admin123</b><br/>Local-only authentication; not suitable for production security.</div></div></div>
}
