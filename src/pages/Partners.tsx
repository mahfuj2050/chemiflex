import React from 'react';
import { ExternalLink, Globe, Users } from 'lucide-react';
import { suppliers } from '@/data/mockData';

const Partners: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 relative">
        <div className="hidden sm:block absolute top-4 right-4 bg-white/95 rounded-md shadow p-2">
          <img
            src="/uploads/chemifex-logo.png"
            alt="CHEMIFLEX logo"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Partners & Suppliers</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover our network of trusted suppliers and business partners
          </p>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our carefully vetted network of suppliers ensures quality, reliability, and innovation 
            across all business sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={supplier.logo} 
                    alt={supplier.name}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{supplier.name}</h3>
                    <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {supplier.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{supplier.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Globe className="w-4 h-4 mr-1" />
                    <span>Global Reach</span>
                  </div>
                  <a
                    href={supplier.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 text-white rounded-lg p-8">
            <Users className="w-16 h-16 mx-auto mb-4 text-blue-200" />
            <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join our network of trusted suppliers and reach thousands of potential customers worldwide.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;