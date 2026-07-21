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
    setFade(false);

    setTimeout(() => {
      setCurrent(index);
      setFade(true);
    }, 300);
  };

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    // <section className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-orange-50 to-pink-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-pink-950">
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff1f2] via-[#fff7ed] to-[#fce7f3] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800">
      {' '}
      {/* Decorative Circle */}
      {/* <div className="bg-primary/10 absolute -top-20 -right-20 h-72 w-72 rounded-full blur-3xl" /> */}
      {/* <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl" /> */}
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-4 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-10">
        {/* Content */}
        <div
          className={`relative z-10 transition-all duration-500 ${
            fade
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'
          } `}
        >
          <span className="bg-primary/10 text-primary inline-flex rounded-full py-1 text-xs font-semibold">
            {slide.subtitle}
          </span>

          <h1 className="text-textcolor  max-w-xl text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
            {slide.title}
          </h1>

          <p className="text-textcolor/70 mt-4 max-w-lg text-sm leading-relaxed sm:text-base">
            {slide.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={slide.primaryBtnLink}
              className="bg-primary rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105"
            >
              {slide.primaryBtnText}
            </Link>

            <Link
              href={slide.secondaryBtnLink}
              className="border-primary text-primary hover:bg-primary rounded-xl border px-6 py-3 text-sm font-semibold transition hover:text-white"
            >
              {slide.secondaryBtnText}
            </Link>
          </div>
        </div>

        {/* Image */}
        <div
          className={`relative flex justify-center transition-all duration-500 md:justify-end ${
            fade ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          } `}
        >
          {/* Image Background */}
          {/* <div className="relative h-[320px] w-[320px] overflow-hidden rounded-3xl bg-white shadow-xl sm:h-[340px] sm:w-[340px] lg:h-[380px] lg:w-[380px]"> */}
          <div className="relative aspect-square w-[90vw] max-w-[320px] overflow-hidden rounded-3xl bg-white shadow-xl sm:max-w-[340px] lg:max-w-[380px]">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="
                (max-width:640px) 260px,
                (max-width:1024px) 320px,
                380px
              "
              className="object-cover transition-transform duration-[3000ms] hover:scale-105"
            />
          </div>
        </div>
      </div>
      {/* Dots */}
      <div className="relative z-10 flex justify-center gap-2 pb-5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? 'bg-primary w-8'
                : 'bg-secondary w-2'
            } `}
          />
        ))}
      </div>
    </section>
  );
}
