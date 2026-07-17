'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { menuItems } from '@/content/data';

export default function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  setMobileOpen,
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-black p-2 text-white md:hidden"
      >
        <Menu size={20} />
      </button>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}

          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white transition-transform duration-300 md:static md:translate-x-0 dark:bg-gray-900 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:${collapsed ? 'w-20' : 'w-64'} `}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <h2 className="text-xl font-bold">Admin Panel</h2>
          )}

          <button
            onClick={onToggle}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-2 p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                  active
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />

                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
