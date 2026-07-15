'use client';

import { Menu, Search, Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-[999999] flex h-16 w-full items-center justify-between bg-red-500 px-4">
      {/* Logo */}
      <div
        onClick={() => router.push('/')}
        className="cursor-pointer text-xl font-bold text-pink-500"
      >
        Elegant Touch
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            console.log('Search Click');
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border"
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          onClick={() => {
            router.push('/wish');
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border"
        >
          <Heart size={20} />
        </button>

        <button
          type="button"
          onClick={() => {
            router.push('/cart');
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border"
        >
          <ShoppingCart size={20} />
        </button>

        <button
          type="button"
          onClick={() => {
            console.log('Menu Click');
            setMenuOpen(!menuOpen);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white p-5 shadow-md">
          <ul className="space-y-4">
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Contact</li>
          </ul>
        </div>
      )}
    </header>
  );
}
