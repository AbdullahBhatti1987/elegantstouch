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
              className={`group hover:text-primary relative inline-block transition ${
                pathname === link.href ? 'font-bold' : ''
              } `}
            >
              {link.name}

              <span className="bg-primary absolute bottom-[-4px] left-0 h-[3px] w-full origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="text-textcolor flex items-center gap-4">
          {/* Search */}
          <div
            ref={searchRef}
            className={`relative overflow-hidden transition-all duration-300 ${
              searchOpen ? 'w-72' : 'w-5'
            }`}
          >
            {!searchOpen ? (
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="group hover:text-primary transition"
              >
                <Search
                  size={20}
                  className="mt-2 transition-transform duration-300 group-hover:scale-125"
                />
              </button>
            ) : (
              <div
                className={`flex h-10 origin-right items-center rounded-xl border border-gray-400 bg-white shadow-sm transition-all duration-300 ${searchOpen ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'} `}
              >
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  placeholder="Search ..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className={
                    'flex-1 bg-white px-2 text-sm outline-none'
                  }
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  className="hover:text-primary mr-3 transition"
                >
                  <Search size={20} />
                </button>
              </div>
            )}
          </div>

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
