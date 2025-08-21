import React from 'react';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <div className="py-20 bg-gray-900">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of successful businesses using our platform to connect with 
            verified suppliers and accelerate growth. Get started today and see the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/partners"
              className="bg-brand-orange text-white px-8 py-4 rounded-lg font-semibold hover:brightness-95 transition-colors inline-flex items-center justify-center group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-colors inline-flex items-center justify-center"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mx-auto">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-brand-blue w-10 h-10 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Call Us</h3>
                <p className="text-gray-400">Speak with our experts</p>
              </div>
            </div>
            <p className="text-xl font-semibold text-brand-blue">+1 (555) 123-4567</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-brand-blue w-10 h-10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Email Us</h3>
                <p className="text-gray-400">Get in touch anytime</p>
              </div>
            </div>
            <p className="text-xl font-semibold text-brand-blue">info@chemiflex.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;