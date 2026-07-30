
import Link from 'next/link';

export default function HeroBannerContentWithCanvas({ slide }) {
  return (
    <div className="text-left">
      {/* Subtitle */}
      <span className="inline-flex rounded-full bg-rose-600/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-rose-100 uppercase shadow-inner backdrop-blur-sm">
        {slide.subtitle}
      </span>

      {/* Title */}
      <h1 className="mt-4 text-4xl leading-tight font-extrabold text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
        {slide.title}
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-200 drop-shadow sm:text-lg">
        {slide.description}
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={slide.primaryBtnLink || '/products'}
          className="rounded-full bg-rose-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:scale-105 hover:bg-rose-700 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:outline-none"
        >
          {slide.primaryBtnText || 'Shop Now'}
        </Link>

        <Link
          href={slide.secondaryBtnLink || '/categories'}
          className="rounded-full bg-white/10 px-8 py-3.5 text-sm font-bold text-white shadow-md ring-1 ring-white/30 backdrop-blur-sm transition hover:bg-white/20 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20 focus:outline-none"
        >
          {slide.secondaryBtnText || 'Explore'}
        </Link>
      </div>
    </div>
  );
}
