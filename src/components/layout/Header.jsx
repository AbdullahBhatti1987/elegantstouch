'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
} from 'lucide-react';

import { navLinks } from '@/content/data';
import { useRouter, usePathname } from 'next/navigation';

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

import Image from 'next/image';
import axios from 'axios';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const searchRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [categories, setCategories] = useState([]);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories/dropdown');

        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.log('HEADER CATEGORY ERROR:', error);
      }
    };

    fetchCategories();
  }, []);

  // Outside Click Search
  useEffect(() => {
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

  const handleSearch = () => {
    const query = searchQuery.trim();

    if (!query) return;

    router.push(`/products?search=${encodeURIComponent(query)}`);

    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-3xl dark:bg-zinc-950/80">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* LOGO */}

        <Link
          href="/dashboard"
          className="relative block h-10 w-24 md:h-12 md:w-36"
        >
          <Image
            src="/images/logo2.png"
            alt="Elegants Touch"
            fill
            sizes="150px"
            className="object-contain"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            const isCategory = link.name === 'Categories';

            const active = pathname === link.href;

            return (
              <div key={link.name} className="group relative">
                <Link
                  href={isCategory ? '#' : link.href}

                  className={`relative flex flex-col items-center gap-1 transition ${
                    active
                      ? 'text-primary'
                      : 'text-textcolor hover:text-primary'
                  } `}
                >
                  <Icon
                    size={17}
                    className="group-hover:text-primary text-gray-500 transition group-hover:-translate-y-1"
                  />

                  <span>{link.name}</span>

                  <span
                    className={`bg-primary absolute -bottom-1 h-0.5 w-full transition-transform ${
                      active
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    } `}
                  />
                </Link>

                {/* CATEGORY DROPDOWN */}

                {isCategory && (
                  <div className="invisible absolute top-full left-0 z-50 w-64 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-gray-100 bg-white px-2 py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                      {categories.length ? (
                        categories.map((category) => (
                          <Link
                            key={category._id}
                            href={`/categories/${category._id}`}
                            className="hover:text-primary block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-800"
                          >
                            {category.name}
                          </Link>
                        ))
                      ) : (
                        <p className="px-4 py-3 text-sm text-gray-400">
                          No Categories
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* RIGHT ICONS */}

        <div className="flex items-center gap-4">
          {/* SEARCH */}

          <div ref={searchRef} className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-primary"
            >
              <Search size={20} />
            </button>

            {searchOpen && (
              <div className="absolute top-8 right-0 hidden w-64 rounded-xl border bg-white p-2 shadow-xl lg:flex">
                <input
                  autoFocus

                  value={searchQuery}

                  onChange={(e) => setSearchQuery(e.target.value)}

                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}

                  placeholder="Search..."

                  className="flex-1 px-2 outline-none"
                />

                <button onClick={handleSearch}>
                  <Search size={18} />
                </button>
              </div>
            )}
          </div>

          {/* WISHLIST */}

          <button
            onClick={() => router.push('/wishlists')}
            className="hover:text-primary relative"
          >
            <Heart size={20} />

            <span className="bg-primary absolute -top-3 -right-3 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
              {wishlistCount}
            </span>
          </button>

          {/* CART */}

          <button
            onClick={() => router.push('/carts')}
            className="hover:text-primary relative"
          >
            <ShoppingCart size={20} />

            <span className="bg-primary absolute -top-3 -right-3 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
              {cartCount}
            </span>
          </button>

          {/* MOBILE BUTTON */}

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      <div
        className={`overflow-hidden border-t transition-all lg:hidden ${
          mobileOpen ? 'max-h-screen' : 'max-h-0'
        } `}
      >
        <nav className="flex flex-col gap-3 px-5 py-4">
          {navLinks.map((link) => {
            const isCategory = link.name === 'Categories';

            return (
              <div key={link.name}>
                {isCategory ? (
                  <button
                    onClick={() =>
                      setMobileCategoryOpen(!mobileCategoryOpen)
                    }

                    className="flex w-full items-center justify-between"
                  >
                    Categories
                    <ChevronDown size={18} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}

                {isCategory && mobileCategoryOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat._id}

                        href={`/categories/${cat._id}`}

                        onClick={() => setMobileOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
