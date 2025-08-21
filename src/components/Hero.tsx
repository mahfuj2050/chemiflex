import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import { heroSlides } from '@/data/heroSlides';

const Hero: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);

  // Track current slide index from the carousel API
  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect as any);
    };
  }, [api]);

  // Autoplay: 11s for video slide, 5s for image slides
  React.useEffect(() => {
    if (!api) return;
    const isVideo = !!heroSlides[current]?.videoUrl;
    const delay = isVideo ? 11000 : 5000;
    const timer = window.setTimeout(() => api.scrollNext(), delay);
    return () => window.clearTimeout(timer);
  }, [api, current]);

  return (
    <section className="bg-white">
      <div className="w-full px-0">
        <div className="relative">
          <Carousel setApi={setApi} opts={{ loop: true }} className="">
            <CarouselContent>
              {heroSlides.map((s, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative h-[360px] sm:h-[420px] md:h-[500px] lg:h-[600px]">
                    {s.videoUrl ? (
                      <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src={s.videoUrl}
                        poster={s.posterUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={s.imageUrl!}
                        alt={s.alt || 'slide'}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    {/* Top-right overlay logo with white badge for contrast */}
                    <div className="hidden sm:block absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 rounded-md shadow p-2">
                      <img
                        src="/uploads/chemifex-logo.png"
                        alt="CHEMIFLEX logo"
                        className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="absolute left-6 sm:left-10 bottom-8 sm:bottom-12 max-w-xl">
                      <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
                        Powering Modern Life
                      </h1>
                      <p className="text-white/90 mt-2 sm:mt-3 hidden sm:block">
                        Connecting you with a world-class portfolio of ingredients and solutions.
                      </p>
                      {s.ctaHref && (
                        <Link
                          to={s.ctaHref}
                          className="mt-4 inline-flex items-center bg-brand-orange hover:brightness-110 text-white font-semibold px-5 py-3 rounded-full"
                        >
                          {s.ctaLabel || 'Learn more'}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-brand-blue border shadow h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full transition-all" />
            <CarouselNext className="right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-brand-blue border shadow h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full transition-all" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Hero;