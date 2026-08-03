'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Ayesha Khan',
    role: 'Happy Customer',
    rating: 5,
    message:
      'The hair accessories are absolutely beautiful. The quality is amazing and delivery was very fast. Will definitely shop again!',
  },
  {
    id: 2,
    name: 'Sara Ahmed',
    role: 'Regular Buyer',
    rating: 5,
    message:
      'ElegantTouch has the cutest collections for girls. My daughter loved the clips and bands. Highly recommended!',
  },
  {
    id: 3,
    name: 'Fatima Ali',
    role: 'Happy Customer',
    rating: 4,
    message:
      'Beautiful designs, premium packaging and great customer service. The products look even better in real life.',
  },
  {
    id: 4,
    name: 'Zainab Malik',
    role: 'Verified Buyer',
    rating: 5,
    message:
      'Excellent quality products and beautiful packaging. Highly recommended.',
  },
  {
    id: 5,
    name: 'Hina Khan',
    role: 'Customer',
    rating: 5,
    message:
      'Fast delivery and amazing customer support. Loved the experience.',
  },
];

// Infinite loop ke liye duplicate
const carouselItems = [...testimonials, ...testimonials];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(
    testimonials.length,
  );
  const [visibleCards, setVisibleCards] = useState(3);
  const [enableTransition, setEnableTransition] = useState(true);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3); // desktop pe 3 visible
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () =>
      window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setEnableTransition(false);
        setCurrentIndex(5);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setEnableTransition(true);
          });
        });
      }, 700);
    }
  }, [currentIndex]);

  // Auto slide reverse direction (right to left)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev - 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cardWidth = 100 / visibleCards; // Row me total 5 cards
  // const cardWidth = 100 / 3; // Row me total 5 cards

  return (
    <section className="bg-gradient-to-br from-[#fffaf5] via-white to-[#fdf2f8] py-14 dark:from-[#111] dark:via-[#171717] dark:to-[#24191f]">
      <div className="mx-auto max-w-7xl px-2">
        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
            Customer Love
          </span>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600 dark:text-gray-400">
            Real experiences from our lovely customers who trust
            ElegantTouch.
          </p>
        </div>

        {/* Visible Area (sirf 3 cards dikhenge) */}
        <div className="mx-auto w-full overflow-hidden py-4 lg:max-w-7xl">
          <div
            className={`flex ${
              enableTransition
                ? 'transition-transform duration-700 ease-in-out'
                : ''
            }`}
            style={{
              transform: `translateX(-${currentIndex * cardWidth}%)`,
            }}
          >
            {carouselItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="shrink-0 px-3"
                style={{
                  width: `${cardWidth}%`,
                }}
              >
                <div className="flex h-[220px] flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                  {/* Customer */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-pink-200 text-xl font-bold text-pink-600 dark:from-pink-900/40 dark:to-pink-800/40 dark:text-pink-300">
                      {item.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
               <div className="mt-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={15}
                        className={
                          starIndex < item.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="mt-4 flex-1 overflow-hidden text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    "{item.message}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
