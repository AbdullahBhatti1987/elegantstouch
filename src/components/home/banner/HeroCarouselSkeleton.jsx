'use client';

export default function HeroCarouselSkeleton() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fffaf5] via-white to-[#fdf2f8]">
      {/* Background */}

      <div className="absolute -top-40 -right-40 h-[350px] w-[350px] rounded-full bg-rose-200/20 blur-3xl" />

      <div className="absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Content Skeleton */}

          <div className="animate-pulse">
            <div className="h-8 w-28 rounded-full bg-zinc-200" />
            <div className="mt-5 h-10 w-full max-w-md rounded bg-zinc-200" />
            <div className="mt-3 h-10 w-4/5 rounded bg-zinc-200" />
            <div className="mt-6 h-4 w-full max-w-lg rounded bg-zinc-200" />
            <div className="mt-3 h-4 w-5/6 rounded bg-zinc-200" />
            <div className="mt-3 h-4 w-3/4 rounded bg-zinc-200" />
            {/* <div className="mt-8 flex gap-3">
              <div className="h-11 w-32 rounded-xl bg-zinc-200" />
              <div className="h-11 w-32 rounded-xl bg-zinc-200" />
            </div> */}
          </div>

          {/* Image Skeleton */}

          <div className="flex justify-center md:justify-end">
            <div className="animate-pulse">
              <div className="h-[350px] w-[350px] rounded-[30px] bg-zinc-200 lg:h-[400px] lg:w-[400px]" />
            </div>
          </div>
        </div>

        {/* Dots */}

        <div className="mt-8 flex justify-center gap-3">
          <div className="h-2.5 w-8 rounded-full bg-zinc-200" />
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
        </div>
      </div>
    </section>
  );
}
