'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HeroCarouselNew({
  slides = [],
  autoPlayInterval = 5000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const length = slides.length;
  const timeoutRef = useRef(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === length - 1 ? 0 : prevIndex + 1,
    );
  }, [length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? length - 1 : prevIndex - 1,
    );
  }, [length]);

  useEffect(() => {
    if (!isPaused && length > 0) {
      clearTimer();
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, autoPlayInterval);
    }
    return () => clearTimer();
  }, [currentIndex, isPaused, nextSlide, autoPlayInterval, length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!slides || length === 0) return null;

  return (
    <section
      aria-label="E-Commerce Hero Carousel"
      className="relative w-full overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={slide.id || index}
              className="relative flex min-w-full flex-shrink-0 items-center justify-center px-4 py-12 sm:px-8 md:py-20 lg:px-16 lg:py-24"
              aria-hidden={!isActive}
            >
              <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Content Side */}
                <div className="z-10 order-2 flex flex-col items-start text-left lg:order-1 lg:col-span-6">
                  {/* Badge & Discount */}
                  <div
                    className={`mb-4 flex transform flex-wrap items-center gap-3 transition-all duration-700 ${
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: '100ms' }}
                  >
                    {slide.badge && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/50 bg-indigo-100 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-700 uppercase shadow-sm dark:border-indigo-800/50 dark:bg-indigo-950/80 dark:text-indigo-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        {slide.badge}
                      </span>
                    )}
                    {slide.discount && (
                      <span className="inline-flex items-center rounded-full border border-rose-200/50 bg-rose-100 px-3 py-1 text-xs font-bold tracking-wide text-rose-700 uppercase shadow-sm dark:border-rose-800/50 dark:bg-rose-950/80 dark:text-rose-300">
                        {slide.discount}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1
                    className={`mb-3 transform text-3xl font-extrabold tracking-tight text-slate-900 transition-all duration-700 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white ${
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-6 opacity-0'
                    }`}
                    style={{ transitionDelay: '200ms' }}
                  >
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <h2
                    className={`mb-4 transform text-lg font-medium text-indigo-600 transition-all duration-700 sm:text-xl dark:text-indigo-400 ${
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-6 opacity-0'
                    }`}
                    style={{ transitionDelay: '300ms' }}
                  >
                    {slide.subtitle}
                  </h2>

                  {/* Description */}
                  <p
                    className={`mb-8 max-w-xl transform text-base leading-relaxed text-slate-600 transition-all duration-700 sm:text-lg dark:text-slate-300 ${
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: '400ms' }}
                  >
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div
                    className={`flex transform flex-wrap items-center gap-4 transition-all duration-700 ${
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: '500ms' }}
                  >
                    {slide.primaryBtnText && (
                      <Link
                        href={slide.primaryBtnLink || '#'}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none active:translate-y-0 dark:shadow-indigo-900/40 dark:focus:ring-offset-slate-950"
                      >
                        {slide.primaryBtnText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    {slide.secondaryBtnText && (
                      <Link
                        href={slide.secondaryBtnLink || '#'}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-8 py-4 font-medium text-slate-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-none active:translate-y-0 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-950"
                      >
                        {slide.secondaryBtnText}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Image Side */}
                <div className="order-1 flex items-center justify-center lg:order-2 lg:col-span-6">
                  <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200/50 bg-slate-200 shadow-2xl sm:aspect-[16/10] md:rounded-3xl lg:aspect-[4/3] dark:border-slate-800/50 dark:bg-slate-800">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt || slide.title}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover transition-transform duration-1000 ease-out ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none active:scale-95 dark:border-slate-800/80 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-900"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none active:scale-95 dark:border-slate-800/80 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-900"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
              currentIndex === index
                ? 'w-8 bg-indigo-600 dark:bg-indigo-400'
                : 'w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
