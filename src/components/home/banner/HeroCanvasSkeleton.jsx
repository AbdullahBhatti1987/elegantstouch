export default function HeroCanvasSkeleton() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full animate-pulse overflow-hidden bg-gray-200 md:h-[80vh] lg:h-[85vh]">
      {/* Background image skeleton */}
      <div className="absolute inset-0 bg-gray-300 dark:bg-neutral-800" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          {/* Subtitle */}
          <div className="h-7 w-32 rounded-full bg-white/30" />

          {/* Heading */}
          <div className="space-y-3">
            <div className="h-12 w-[280px] rounded-lg bg-white/30 sm:w-[420px]" />

            <div className="h-12 w-[220px] rounded-lg bg-white/30 sm:w-[350px]" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full max-w-xl rounded bg-white/30" />

            <div className="h-4 w-4/5 max-w-lg rounded bg-white/30" />

            <div className="h-4 w-3/5 max-w-md rounded bg-white/30" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-36 rounded-full bg-white/30" />

            <div className="h-12 w-36 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        <div className="h-3 w-10 rounded-full bg-white/40" />

        <div className="h-3 w-3 rounded-full bg-white/30" />

        <div className="h-3 w-3 rounded-full bg-white/30" />
      </div>
    </section>
  );
}
