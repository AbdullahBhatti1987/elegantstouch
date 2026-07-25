
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { dashboardSidebar } from '@/content/data';

export default function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  setMobileOpen,
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay Mobile */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-xl transition-all duration-300 ease-in-out md:static md:shadow-none dark:bg-gray-900 ${collapsed ? 'md:w-20' : 'md:w-64'} ${
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        } `}
      >
        {/* Header */}

        <div className="relative flex h-16 items-center px-4">
          {/* Logo */}

          <div
            className={`overflow-hidden transition-all duration-300 ${
              collapsed ? 'md:w-0 md:opacity-0' : 'w-auto opacity-100'
            } `}
          >
            <h2 className="text-xl font-bold whitespace-nowrap">
              Admin Panel
            </h2>
          </div>

          {/* Desktop Collapse Button */}

          <button
            onClick={onToggle}
            className="absolute right-4 hidden rounded-lg p-2 hover:bg-gray-100 md:block dark:hover:bg-gray-800"
          >
            <Menu size={20} />
          </button>

          {/* Mobile Close Button */}

          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 rounded-lg p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}

        <nav className="space-y-2 p-3">
          {dashboardSidebar.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}

                href={item.href}

                onClick={() => setMobileOpen(false)}

                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-300 ${
                  active
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                } `}
              >
                <Icon size={20} className="shrink-0" />

                {/* Text */}

                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                    collapsed
                      ? 'md:max-w-0 md:opacity-0'
                      : 'max-w-[200px] opacity-100'
                  } `}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
