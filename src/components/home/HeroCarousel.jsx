'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import HeroBannerContent from './banner/HeroBannerContent';
import HeroBannerImage from './banner/HeroBannerImage';
import { useLoading } from '@/context/LoadingContext';
import HeroCarouselSkeleton from './banner/HeroCarouselSkeleton';

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [current, setCurrent] = useState(0);

  const [fade, setFade] = useState(true);

  const getBanners = async () => {
    try {
      startLoading();
      const { data } = await axios.get('/api/banners');

      if (data.success) {
        setSlides(data.banners);
      }
    } catch (error) {
      console.log('Banner Fetch Error', error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [current, slides]);

  const handleNext = () => {
    setFade(false);

    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);

      setFade(true);
    }, 300);
  };

  const goToSlide = (index) => {
    if (index === current) return;

    setFade(false);

    setTimeout(() => {
      setCurrent(index);

      setFade(true);
    }, 300);
  };

  if (loading || !slides.length) {
    return <HeroCarouselSkeleton />;
  }

  const slide = slides[current];

  return (
    <section className="relative py-4 overflow-hidden bg-gradient-to-br from-[#fffaf5] via-white to-[#fdf2f8] dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Background */}

      <div className="absolute -top-40 -right-40 h-[350px] w-[350px] rounded-full bg-rose-200/40 blur-3xl" />

      <div className="absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-amber-200/30 blur-3xl" />

      <div className="absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Content */}

          <div
            className={`transition-all duration-700 ${
              fade
                ? 'translate-x-0 opacity-100'
                : '-translate-x-10 opacity-0'
            } `}
          >
            <HeroBannerContent slide={slide} />
          </div>

          {/* Image */}

          <div
            className={`flex justify-center transition-all duration-700 md:justify-end ${
              fade
                ? 'translate-x-0 opacity-100'
                : 'translate-x-10 opacity-0'
            } `}
          >
            <HeroBannerImage slide={slide} />
          </div>
        </div>

        {/* Dots */}

        <div className="mt-8 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}

              onClick={() => goToSlide(index)}

              className={`rounded-full transition-all duration-300 ${
                current === index
                  ? 'h-2.5 w-8 bg-zinc-900'
                  : 'h-2.5 w-2.5 bg-zinc-300'
              } `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
