'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

import { useEffect, useState } from 'react';

import { dashboardSidebar } from '@/content/data';

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
        const activeChild = item.children.some((child) =>
          pathname.startsWith(child.href),
        );

        if (activeChild) {
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Overlay */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col overflow-hidden bg-white shadow-xl transition-transform duration-300 ease-in-out md:static md:w-full md:shadow-none dark:bg-gray-900 ${
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}

        <div className="relative flex h-16 items-center px-4">
          <h2
            className={`text-xl font-bold whitespace-nowrap transition-all duration-300 ${
              collapsed ? 'md:w-0 md:opacity-0' : 'opacity-100'
            } `}
          >
            Admin Panel
          </h2>

          <button
            onClick={onToggle}

            className="absolute right-3 hidden rounded-lg p-2 hover:bg-gray-100 md:block dark:hover:bg-gray-800"
          >
            <Menu size={22} />
          </button>

          <button
            onClick={() => setMobileOpen(false)}

            className="absolute right-3 rounded-lg p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="scrollbar-hide h-[calc(100vh-64px)] space-y-2 overflow-y-auto p-3">
          {dashboardSidebar.map((item) => {
            const Icon = item.icon;

            const hasChildren = item.children?.length > 0;

            const active =
              item.href &&
              (item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href));

            const childActive = item.children?.some((child) =>
              pathname.startsWith(child.href),
            );

            return (
              <div key={item.title}>
                {hasChildren ? (
                  <button
                    onClick={() => toggleMenu(item.title)}

                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 transition ${
                      childActive
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    } `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />

                      <span
                        className={`whitespace-nowrap transition-all duration-300 ${
                          collapsed ? 'md:hidden' : ''
                        } `}
                      >
                        {item.title}
                      </span>
                    </div>

                    {!collapsed && (
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          openMenus[item.title] ? 'rotate-180' : ''
                        } `}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}

                    onClick={() => setMobileOpen(false)}

                    className={`flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                      active
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    } `}
                  >
                    <Icon size={20} />

                    <span
                      className={`whitespace-nowrap transition-all duration-300 ${
                        collapsed ? 'md:hidden' : ''
                      } `}
                    >
                      {item.title}
                    </span>
                  </Link>
                )}

                {hasChildren && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openMenus[item.title] && !collapsed
                        ? 'mt-1 max-h-96 opacity-100'
                        : 'mt-0 max-h-0 opacity-0'
                    } `}
                  >
                    <div className="space-y-1 pl-8">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            {ChildIcon && <ChildIcon size={17} />}

                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
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
