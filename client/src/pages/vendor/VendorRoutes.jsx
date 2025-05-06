import { Routes, Route } from 'react-router-dom';
import VendorDashboard from '../VendorDashboard';
import VendorListingsPage from './ListingsPage';
import VendorAddProductPage from './AddProductPage';
import VendorRequestsPage from './RequestsPage';
import VendorSettingsPage from './SettingsPage';

export default function VendorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<VendorDashboard />} />
      <Route path="/listings" element={<VendorListingsPage />} />
      <Route path="/add-product" element={<VendorAddProductPage />} />
      <Route path="/requests" element={<VendorRequestsPage />} />
      <Route path="/settings" element={<VendorSettingsPage />} />
    </Routes>
  );
}
