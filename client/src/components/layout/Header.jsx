import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Menu, X, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';  // Import useLocation
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

import Logo from '../shared/Logo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // State for authentication
  const [role, setRole] = useState(null); // State for user role
  const location = useLocation();
  const navigate = useNavigate();  // For navigation after logout

  // Check if token exists and set authentication and role state
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decoded = jwtDecode(token);  // Decode the token if it exists
      setRole(decoded?.role);  // Set the role from the decoded token
    } else {
      setIsAuthenticated(false);  // No token means user is not authenticated
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this only runs once on mount

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsAuthenticated(false);  // Update isAuthenticated state
    setRole(null); // Clear the role
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'bg-transparent text-blue-900'}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo className="h-10 w-auto" />
            <span className={`ml-2 font-bold text-xl`}>
              SmartParts
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="text-white">
              <ul className="flex space-x-8">
                <li>
                  <Link to="/" className="font-semibold hover:text-blue-200 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="font-semibold hover:text-blue-200 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="font-semibold hover:text-blue-200 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="font-semibold hover:text-blue-200 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {role === 'vendor' && (
                    <Link to="/vendor/dashboard" className="font-semibold text-white hover:text-blue-200 transition-colors">
                      Dashboard
                    </Link>
                  )}
                  {role === 'customer' && (
                    <Link to="/customer/dashboard" className="font-semibold text-white hover:text-blue-200 transition-colors">
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <Link to="/" className="block py-2 font-semibold hover:text-blue-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 font-semibold hover:text-blue-200 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block py-2 font-semibold hover:text-blue-200 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="block py-2 font-semibold hover:text-blue-200 transition-colors">
                  FAQ
                </Link>
              </li>

              <div className="pt-4 border-t border-white">
                {isAuthenticated ? (
                  <>
                    {role === 'vendor' && (
                      <Link to="/vendor/VendorDashboard" className="block py-2 font-semibold text-white hover:text-blue-200 transition-colors">
                        Dashboard
                      </Link>
                    )}
                    <Link to="/profile" className="block py-2 font-semibold text-white hover:text-blue-200 transition-colors">
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block py-2 font-semibold text-white hover:text-blue-200 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 text-center hover:bg-blue-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 rounded-md bg-blue-600 text-white text-center hover:bg-blue-700 transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
