import React from 'react';
import { Users, Building, Package, Globe } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: '500+',
      label: 'Trusted Partners',
      description: 'Verified suppliers worldwide'
    },
    {
      icon: Building,
      number: '50+',
      label: 'Industry Sectors',
      description: 'Diverse business categories'
    },
    {
      icon: Package,
      number: '10,000+',
      label: 'Products Listed',
      description: 'Comprehensive product catalog'
    },
    {
      icon: Globe,
      number: '25+',
      label: 'Countries Served',
      description: 'Global business reach'
    }
  ];

  return (
    <div className="py-20 bg-brand-blue">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join thousands of companies that rely on our platform for their business growth and success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-brand-blue/90 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-white/80 mb-1">{stat.label}</div>
                <div className="text-white/70 text-sm">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;