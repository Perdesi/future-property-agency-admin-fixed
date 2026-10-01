import { Navigate, Outlet, useLocation } from 'react-router-dom';
import * as store from '../services/storageService';
export default function RequireAdmin(){ const location=useLocation(); return store.getAdmin().loggedIn ? <Outlet/> : <Navigate to="/admin/login" replace state={{from:location.pathname}}/>; }
