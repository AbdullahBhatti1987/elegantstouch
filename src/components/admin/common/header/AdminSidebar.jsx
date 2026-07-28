'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

import { dashboardSidebar } from '@/content/data';

import { useEffect, useState } from 'react';

export default function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  setMobileOpen,
}) {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    dashboardSidebar.forEach((item) => {
      if (item.children?.length) {
        const hasActiveChild = item.children.some((child) =>
          pathname.startsWith(child.href),
        );

        if (hasActiveChild) {
          setOpenMenus((prev) => ({
            ...prev,
            [item.title]: true,
          }));
        }
      }
    });
  }, [pathname]);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,

      [title]: !prev[title],
    }));
  };

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
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-xl transition-all duration-300 ease-in-out md:static md:shadow-none dark:bg-gray-900 ${
          collapsed ? 'md:w-20' : 'md:w-64'
        } ${
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}

        <div className="relative flex h-16 items-center px-4">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              collapsed ? 'md:w-0 md:opacity-0' : 'w-auto opacity-100'
            }`}
          >
            <h2 className="text-xl font-bold whitespace-nowrap">
              Admin Panel
            </h2>
          </div>

          <button
            onClick={onToggle}
            className="absolute right-4 hidden rounded-lg p-2 hover:bg-gray-100 md:block dark:hover:bg-gray-800"
          >
            <Menu size={20} />
          </button>

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

            const hasChildren = item.children?.length > 0;

            const active =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : item.href && pathname.startsWith(item.href);

            const childActive = item.children?.some((child) =>
              pathname.startsWith(child.href),
            );

            return (
              <div key={item.title}>
                {hasChildren ? (
                  <button
                    onClick={() => toggleMenu(item.title)}

                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 transition-all duration-300 ${
                      childActive
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    } `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="shrink-0" />

                      <span
                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                          collapsed
                            ? 'md:max-w-0 md:opacity-0'
                            : 'max-w-[200px] opacity-100'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {!collapsed && (
                      <ChevronDown
                        size={18}

                        className={`transition-transform ${
                          openMenus[item.title] ? 'rotate-180' : ''
                        } `}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}

                    onClick={() => setMobileOpen(false)}

                    className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-300 ${
                      active
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    } `}
                  >
                    <Icon size={20} className="shrink-0" />

                    <span
                      className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                        collapsed
                          ? 'md:max-w-0 md:opacity-0'
                          : 'max-w-[200px] opacity-100'
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                )}

                {/* Children */}

                {hasChildren &&
                  openMenus[item.title] &&
                  !collapsed && (
                    <div className="mt-1 space-y-1 pl-8">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;

                        const activeChild = pathname.startsWith(
                          child.href,
                        );

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                              activeChild
                                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {ChildIcon && <ChildIcon size={17} />}

                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
