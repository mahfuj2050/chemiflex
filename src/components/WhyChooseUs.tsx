import React from 'react';
import { CheckCircle, Award, Clock, Headphones } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: CheckCircle,
      title: 'Verified Quality',
      description: 'All suppliers undergo rigorous verification processes to ensure quality and reliability.'
    },
    {
      icon: Award,
      title: 'Industry Expertise',
      description: 'Over 15 years of experience in connecting businesses with the right partners.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need help.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Account Manager',
      description: 'Personal account managers to guide you through your business journey.'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose CHEMIFLEX?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're committed to providing exceptional business exhibition solutions 
              that drive growth and create lasting partnerships. Our platform combines 
              cutting-edge technology with personalized service.
            </p>
            
            <div className="space-y-6">
              {reasons.map((reason, index) => {
                const IconComponent = reason.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{reason.title}</h3>
                      <p className="text-gray-600">{reason.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-2 bg-gray-100 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-20 bg-gradient-to-r from-brand-blue to-brand-orange rounded-lg"></div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-brand-blue/20 rounded w-12"></div>
                </div>
                <div className="h-16 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;