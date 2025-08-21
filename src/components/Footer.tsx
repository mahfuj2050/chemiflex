import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <img
              src="/uploads/chemifex-logo.png"
              alt="CHEMIFLEX logo"
              className="h-10 w-auto object-contain mb-3"
              loading="lazy"
            />
            <h3 className="text-2xl font-bold text-blue-400 mb-4">CHEMIFLEX</h3>
            <p className="text-gray-300 mb-4">
              Leading business exhibition solutions connecting suppliers and partners 
              worldwide. Your trusted platform for professional networking and growth.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@chemiflex.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Business Ave, Suite 100</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-blue-400">About Us</a></li>
              <li><a href="/partners" className="text-gray-300 hover:text-blue-400">Partners</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-blue-400">Products</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Exhibition Planning</span></li>
              <li><span className="text-gray-300">Supplier Network</span></li>
              <li><span className="text-gray-300">Product Showcase</span></li>
              <li><span className="text-gray-300">Business Solutions</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 CHEMIFLEX. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;