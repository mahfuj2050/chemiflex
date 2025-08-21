import React from 'react';
import { ChevronRight } from 'lucide-react';

type Category = { name: string; imageUrl: string };

const categories: Category[] = [
  { name: 'Acids', imageUrl: 'https://www.univarsolutions.com/media/catalog/category/Acids_Category_Image_Resize2_1.jpg' },
  { name: 'Additives & Modifiers', imageUrl: 'https://www.univarsolutions.com/media/catalog/category/Additives_and_Modifiers_Category_Image.png' },
  { name: 'Chelants', imageUrl: 'https://www.univarsolutions.com/media/catalog/category/Chelants_Category_Image_2.png' },
  { name: 'Enzymes & Microbes', imageUrl: 'https://www.univarsolutions.com/media/catalog/category/Enzymes_and_Microbes_Image.jpg' },
  { name: 'Essential Chemicals & Ingredients', imageUrl: 'https://www.univarsolutions.com/media/catalog/category/ECI_Category_Image.jpg' },
  { name: 'Surfactants', imageUrl: 'https://source.unsplash.com/featured/?surfactant,foam,chemistry' },
  { name: 'Water Treatment', imageUrl: 'https://source.unsplash.com/featured/?water-treatment,water,plant' },
  { name: 'Nutrients', imageUrl: 'https://source.unsplash.com/featured/?nutrients,minerals,chemicals' },
  { name: 'Coatings', imageUrl: 'https://source.unsplash.com/featured/?coatings,paint,industrial' },
  { name: 'Polymers', imageUrl: 'https://source.unsplash.com/featured/?polymer,plastics,chemistry' },
  { name: 'Oils & Lubricants', imageUrl: 'https://source.unsplash.com/featured/?oil,lubricant,industrial' },
  { name: 'Solvents', imageUrl: 'https://source.unsplash.com/featured/?solvent,lab,bottles' },
];

const CategoryTiles: React.FC = () => {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop our extensive inventory</h2>
            <p className="text-gray-600">Explore thousands of products across key categories</p>
          </div>
          <button className="hidden md:inline-flex items-center text-brand-blue font-semibold hover:underline">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* 3 rows x 4 columns on desktop, scrollable on mobile */}
        <div className="-mx-4 px-4 overflow-x-auto md:overflow-visible">
          <div className="grid grid-flow-col auto-cols-[70%] sm:auto-cols-[45%] gap-4 md:grid-cols-4 md:grid-rows-3 md:grid-flow-row">
            {categories.map((cat, i) => (
              <a key={i} href="#" className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                <div className="relative h-28 md:h-32 bg-gray-100">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement;
                      t.onerror = null;
                      t.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/0 to-brand-orange/0 group-hover:from-brand-blue/10 group-hover:to-brand-orange/10 transition-colors" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900">{cat.name}</h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-blue" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;
