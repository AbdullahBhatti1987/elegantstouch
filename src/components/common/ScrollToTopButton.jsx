'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton({
  scrollRef,
  className = '',
}) {
  const [visible, setVisible] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const container = scrollRef?.current;

    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;

      const distanceFromBottom =
        container.scrollHeight -
        (container.scrollTop + container.clientHeight);

      // show after 250px scroll
      setVisible(scrollTop > 250);

      // bottom se 500px pehle dark
      setDark(distanceFromBottom < 500);
    };

    handleScroll();

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef]);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed right-5 bottom-24 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-105 ${dark ? 'bg-black' : 'bg-primary'} ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      } ${className} `}
    >
      <ChevronUp size={22} />
    </button>
  );
}
