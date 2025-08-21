import React from 'react';

type Client = { label: string };

const clients: Client[] = [
  { label: 'Square Pharmaceuticals' },
  { label: 'Beximco Pharmaceuticals' },
  { label: 'Incepta Pharmaceuticals' },
  { label: 'Renata Limited' },
  { label: 'Eskayef (SK+F)' },
  { label: 'ACME Laboratories' },
  { label: 'Aristopharma Limited' },
  { label: 'Healthcare Pharmaceuticals' },
  { label: 'ACI Pharmaceuticals' },
  { label: 'Opsonin Pharma' },
  { label: 'Beacon Pharmaceuticals' },
  { label: 'Popular Pharmaceuticals' },
];

const IndustriesAccordion: React.FC = () => {
  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Clients</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {clients.map((it) => (
            <a
              key={it.label}
              href="#"
              className="group bg-brand-blue text-white border border-transparent rounded-xl p-5 flex items-center justify-center text-center transition-all hover:bg-brand-orange hover:text-white hover:shadow-md"
            >
              <div className="font-semibold">{it.label}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesAccordion;
