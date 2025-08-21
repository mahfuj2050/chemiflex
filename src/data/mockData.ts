export interface Supplier {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  supplierId: string;
  category: string;
  price?: string;
}

export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'TechSolutions Inc.',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    description: 'Leading provider of innovative technology solutions for modern businesses.',
    website: 'https://techsolutions.com',
    category: 'Technology'
  },
  {
    id: '2',
    name: 'Global Manufacturing Co.',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop',
    description: 'Premium manufacturing services with worldwide distribution capabilities.',
    website: 'https://globalmanufacturing.com',
    category: 'Manufacturing'
  },
  {
    id: '3',
    name: 'EcoGreen Solutions',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
    description: 'Sustainable and eco-friendly business solutions for the modern world.',
    website: 'https://ecogreen.com',
    category: 'Sustainability'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Smart Office System',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    description: 'Integrated smart office management system with IoT capabilities.',
    supplierId: '1',
    category: 'Technology',
    price: '$2,999'
  },
  {
    id: '2',
    name: 'Industrial Equipment',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    description: 'High-quality industrial equipment for manufacturing processes.',
    supplierId: '2',
    category: 'Manufacturing',
    price: '$15,999'
  },
  {
    id: '3',
    name: 'Solar Panel System',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
    description: 'Efficient solar energy solutions for commercial applications.',
    supplierId: '3',
    category: 'Sustainability',
    price: '$8,999'
  }
];