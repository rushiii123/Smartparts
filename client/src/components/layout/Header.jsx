import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import Logo from '../shared/Logo';
import Button from '../shared/Button'; 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, role } = useUser();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
              {/* Become a Vendor Button */}
              <Link to="/be-a-vendor">
                <Button variant="primary" size="sm" className="hidden md:inline-block">
                  Become a Vendor
                </Button>
              </Link>
              
              {isAuthenticated ? (
                <>
                  {role === 'vendor' && (
                    <Link to="/vendor/dashboard" className="font-semibold text-white hover:text-blue-200 transition-colors">
                      Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/CustomerDashboard" 
                    className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <User size={20} />
                  </Link>
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

              {/* Mobile Become a Vendor Button */}
              <div className="pt-4 border-t border-white">
                <Link to="/be-a-vendor">
                  <Button variant="primary" size="sm" fullWidth>
                    Become a Vendor
                  </Button>
                </Link>
              </div>

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
