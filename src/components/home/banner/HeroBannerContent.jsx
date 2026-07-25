'use client';

import Link from 'next/link';

export default function HeroBannerContent({ slide }) {
  return (
    <>
      <span className="inline-flex rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-rose-700 uppercase">
        {slide.subtitle}
      </span>

      <h1 className="mt-4 max-w-xl text-3xl leading-tight font-black text-zinc-900 sm:text-4xl lg:text-5xl">
        {slide.title}
      </h1>

      <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600 sm:text-base">
        {slide.description}
      </p>

      {/* <div className="mt-6 flex flex-wrap gap-3">
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
      </div> */}
    </>
  );
}
