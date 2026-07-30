'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Grid2X2,
  ShoppingBag,
  ShoppingCart,
  Search,
  Tag,
  Layers,
  Store,
  Menu,
  X,
} from 'lucide-react';

import { useCart } from '@/context/CartContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const { cartCount } = useCart();

  const tabs = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Shop',
      href: '/products',
      icon: Store,
    },
    {
      name: 'Offers',
      href: '/offers',
      icon: Tag,
    },
    {
      name: 'Cart',
      href: '/carts',
      icon: ShoppingCart,
      badge: true,
    },
  ];

  return (
    <>
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t bg-white shadow-lg lg:hidden">
        <div className="grid h-16 grid-cols-5 items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            const active =
              pathname === tab.href ||
              pathname.startsWith(tab.href + '/');

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`relative flex flex-col items-center justify-center gap-1 text-xs transition ${
                  active ? 'text-primary' : 'text-gray-500'
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />

                  {tab.badge && cartCount > 0 && (
                    <span className="bg-primary absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
                      {cartCount}
                    </span>
                  )}
                </div>

                <span className={`${active ? 'font-semibold' : ''}`}>
                  {tab.name}
                </span>
              </Link>
            );
          })}

          {/* Search */}
          <button
            onClick={() => router.push('/products')}
            className="flex flex-col items-center justify-center gap-1 text-xs text-gray-500"
          >
            <Search size={22} />

            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16 lg:hidden" />
    </>
  );
}
