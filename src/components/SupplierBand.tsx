import React from 'react';
import { ArrowRight } from 'lucide-react';

const SupplierBand: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Global Chemical & Ingredient Supplier</h2>
            <p className="text-gray-600 mb-6">
              We connect customers with a world-class portfolio, backed by technical expertise and reliable supply.
            </p>
            <button className="inline-flex items-center bg-brand-orange text-white font-semibold px-5 py-3 rounded-full hover:brightness-95">
              Learn more about suppliers <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="order-1 md:order-2">
            <div className="h-64 md:h-80 rounded-2xl bg-[url('/placeholder.svg')] bg-cover bg-center shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplierBand;
