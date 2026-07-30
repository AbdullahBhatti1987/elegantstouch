import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

import HeroBannerContentWithCanvas from './banner/HeroBannerContentWithCanvas';
import HeroCanvasSkeleton from './banner/HeroCanvasSkeleton';

export default function HeroCarouselWithCanvas() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  async function getBanners() {
    try {
      const { data } = await axios.get('/api/banners');

      if (data.success) {
        setSlides(data.banners);
      }
    } catch (error) {
      console.error('Banner Fetch Error', error);
    }
  }

  useEffect(() => {
    getBanners();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) {
    return <HeroCanvasSkeleton />;
  }

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[8/3] w-full">
        <Image
          src={slide.image.url || '/images/placeholder.jpg'}
          alt={slide.title || 'Elegant Touch'}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />

        <div className="absolute inset-0 bg-black/0" />
      </div>

      {/* Content */}

      {/* <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="animate-in fade-in max-w-3xl duration-700">
          <HeroBannerContentWithCanvas slide={slide} />
        </div>
      </div> */}

      {/* Dots */}

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}

            aria-label={`Go to slide ${index + 1}`}

            onClick={() => setCurrent(index)}

            className={`rounded-full transition-all ${
              current === index
                ? 'h-3 w-10 bg-white'
                : 'h-3 w-3 bg-white/50'
            } `}
          />
        ))}
      </div>
    </section>
  );
}
