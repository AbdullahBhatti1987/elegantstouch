"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
    }, 200); // fade out time
  };

  const goToSlide = (index) => {
    setFade(false);

    setTimeout(() => {
      setCurrent(index);
      setFade(true);
    }, 200);
  };

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    <section className="bg-appbg border-b border-secondary">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

        {/* Left Content (Fade) */}
        <div
          className={`transition-all duration-500 ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-primary font-medium">{slide.subtitle}</p>

          <h1 className="text-3xl lg:text-5xl font-bold text-textcolor mt-3 leading-tight">
            {slide.title}
          </h1>

          <p className="text-textcolor mt-4 text-sm lg:text-base opacity-80">
            {slide.description}
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              href={slide.primaryBtnLink}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              {slide.primaryBtnText}
            </Link>

            <Link
              href={slide.secondaryBtnLink}
              className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition"
            >
              {slide.secondaryBtnText}
            </Link>
          </div>
        </div>

        {/* Right Image (Fade) */}
        <div
          className={`flex justify-center lg:justify-end transition-all duration-500 ${
            fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full max-w-md lg:max-w-lg rounded-xl"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-primary w-6"
                : "bg-secondary w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}