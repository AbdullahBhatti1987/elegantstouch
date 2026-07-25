'use client';

import Image from 'next/image';

export default function HeroBannerImage({ slide }) {
  return (
    <div className="relative animate-[float_6s_ease-in-out_infinite]">
      <div className="absolute inset-0 rounded-full bg-pink-200/40 blur-3xl" />

      <div className="relative aspect-square w-[350px] sm:w-[350px] lg:w-[400px]">
        <div className="absolute inset-0 rotate-6 rounded-[30px] bg-gradient-to-br from-pink-100 to-orange-100" />

        <div className="relative h-full overflow-hidden rounded-[30px] border border-white bg-white shadow-xl">
          <Image
            src={slide.image?.thumbnail || slide.image?.url}

            alt={slide.title}

            fill

            priority

            sizes="
(max-width:768px) 240px,
330px
"

            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
