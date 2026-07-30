// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// import HeroCarouselSkeleton from './banner/HeroCarouselSkeleton';
// import HeroBannerContentWithCanvas from './banner/HeroBannerContentWithCanvas';
// import Image from 'next/image';

// export default function HeroCarouselWithCanvas() {
//   const [slides, setSlides] = useState([]);
//   const { loading, setLoading} = useState(true);
//   const [current, setCurrent] = useState(0);
//   const [fade, setFade] = useState(true);

//   const getBanners = async () => {
//     try {
//       setLoading(true);
//       // NOTE: Apni API URL yahan ensure karein
//       const { data } = await axios.get('/api/banners');

//       if (data.success) {
//         // Assuming API sends { success: true, banners: [...] }
//         setSlides(data.banners);
//       }
//     } catch (error) {
//       console.log('Banner Fetch Error', error);
//       setSlides([]); // Error ki soorat mein empty array
//     } finally {
//       setLoading(false); // Success ho ya error, loading yahan band hogi
//     }
//   };

//   useEffect(() => {
//     getBanners();
//   }, []);

//   useEffect(() => {
//     if (slides.length <= 1) return; // Auto-play sirf tab jab 1 se zyada slides hon

//     const interval = setInterval(() => {
//       handleNext();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [current, slides]);

//   const handleNext = () => {
//     if (slides.length === 0) return;
//     setFade(false);
//     setTimeout(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//       setFade(true);
//     }, 300);
//   };

//   const goToSlide = (index) => {
//     if (index === current || slides.length === 0) return;
//     setFade(false);
//     setTimeout(() => {
//       setCurrent(index);
//       setFade(true);
//     }, 300);
//   };

//   // Loading ya data na hone parskeleton dikhayen
//   if (loading || slides.length === 0) {
//     return <HeroCarouselSkeleton />;
//   }

//   const slide = slides[current];

//   // Naya UI Structure (Full Width Image Background)
//   return (
//     <section className="relative h-[70vh] w-full overflow-hidden md:h-[80vh] lg:h-[85vh]">
//       {/* Background Image Container */}
//       <div className="absolute inset-0 h-full w-full">
//         <Image
//           src={slide.image?.url}
//           alt={slide.title}
//           priority
//           className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
//             fade ? 'opacity-100' : 'opacity-0'
//           }`}
//         />
//         {/* Overlay taake text dikhai de (Black gradient) */}
//         <div className="absolute inset-0 bg-black/40" />
//       </div>

//       {/* Content Container - Centered or Left Aligned */}
//       <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
//         {/* Content ko humne pehle wale grid se nikal kar yahan rakha hai */}
//         <div
//           className={`max-w-3xl transition-all duration-700 ease-out ${
//             fade
//               ? 'translate-y-0 opacity-100'
//               : 'translate-y-10 opacity-0'
//           } `}
//         >
//           <HeroBannerContentWithCanvas slide={slide} />
//         </div>
//       </div>

//       {/* Navigation Dots - positioned absolutely over the image */}
//       <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 justify-center gap-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             aria-label={`Go to slide ${index + 1}`}
//             className={`rounded-full transition-all duration-300 ${
//               current === index
//                 ? 'h-3 w-10 bg-white' // Active dot (white aur lamba)
//                 : 'h-3 w-3 bg-white/50 hover:bg-white' // Inactive dot
//             } `}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

import HeroBannerContentWithCanvas from './banner/HeroBannerContentWithCanvas';
import HeroCanvasSkeleton from './banner/HeroCanvasSkeleton';

export default function HeroCarouselWithCanvas() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  async function getBanners() {
    try {
      const { data } = await axios.get('/api/banners');

      if (data.success) {
        setSlides(data.banners);
      }
    } catch (error) {
      console.error('Banner Fetch Error', error);
    }
  }

  useEffect(() => {
    getBanners();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

if (!slides.length) {
  return <HeroCanvasSkeleton />;
}

  const slide = slides[current];

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden md:h-[80vh] lg:h-[85vh]">
      {/* Hero Image */}

      <div className="absolute inset-0">
        <Image
          src={slide.image.url}
          alt={slide.title || 'Elegant Touch'}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="animate-in fade-in max-w-3xl duration-700">
          <HeroBannerContentWithCanvas slide={slide} />
        </div>
      </div>

      {/* Dots */}

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}

            aria-label={`Go to slide ${index + 1}`}

            onClick={() => setCurrent(index)}

            className={`rounded-full transition-all ${
              current === index
                ? 'h-3 w-10 bg-white'
                : 'h-3 w-3 bg-white/50'
            } `}
          />
        ))}
      </div>
    </section>
  );
}
