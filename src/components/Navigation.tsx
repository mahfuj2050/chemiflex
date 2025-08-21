import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, ShoppingCart, Phone, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();
  const brandRef = useRef<HTMLDivElement | null>(null);
  const [brandWidth, setBrandWidth] = useState<number>(0);
  const [brandHeight, setBrandHeight] = useState<number>(0);

  useEffect(() => {
    if (!brandRef.current) return;
    const el = brandRef.current;
    const update = () => {
      setBrandWidth(el.offsetWidth || 0);
      setBrandHeight(el.offsetHeight || 0);
    };
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/partners', label: 'Partners' },
    { path: '/products', label: 'Products' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="border-b border-gray-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" aria-label="CHEMIFEX" className="whitespace-nowrap">
            <div className="leading-tight" ref={brandRef}>
              <div className="text-2xl md:text-3xl font-extrabold text-brand-blue font-brand">CHEMIFEX</div>
              <div className="text-[10px] md:text-xs text-brand-orange font-medium uppercase font-slogan">BEYOND THE CHEMISTRY</div>
            </div>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:flex items-center flex-1 mx-6">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search products, suppliers, industries..."
                className="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue/60"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Utilities */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="tel:+15551234567" className="flex items-center text-sm text-gray-600 hover:text-brand-blue">
              <Phone className="w-4 h-4 mr-2" /> Contact
            </a>
            {!token ? (
              <Link to="/login" className="flex items-center text-sm text-gray-700 hover:text-brand-blue">
                <User className="w-5 h-5 mr-2" /> Sign In
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard" className="text-sm text-gray-700 hover:text-brand-blue">
                  Dashboard
                </Link>
                <span className="text-sm text-gray-500">{user?.fullName || user?.email}</span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="text-sm text-gray-700 hover:text-brand-blue"
                >
                  Logout
                </button>
              </div>
            )}
            <button className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-brand-blue" />
              <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-[10px] leading-4 rounded-full w-4 h-4 grid place-items-center">0</span>
            </button>
            {/* Right-side Logo sized to match left brand width */}
            <div
              className="ml-4 md:ml-6 flex items-center justify-end overflow-hidden rounded"
              style={{ width: brandWidth || undefined, height: brandHeight || undefined }}
            >
              <img
                src="/uploads/chemifex-logo.png"
                alt="CHEMIFLEX logo"
                className="h-full w-full object-cover drop-shadow shrink-0 transform scale-[1.35] brightness-[1.15] contrast-[1.25]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Mobile Right-Side Logo + Menu Button */}
          <div className="md:hidden flex items-center">
            <img
              src="/uploads/chemifex-logo.png"
              alt="CHEMIFLEX logo"
              className="h-8 w-auto object-contain mr-3 drop-shadow shrink-0"
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand-blue"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Nav */}
      <div className="hidden md:block bg-brand-blue">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-12 space-x-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-2 py-1 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-white font-semibold border-b-2 border-white'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
                <ChevronDown className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 py-3 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, suppliers, industries..."
                className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue/60"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'text-brand-blue bg-blue-50'
                    : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3 flex items-center space-x-6">
            {!token ? (
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center text-sm text-gray-700">
                <User className="w-5 h-5 mr-2" /> Sign In
              </Link>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-sm text-gray-700">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="text-sm text-gray-700"
                >
                  Logout
                </button>
              </>
            )}
            <button className="flex items-center text-sm text-gray-700">
              <ShoppingCart className="w-5 h-5 mr-2" /> Cart
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;