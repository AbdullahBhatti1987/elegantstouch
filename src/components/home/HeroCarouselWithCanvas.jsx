// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// import HeroBannerContent from './banner/HeroBannerContent';
// import HeroBannerImage from './banner/HeroBannerImage';
// import { useLoading } from '@/context/LoadingContext';
// import HeroCarouselSkeleton from './banner/HeroCarouselSkeleton';

// export default function HeroCarousel() {
//   const [slides, setSlides] = useState([]);
//   const { loading, startLoading, stopLoading } = useLoading();
//   const [current, setCurrent] = useState(0);

//   const [fade, setFade] = useState(true);

//   const getBanners = async () => {
//     try {
//       startLoading();
//       const { data } = await axios.get('/api/banners');

//       if (data.success) {
//         setSlides(data.banners);
//       }
//     } catch (error) {
//       console.log('Banner Fetch Error', error);
//     } finally {
//       stopLoading();
//     }
//   };

//   useEffect(() => {
//     getBanners();
//   }, []);

//   useEffect(() => {
//     if (!slides.length) return;

//     const interval = setInterval(() => {
//       handleNext();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [current, slides]);

//   const handleNext = () => {
//     setFade(false);

//     setTimeout(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);

//       setFade(true);
//     }, 300);
//   };

//   const goToSlide = (index) => {
//     if (index === current) return;

//     setFade(false);

//     setTimeout(() => {
//       setCurrent(index);

//       setFade(true);
//     }, 300);
//   };

//   if (loading || !slides.length) {
//     return <HeroCarouselSkeleton />;
//   }

//   const slide = slides[current];

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-[#fffaf5] via-white to-[#fdf2f8]">
//       {/* Background */}

//       <div className="absolute -top-40 -right-40 h-[350px] w-[350px] rounded-full bg-rose-200/40 blur-3xl" />

//       <div className="absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-amber-200/30 blur-3xl" />

//       <div className="absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-100/40 blur-3xl" />

//       <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//         <div className="grid items-center gap-8 md:grid-cols-2">
//           {/* Content */}

//           <div
//             className={`transition-all duration-700 ${
//               fade
//                 ? 'translate-x-0 opacity-100'
//                 : '-translate-x-10 opacity-0'
//             } `}
//           >
//             <HeroBannerContent slide={slide} />
//           </div>

//           {/* Image */}

//           <div
//             className={`flex justify-center transition-all duration-700 md:justify-end ${
//               fade
//                 ? 'translate-x-0 opacity-100'
//                 : 'translate-x-10 opacity-0'
//             } `}
//           >
//             <HeroBannerImage slide={slide} />
//           </div>
//         </div>

//         {/* Dots */}

//         <div className="mt-8 flex justify-center gap-3">
//           {slides.map((_, index) => (
//             <button
//               key={index}

//               onClick={() => goToSlide(index)}

//               className={`rounded-full transition-all duration-300 ${
//                 current === index
//                   ? 'h-2.5 w-8 bg-zinc-900'
//                   : 'h-2.5 w-2.5 bg-zinc-300'
//               } `}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import HeroBannerContent from './banner/HeroBannerContent';
// Hম 'HeroBannerImage' ko alag se use nahi karenge,
// balki background image ke taur par use karenge.
import { useLoading } from '@/context/LoadingContext';
import HeroCarouselSkeleton from './banner/HeroCarouselSkeleton';
import HeroBannerContentWithCanvas from './banner/HeroBannerContentWithCanvas';

export default function HeroCarouselWithCanvas() {
  const [slides, setSlides] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const getBanners = async () => {
    try {
      startLoading();
      // NOTE: Apni API URL yahan ensure karein
      const { data } = await axios.get('/api/banners');

      if (data.success) {
        // Assuming API sends { success: true, banners: [...] }
        setSlides(data.banners);
      }
    } catch (error) {
      console.log('Banner Fetch Error', error);
      setSlides([]); // Error ki soorat mein empty array
    } finally {
      stopLoading(); // Success ho ya error, loading yahan band hogi
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return; // Auto-play sirf tab jab 1 se zyada slides hon

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [current, slides]);

  const handleNext = () => {
    if (slides.length === 0) return;
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setFade(true);
    }, 300);
  };

  const goToSlide = (index) => {
    if (index === current || slides.length === 0) return;
    setFade(false);
    setTimeout(() => {
      setCurrent(index);
      setFade(true);
    }, 300);
  };

  // Loading ya data na hone parskeleton dikhayen
  if (loading || slides.length === 0) {
    return <HeroCarouselSkeleton />;
  }

  const slide = slides[current];

  // Naya UI Structure (Full Width Image Background)
  return (
    <section className="relative h-[70vh] w-full overflow-hidden md:h-[80vh] lg:h-[85vh]">
      {/* Background Image Container */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src={slide.image?.url}
          alt={slide.title}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Overlay taake text dikhai de (Black gradient) */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container - Centered or Left Aligned */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Content ko humne pehle wale grid se nikal kar yahan rakha hai */}
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            fade
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          } `}
        >
          <HeroBannerContentWithCanvas slide={slide} />
        </div>
      </div>

      {/* Navigation Dots - positioned absolutely over the image */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              current === index
                ? 'h-3 w-10 bg-white' // Active dot (white aur lamba)
                : 'h-3 w-3 bg-white/50 hover:bg-white' // Inactive dot
            } `}
          />
        ))}
      </div>
    </section>
  );
}
