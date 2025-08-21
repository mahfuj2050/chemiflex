import React from 'react';
import { Target, Eye, Heart, Award } from 'lucide-react';

const About: React.FC = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About CHEMIFLEX</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Connecting businesses worldwide through innovative exhibition solutions
          </p>
        </div>
      </div>

      {/* Company Profile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, CHEMIFLEX has grown to become a leading platform for business 
              exhibitions and supplier connections. We bridge the gap between innovative suppliers 
              and businesses seeking quality products and services.
            </p>
            <p className="text-gray-600">
              Our platform serves over 500 trusted partners across 50+ industry sectors, 
              facilitating meaningful business relationships and driving growth for companies worldwide.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <Award className="w-5 h-5 text-blue-600 mr-3" />
                Industry-leading expertise
              </li>
              <li className="flex items-center text-gray-600">
                <Target className="w-5 h-5 text-blue-600 mr-3" />
                Targeted business solutions
              </li>
              <li className="flex items-center text-gray-600">
                <Heart className="w-5 h-5 text-blue-600 mr-3" />
                Customer-centric approach
              </li>
            </ul>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mission</h3>
            <p className="text-gray-600">
              To empower businesses by providing innovative exhibition solutions and fostering 
              meaningful connections between suppliers and partners.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Vision</h3>
            <p className="text-gray-600">
              To be the world's most trusted platform for business exhibitions, 
              driving innovation and growth across all industries.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Values</h3>
            <p className="text-gray-600">
              Integrity, innovation, excellence, and customer success guide everything we do 
              in building lasting business relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;