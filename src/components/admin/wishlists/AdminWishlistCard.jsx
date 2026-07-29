'use client';

import { useRouter } from 'next/navigation';

import {
  Heart,
  Package,
  CalendarDays,
  User,
  ShoppingBag,
} from 'lucide-react';

export default function AdminWishlistCard({ wishlist }) {
  const router = useRouter();

  return (
    <div
      // onClick={() =>
      //   router.push(`/dashboard/wishlists/${wishlist._id}`)
      // }

      className="group cursor-pointer rounded-2xl border border-gray-400 bg-white p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      {/* TOP SECTION */}

      <div className="flex gap-3">
        {/* USER ICON */}

        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/30">
          <User
            size={32}

            className="text-pink-600"
          />
        </div>

        {/* CUSTOMER INFO */}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white">
            {wishlist.guestId || 'Guest User'}
          </h3>

          <span className="mt-2 inline-block rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-semibold text-pink-700">
            Wishlist
          </span>
        </div>
      </div>

      {/* WISHLIST STATS */}

      <div className="mt-3 grid grid-cols-3 gap-2">
        {/* PRODUCTS */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <Package
            size={12}

            className="text-gray-500"
          />

          <p className="mt-1 text-xs font-bold">
            {wishlist.items?.length || 0}
          </p>

          <span className="text-[10px] text-gray-500">Products</span>
        </div>

        {/* HEART ITEMS */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <Heart
            size={12}

            className="text-gray-500"
          />

          <p className="mt-1 text-xs font-bold">
            {wishlist.items?.length || 0}
          </p>

          <span className="text-[10px] text-gray-500">Saved</span>
        </div>

        {/* DATE */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <CalendarDays
            size={12}

            className="text-gray-500"
          />

          <p className="mt-1 text-xs font-bold">
            {wishlist.createdAt
              ? new Date(wishlist.createdAt).toLocaleDateString()
              : '-'}
          </p>

          <span className="text-[10px] text-gray-500">Created</span>
        </div>
      </div>

      {/* PRODUCT PREVIEW */}

      <div className="mt-3">
        <p className="mb-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
          Wishlist Items
        </p>

        <div className="flex gap-1 overflow-hidden">
          {wishlist.items?.slice(0, 3).map((item, index) => (
            <span
              key={item.productId?._id || index}

              className="rounded-full bg-gray-50 px-2 py-1 text-[10px] whitespace-nowrap text-gray-600 dark:bg-pink-900/30 dark:text-gray-300"
            >
              {item.productId?.name || 'Product'}
            </span>
          ))}
        </div>
      </div>

      {/* FOOTER */}

      <div className="mt-3 flex items-center gap-2">
        <span className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-[10px] text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <ShoppingBag size={11} />
          {wishlist.items?.length || 0}
          Items
        </span>
      </div>
    </div>
  );
}
