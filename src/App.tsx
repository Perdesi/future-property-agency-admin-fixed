import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ToastHost from './components/Toast';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Listing from './pages/Listing';
import PropertyDetail from './pages/PropertyDetail';
import Favorites from './pages/Favorites';
import { About, Contact, Investment, NotFound, Services } from './pages/Info';
import type { Property } from './types';
import AdminLayout from './admin/AdminLayout';
import RequireAdmin from './admin/RequireAdmin';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import AdminProperties from './admin/Properties';
import PropertyForm from './admin/PropertyForm';
import AdminInquiries from './admin/Inquiries';
import AdminSettings from './admin/Settings';
import AdminProfile from './admin/Profile';
import AdminBackup from './admin/Backup';

const isSale = (p: Property) => p.transactionType === 'Sale';
const isRent = (p: Property) => p.transactionType === 'Rent';
const isCom = (p: Property) => p.category === 'Commercial';
const isRes = (p: Property) => p.category === 'Residential';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="admin/login" element={<AdminLogin />} />
          <Route element={<RequireAdmin />}>
            <Route element={<AdminLayout />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/properties" element={<AdminProperties />} />
              <Route path="admin/properties/new" element={<PropertyForm />} />
              <Route path="admin/properties/:id/edit" element={<PropertyForm />} />
              <Route path="admin/inquiries" element={<AdminInquiries />} />
              <Route path="admin/settings" element={<AdminSettings />} />
              <Route path="admin/profile" element={<AdminProfile />} />
              <Route path="admin/backup" element={<AdminBackup />} />
            </Route>
          </Route>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="properties" element={<Listing title="Properties" intro="Browse all listings in Rawalpindi and Islamabad." />} />
            <Route path="sale" element={<Listing title="Properties for sale" intro="Houses, plots, shops and more for sale." base={isSale} />} />
            <Route path="rent" element={<Listing title="Properties for rent" intro="Homes, offices and shops available to rent." base={isRent} />} />
            <Route path="commercial" element={<Listing title="Commercial properties" intro="Shops, offices, commercial plots, buildings and warehouses." base={isCom} />} />
            <Route path="residential" element={<Listing title="Residential properties" intro="Houses, flats and residential plots." base={isRes} />} />
            <Route path="property/:id" element={<PropertyDetail />} />
            <Route path="investment" element={<Investment />} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastHost />
    </AppProvider>
  );
}
