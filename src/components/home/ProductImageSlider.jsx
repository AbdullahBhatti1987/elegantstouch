'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProductImageSlider() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [enableTransition, setEnableTransition] = useState(true);

  // Fetch Products Images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/products/sliderImages');

        const result = await res.json();

        if (result.success) {
          const images = result.data;

          /*
            3 copies:
            [1 2 3 4 5]
            [1 2 3 4 5]
            [1 2 3 4 5]

            middle copy se start
          */

          setProducts([...images, ...images, ...images]);

          setCurrentIndex(images.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, []);

  // Responsive cards
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(3);
      } else {
        setVisibleCards(2);
      }
    };

    updateCards();

    window.addEventListener('resize', updateCards);

    return () => {
      window.removeEventListener('resize', updateCards);
    };
  }, []);

  // Auto Slider

  useEffect(() => {
    if (!products.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [products]);

  // Invisible Reset

  useEffect(() => {
    if (!products.length) return;

    const originalLength = products.length / 3;

    /*
      second copy ke end par
    */

    if (currentIndex >= originalLength * 2) {
      setTimeout(() => {
        setEnableTransition(false);

        setCurrentIndex(originalLength);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setEnableTransition(true);
          });
        });
      }, 700);
    }
  }, [currentIndex, products.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const cardWidth = 100 / visibleCards;

  if (!products.length) return null;

  return (
    <section className="bg-white py-12 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Featured Products
          </h2>
        </div>

        <div className="relative overflow-visible">
          {/* LEFT BUTTON */}

          <button
            onClick={prevSlide}

            className="absolute top-1/2 left-2 z-50 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-gray-700 shadow-lg transition hover:scale-110 hover:bg-pink-600 hover:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          >
            <ChevronLeft size={25} strokeWidth={2.5} />
          </button>

          {/* SLIDER */}

          <div className="-mx-3 overflow-hidden py-4">
            <div
              className={`flex ${
                enableTransition
                  ? 'transition-transform duration-700 ease-in-out'
                  : ''
              } `}

              style={{
                transform: `translateX(-${currentIndex * cardWidth}%)`,
              }}
            >
              {products.map((item, index) => (
                <div
                  key={`${item._id}-${index}`}

                  className="shrink-0 px-3"

                  style={{
                    width: `${cardWidth}%`,
                  }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-neutral-900">
                    <Image
                      src={item.image}

                      alt="Product Image"

                      fill
                      loading="eager"
                      sizes="
(max-width:768px) 50vw,
25vw
"

                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT BUTTON */}

          <button
            onClick={nextSlide}

            className="absolute top-1/2 right-2 z-50 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-gray-700 shadow-lg transition hover:scale-110 hover:bg-pink-600 hover:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          >
            <ChevronRight size={25} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
