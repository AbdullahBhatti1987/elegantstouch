'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroCarousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

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

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fffaf5] via-white to-[#fdf2f8]">
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
            }`}
          >
            <span className="inline-flex rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-rose-700 uppercase">
              {slide.subtitle}
            </span>

            <h1 className="mt-4 max-w-xl text-3xl leading-tight font-black text-zinc-900 sm:text-4xl lg:text-5xl">
              {slide.title}
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600 sm:text-base">
              {slide.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={slide.primaryBtnLink || '/products'}
                className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105"
              >
                {slide.primaryBtnText || 'Shop Now'}
              </Link>

              <Link
                href={slide.secondaryBtnLink || '/categories'}
                className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
              >
                {slide.secondaryBtnText || 'Explore'}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div
            className={`flex justify-center transition-all duration-700 md:justify-end ${
              fade
                ? 'translate-x-0 opacity-100'
                : 'translate-x-10 opacity-0'
            }`}
          >
            <div className="relative animate-[float_6s_ease-in-out_infinite]">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-pink-200/40 blur-3xl" />

              <div className="relative aspect-square w-[240px] sm:w-[280px] lg:w-[330px]">
                <div className="absolute inset-0 rotate-6 rounded-[30px] bg-gradient-to-br from-pink-100 to-orange-100" />

                <div className="relative h-full overflow-hidden rounded-[30px] border border-white bg-white shadow-xl">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    sizes="(max-width:768px) 240px, 330px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
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
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
