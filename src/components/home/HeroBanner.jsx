'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner({ slide }) {
  return (
    <>
      {/* Content */}

      <div>
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
            className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white"
          >
            {slide.primaryBtnText || 'Shop Now'}
          </Link>

          <Link
            href={slide.secondaryBtnLink || '/categories'}
            className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700"
          >
            {slide.secondaryBtnText || 'Explore'}
          </Link>
        </div>
      </div>

      {/* Image */}

      <div className="flex justify-center md:justify-end">
        <div className="relative aspect-square w-[240px] sm:w-[280px] lg:w-[400px]">
          <div className="absolute inset-0 rotate-6 rounded-[30px] bg-gradient-to-br from-pink-100 to-orange-100" />

          <div className="relative h-full overflow-hidden rounded-[30px] border border-white bg-white shadow-xl">
            <Image
              src={slide.image?.thumbnail || slide.image?.url}

              alt={slide.title}

              fill

              className="object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
