"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Heart, ShoppingCart } from "lucide-react";
import { navLinks } from "@/content/data";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-appbg/80 backdrop-blur-md border-b border-secondary shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 h-16">

        {/* Logo */}
        <Link href="/dashboard" className="text-primary font-bold text-xl">
        {/* <Link href="/" className="text-primary font-bold text-xl"> */}
          Elegant Touch
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 text-sm font-medium text-textcolor">
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
        <div className="flex items-center gap-4 text-textcolor">

          {/* Search */}
          <button className="hover:text-primary transition">
            <Search size={20} />
          </button>

          {/* Wishlist */}
          <button className="relative hover:text-primary transition">
            <Heart size={20} />
            <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full px-1">
              2
            </span>
          </button>

          {/* Cart */}
          <button className="relative hover:text-primary transition">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full px-1">
              3
            </span>
          </button>

          {/* Mobile Menu */}
          <button
            className="lg:hidden hover:text-primary transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden px-4 pb-4 bg-appbg border-t border-secondary">
          <nav className="flex flex-col gap-4 mt-3 text-textcolor">
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