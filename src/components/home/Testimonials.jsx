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

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
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
    const maxIndex = testimonials.length - visibleCards;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= maxIndex ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [visibleCards]);

  return (
  <section className="bg-gradient-to-br from-[#fffaf5] via-white to-[#fdf2f8] py-14 dark:from-[#111] dark:via-[#171717] dark:to-[#24191f]">
  <div className="mx-auto max-w-7xl px-4">

    {/* Heading */}
    <div className="mb-10 text-center">
      <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
        Customer Love
      </span>

      <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
        What Our Customers Say
      </h2>

      <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600 dark:text-gray-400">
        Real experiences from our lovely customers who trust ElegantTouch.
      </p>
    </div>


    {/* Slider */}
    <div className="overflow-hidden -mx-3">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
        }}
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="w-full shrink-0 px-3 md:w-1/2 lg:w-1/3"
          >
            <div
              className="
                h-full
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                dark:border-neutral-800
                dark:bg-neutral-900
              "
            >

              {/* Customer */}
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-pink-200
                    bg-pink-50
                    text-xl
                    font-bold
                    text-pink-600
                    dark:border-pink-500
                    dark:bg-pink-900/30
                    dark:text-pink-300
                  "
                >
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
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    className={
                      index < item.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>


              {/* Review */}
              <p
                className="
                  mt-3
                  line-clamp-3
                  text-sm
                  leading-relaxed
                  text-gray-600
                  dark:text-gray-300
                "
              >
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