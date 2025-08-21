import React from 'react';
import { Building2, Users, Package, TrendingUp, Shield, Zap } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Building2,
      title: 'Supplier Management',
      description: 'Comprehensive supplier verification and management solutions for your business needs.'
    },
    {
      icon: Package,
      title: 'Product Sourcing',
      description: 'Access to thousands of verified products from trusted suppliers worldwide.'
    },
    {
      icon: Users,
      title: 'Business Networking',
      description: 'Connect with industry leaders and expand your professional network.'
    },
    {
      icon: TrendingUp,
      title: 'Growth Analytics',
      description: 'Data-driven insights to help optimize your business growth strategies.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security ensuring your business data remains protected.'
    },
    {
      icon: Zap,
      title: 'Fast Integration',
      description: 'Quick and seamless integration with your existing business systems.'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Business Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide end-to-end business exhibition solutions designed to help your 
            company connect, grow, and succeed in today's competitive marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="bg-brand-blue/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <IconComponent className="w-7 h-7 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;