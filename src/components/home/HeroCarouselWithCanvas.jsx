'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import HeroCanvasSkeleton from './banner/HeroCanvasSkeleton';

export default function HeroCarouselWithCanvas() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const timerRef = useRef(null);

  // Fetch banners
  const getBanners = async () => {
    try {
      const { data } = await axios.get('/api/banners');

      if (data.success) {
        setSlides(data.banners);
      }
    } catch (error) {
      console.error('Banner Fetch Error:', error);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  // Next slide

  const nextSlide = useCallback(() => {
    setCurrent((prev) => {
      if (prev === slides.length - 1) {
        return 0;
      }

      return prev + 1;
    });
  }, [slides.length]);

  // Previous slide

  const prevSlide = useCallback(() => {
    setCurrent((prev) => {
      if (prev === 0) {
        return slides.length - 1;
      }

      return prev - 1;
    });
  }, [slides.length]);

  // Autoplay

  useEffect(() => {
    if (paused || slides.length <= 1) {
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [paused, slides.length, nextSlide]);

  // Keyboard navigation

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      }

      if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [nextSlide, prevSlide]);

  // Touch swipe

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;

    if (distance > 50) {
      nextSlide();
    }

    if (distance < -50) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!slides.length) {
    return <HeroCanvasSkeleton />;
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-50 dark:bg-slate-950"

      onMouseEnter={() => setPaused(true)}

      onMouseLeave={() => setPaused(false)}

      onTouchStart={handleTouchStart}

      onTouchMove={handleTouchMove}

      onTouchEnd={handleTouchEnd}
    >
      {/* SLIDER */}

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide._id || index}

            className="min-w-full"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 md:px-8 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-20">
              {/* CONTENT */}

              <div className="lg:col-span-6">
                <div className="mb-5 flex gap-3">
                  {slide.badge && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      <Sparkles size={14} />

                      {slide.badge}
                    </span>
                  )}

                  {slide.discount && (
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                      {slide.discount}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                  {slide.title}
                </h1>

                {slide.subtitle && (
                  <h2 className="mt-4 text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                    {slide.subtitle}
                  </h2>
                )}

                {slide.description && (
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    {slide.description}
                  </p>
                )}

                <div className="mt-8 flex gap-4">
                  {slide.primaryBtnText && (
                    <Link
                      href={slide.primaryBtnLink || '#'}

                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-white shadow-lg transition hover:-translate-y-1"
                    >
                      {slide.primaryBtnText}

                      <ArrowRight size={18} />
                    </Link>
                  )}

                  {slide.secondaryBtnText && (
                    <Link
                      href={slide.secondaryBtnLink || '#'}

                      className="rounded-xl border px-8 py-4 text-slate-700 dark:text-white"
                    >
                      {slide.secondaryBtnText}
                    </Link>
                  )}
                </div>
              </div>

              {/* IMAGE */}

              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border shadow-2xl">
                  <Image
                    src={
                      slide.image?.url || '/images/placeholder.jpg'
                    }

                    alt={slide.title || 'Elegant Touch'}

                    fill

                    priority={index === 0}

                    sizes="50vw"

                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LEFT ARROW */}

      <button
        onClick={prevSlide}

        className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-lg dark:bg-slate-900/80"
      >
        <ChevronLeft />
      </button>

      {/* RIGHT ARROW */}

      <button
        onClick={nextSlide}

        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-lg dark:bg-slate-900/80"
      >
        <ChevronRight />
      </button>

      {/* DOTS */}

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}

            onClick={() => setCurrent(index)}

            className={`h-3 rounded-full transition-all ${
              current === index
                ? 'w-10 bg-indigo-600'
                : 'w-3 bg-slate-300'
            } `}
          />
        ))}
      </div>
    </section>
  );
}
