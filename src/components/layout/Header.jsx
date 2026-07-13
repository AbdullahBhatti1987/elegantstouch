'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Heart, ShoppingCart } from 'lucide-react';
import { navLinks } from '@/content/data';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <button className="hover:text-primary transition">
            <Search size={20} />
          </button>

          {/* Wishlist */}
          <button className="hover:text-primary relative transition">
            <Heart size={20} />
            <span className="bg-primary absolute -top-2 -right-2 rounded-full px-1 text-xs text-white">
              2
            </span>
          </button>

          {/* Cart */}
          <button className="hover:text-primary relative transition">
            <ShoppingCart size={20} />
            <span className="bg-primary absolute -top-2 -right-2 rounded-full px-1 text-xs text-white">
              3
            </span>
          </button>

          {/* Mobile Menu */}
          <button
            className="hover:text-primary transition lg:hidden"
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
