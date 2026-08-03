'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function SubscriptionModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  useEffect(() => {
    const subscribed = localStorage.getItem('elegantTouchNewsletter');

    if (!subscribed) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setOpen(false);
    localStorage.setItem('elegantTouchNewsletter', 'seen');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="bg-background relative grid w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="text-textcolor hover:text-primary absolute top-4 right-4 z-10 rounded-full bg-white/70 p-2 transition dark:bg-black/40"
        >
          <X size={20} />
        </button>

        {/* Left Image Section */}
        <div className="relative hidden min-h-[550px] md:block">
          <Image
            src="/images/newsletter.jpg"
            alt="Elegant Touch Newsletter"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-center p-8">
          <h2 className="text-textcolor text-2xl font-bold">
            Join Elegants Touch
          </h2>

          <p className="text-textcolor/80 mt-3 text-sm leading-6">
            Subscribe to get updates about new arrivals, special
            offers and exclusive deals.
          </p>

          {/* Form */}
          <form className="mt-6 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="text-textcolor border-secondary focus:border-primary focus:ring-primary/10 h-12 w-full rounded-lg border bg-transparent px-4 text-sm transition outline-none focus:ring-2"
            />

            <button
              type="submit"
              disabled={!isValidEmail}
              className={`h-12 w-full rounded-lg text-sm font-semibold transition ${
                isValidEmail
                  ? 'bg-primary hover:bg-primary/90 cursor-pointer text-white'
                  : 'cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700'
              } `}
            >
              Subscribe
            </button>
          </form>

          {/* Privacy Agreement */}
          <p className="text-textcolor/70 mt-4 text-xs leading-5">
            By subscribing, I agree to receive news and exclusive
            offers from Elegant Touch in accordance with the{' '}
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
