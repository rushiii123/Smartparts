import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Header from "./components/layout/Header"; 
import Footer from "./components/layout/Footer"; 

// Context Providers
import { UserProvider } from "./context/UserContext";
import { SearchProvider } from "./context/SearchContext";

// Pages
import HomePage from "./pages/HomePage";
import SearchResults from "./components/search/SearchResults"; // Updated import path
import OrderRequest from "./pages/OrderRequestPage";
import VendorDashboard from './pages/vendor/VendorDashboard';
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import OrderRequestPage from "./pages/OrderRequestPage";
import BeAVendorPage from "./pages/BeAVendorPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import TermsPage from "./pages/TermsPage";
import VendorListingsPage from "./pages/vendor/ListingsPage";
import VendorAddProductPage from "./pages/vendor/AddProductPage";
import VendorRequestsPage from "./pages/vendor/RequestsPage";
import VendorSettingsPage from "./pages/vendor/SettingsPage";

// New Component for Image Upload
import ImageUploadForm from './components/ImageUploadForm';

// New: ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <Router>
      <UserProvider>
        <SearchProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
              <Routes>

                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/order" element={<OrderRequest />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/order-request/:id" element={<OrderRequestPage />} />
                <Route path="/be-a-vendor" element={<BeAVendorPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/upload-image" element={<ImageUploadForm />} />

                {/* Admin Panel */}
                <Route path="/admin" element={<AdminPanel />} />

                {/* Protected Routes */}
                <Route
                  path="/vendor"
                  element={
                    <ProtectedRoute allowedRoles={['vendor']}>
                      <VendorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vendor/listings"
                  element={
                    <ProtectedRoute allowedRoles={['vendor']}>
                      <VendorListingsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vendor/add-product"
                  element={
                    <ProtectedRoute allowedRoles={['vendor']}>
                      <VendorAddProductPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vendor/requests"
                  element={
                    <ProtectedRoute allowedRoles={['vendor']}>
                      <VendorRequestsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vendor/settings"
                  element={
                    <ProtectedRoute allowedRoles={['vendor']}>
                      <VendorSettingsPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </SearchProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
