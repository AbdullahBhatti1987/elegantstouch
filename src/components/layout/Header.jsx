'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Heart, ShoppingCart } from 'lucide-react';
import { navLinks } from '@/content/data';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const handleSearch = () => {
    const query = searchQuery.trim();

    if (!query) return;

    router.push(`/products?search=${encodeURIComponent(query)}`);

    setSearchOpen(false);
  };

  const fetchCounts = async () => {
    try {
      const [wishRes, cartRes] = await Promise.all([
        axios.get('/api/wishlist/count'),
        axios.get('/api/cart/count'),
      ]);

      setWishlistCount(wishRes.data.count);
      setCartCount(cartRes.data.count);
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
  fetchCounts();

  const handleClickOutside = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setSearchOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener(
      'mousedown',
      handleClickOutside
    );
  };
}, []);


  return (
    <header className="bg-app/80 border-primary sticky top-0 z-50 border-b shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-primary text-xl font-bold"
        >
          {/* <Link href="/" className="text-primary font-bold text-xl"> */}
          Elegant Touch
        </Link>

        {/* Desktop Nav */}
        <nav className="text-textcolor hidden gap-8 text-sm font-medium lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-primary transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="text-textcolor flex items-center gap-4">
          {/* Search */}

          {/* Search */}
          <div ref={searchRef} className="relative">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((prev) => !prev)}
              className="group hover:text-primary relative z-10 transition"
            >
              <Search
                size={20}
                className="transition-all duration-300 group-hover:scale-125"
              />
            </button>

            <div
              className={`bg-app absolute top-1/2 right-8 flex h-11 -translate-y-1/2 items-center overflow-hidden rounded-full border shadow-lg transition-all duration-300 ${
                searchOpen
                  ? 'w-72 opacity-100'
                  : 'pointer-events-none w-0 opacity-0'
              }`}
            >
              <input
                autoFocus={searchOpen}
                type="text"
                value={searchQuery}
                placeholder="Search products..."
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                className="flex-1 bg-transparent px-4 text-sm outline-none"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="hover:text-primary mr-3 transition"
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Wishlist */}
          <button
            type="button"
            aria-label={`Wishlist (${wishlistCount} items)`}
            onClick={() => router.push('/wish')}
            className="group hover:text-primary relative transition"
          >
            <Heart
              size={20}
              className="transition-transform duration-300 group-hover:scale-125"
            />

            {wishlistCount > 0 && (
              <span
                className="bg-primary absolute -top-2 -right-2 min-w-[18px] rounded-full px-1 text-center text-xs text-white"
                aria-hidden="true"
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            type="button"
            aria-label={`Cart (${cartCount} items)`}
            onClick={() => router.push('/cart')}
            className="group hover:text-primary relative transition"
          >
            <ShoppingCart
              size={20}
              className="transition-transform duration-300 group-hover:scale-125"
            />

            {cartCount > 0 && (
              <span
                className="bg-primary absolute -top-2 -right-2 min-w-[18px] rounded-full px-1 text-center text-xs text-white"
                aria-hidden="true"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            className="hover:text-primary aria-label transition lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="bg-app border-primary border-t px-4 pb-4 lg:hidden">
          <nav className="text-app mt-3 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="hover:text-primary transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
