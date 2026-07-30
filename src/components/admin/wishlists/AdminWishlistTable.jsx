'use client';

import { useRouter } from 'next/navigation';

import { Heart, CalendarDays, Package, User } from 'lucide-react';

import Loader from '@/components/admin/common/loaders/Loader';
import EmptyState from '../common/emptyState/EmptyState';

export default function AdminWishlistTable({ wishlists, loading }) {
  const router = useRouter();

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full table-fixed text-xs md:text-sm">
        <thead className="border-b bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
          <tr className="h-10 md:h-12">
            <th className="w-[60px] px-2 text-center font-semibold md:w-[70px]">
              #
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Customer
            </th>

            <th className="hidden px-2 text-left font-semibold md:table-cell md:px-4">
              Products
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Items
            </th>

            <th className="hidden px-2 text-left font-semibold sm:table-cell md:px-4">
              Created
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <Loader type="wishlistTable" rows={6} />
          ) : wishlists.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-0">
                <EmptyState
                  title="No Wishlists Found"
                  description="There are currently no customer wishlists available. Wishlist information will appear here when customers save products."
                  action={
                    <button className="rounded-lg bg-[#005b96] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
                      Clear Filters
                    </button>
                  }
                />
              </td>
            </tr>
          ) : (
            wishlists.map((wishlist, index) => (
              <tr
                key={wishlist._id}
                onClick={() =>
                  router.push(`/dashboard/wishlists/${wishlist._id}`)
                }
                className="h-14 cursor-pointer border-b transition hover:bg-pink-50 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                {/* INDEX */}
                <td className="px-2 text-center">{index + 1}</td>

                {/* CUSTOMER */}
                <td className="px-2 py-2 md:px-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-pink-100 p-2 dark:bg-pink-900/30">
                      <User size={14} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {wishlist.guestId || 'Guest'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* PRODUCTS */}
                <td className="hidden px-2 md:table-cell md:px-4">
                  <div className="flex items-center gap-1">
                    <Package size={14} />
                    <span>
                      {wishlist.items?.length || 0} Products
                    </span>
                  </div>
                </td>

                {/* ITEMS */}
                <td className="px-2 md:px-4">
                  <div className="flex items-center gap-1">
                    <Heart size={14} className="text-pink-500" />
                    {wishlist.items?.length || 0}
                  </div>
                </td>

                {/* CREATED */}
                <td className="hidden px-2 sm:table-cell md:px-4">
                  <div className="flex items-center gap-1 text-gray-500">
                    <CalendarDays size={13} />
                    <span>
                      {wishlist.createdAt
                        ? new Date(
                            wishlist.createdAt,
                          ).toLocaleDateString()
                        : '-'}
                    </span>
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-2 md:px-4">
                  <span className="rounded-full bg-pink-100 px-2 py-1 text-[10px] font-semibold text-pink-700">
                    Wishlist
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
