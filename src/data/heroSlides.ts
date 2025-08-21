// Update these URLs with the exact image links you want to use
// You can paste absolute URLs from the reference website/CDN
export interface HeroSlide {
  imageUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  alt?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    videoUrl: '/uploads/prinova_video.mp4',
    posterUrl: '/images/hero/hero-2-lab.png',
    alt: 'Prinova showcase video',
    ctaLabel: 'Explore Prinova',
    ctaHref: '/products'
  },
  {
    imageUrl: '/images/hero/hero-1-azelis-fine-chemicals.jpg',
    alt: 'Fine chemicals banner',
    ctaLabel: 'Browse Products',
    ctaHref: '/products'
  },
  {
    imageUrl: '/images/hero/hero-2-lab.png',
    alt: 'Lab image',
    ctaLabel: 'Find a Supplier',
    ctaHref: '/partners'
  },
  {
    imageUrl: '/images/hero/hero-3-sustainability.jpg',
    alt: 'Sustainability green leaves',
    ctaLabel: 'Contact Us',
    ctaHref: '/contact'
  },
  {
    imageUrl: '/images/hero/hero-4-pharma-materials.jpg',
    alt: 'Pharmaceutical raw materials - specifications',
    ctaLabel: 'Pharma Materials',
    ctaHref: '/products?cat=pharma'
  },
  {
    imageUrl: '/images/hero/hero-5-drug-safety.jpg',
    alt: 'Drug safety research',
    ctaLabel: 'Safety & Compliance',
    ctaHref: '/about'
  }
];
