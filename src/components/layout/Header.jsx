'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Heart, ShoppingCart } from 'lucide-react';
import { navLinks } from '@/content/data';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const pathname = usePathname();

  const handleSearch = () => {
    const query = searchQuery.trim();

    if (!query) return;

    router.push(`/products?search=${encodeURIComponent(query)}`);
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
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-app/80  sticky top-0 z-50  shadow-sm backdrop-blur-3xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-primary text-xl font-bold"
        >
          Elegant Touch
        </Link>

        {/* Desktop Nav */}
        <nav className="text-textcolor hidden h-full items-center gap-8 text-sm font-medium lg:flex">
          {navLinks.map((link) => {
            const LinkIcon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative inline-flex flex-col items-center justify-center gap-1 transition ${
                  isActive
                    ? 'text-primary'
                    : 'text-textcolor hover:text-primary'
                }`}
              >
                <LinkIcon
                  size={17}
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'text-primary'
                      : 'group-hover:text-primary text-gray-500 group-hover:-translate-y-1'
                  }`}
                />

                <span
                  className={isActive ? 'font-bold' : 'font-medium'}
                >
                  {link.name}
                </span>

                {/* Active underline + Hover underline */}
                <span
                  className={`bg-primary absolute bottom-[-5px] left-0 h-[2px] w-full transition-transform duration-300 ${
                    isActive
                      ? 'scale-x-100'
                      : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Icons */}
        <div className="text-textcolor flex items-center gap-4">
          {/* Search */}
          <div ref={searchRef} className="relative">
            {/* Desktop Search */}
            <div className="hidden lg:block">
              {!searchOpen ? (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="group hover:text-primary transition"
                >
                  <Search
                    size={20}
                    className="mt-2 transition-transform duration-300 group-hover:scale-125"
                  />
                </button>
              ) : (
                <div className="flex h-10 w-72 items-center rounded-xl border border-gray-400 bg-white shadow-sm">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    placeholder="Search..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-white px-3 outline-none"
                  />

                  <button onClick={handleSearch} className="mr-3">
                    <Search size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Icon */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="hover:text-primary lg:hidden"
          >
            <Search size={20} />
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => router.push('/wish')}
            className={`group hover:text-primary relative transition ${
              pathname === '/wish' ? 'text-primary' : ''
            } `}
          >
            <Heart
              size={20}
              fill={pathname === '/wish' ? 'currentColor' : 'none'}
              className="transition-transform duration-300 group-hover:scale-125"
            />
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={() => router.push('/cart')}
            className={`group hover:text-primary relative transition ${
              pathname === '/cart' ? 'text-primary' : ''
            } `}
          >
            <ShoppingCart
              size={20}
              fill={pathname === '/cart' ? 'currentColor' : 'none'}
              className="transition-transform duration-300 group-hover:scale-125"
            />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hover:text-primary transition lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Box */}

      {searchOpen && (
        <div className="border-t bg-white px-4 py-3 lg:hidden">
          <div className="flex h-10 items-center rounded-xl border bg-white shadow">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              placeholder="Search products..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="flex-1 px-3 outline-none"
            />

            <button onClick={handleSearch} className="mr-3">
              <Search size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`border-primary bg-app overflow-hidden border-t transition-all duration-500 ease-in-out lg:hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="text-app flex flex-col gap-4 px-4 py-4">
          {navLinks.map((link, index) => {
            const LinkIcon = link.icon;

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`group hover:text-primary flex items-center gap-3 transition-all duration-500 ${
                  mobileOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <LinkIcon
                  size={20}
                  className="transition-transform duration-300 group-hover:scale-125"
                />

                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
