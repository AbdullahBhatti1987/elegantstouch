'use client';

import Image from 'next/image';

import { Pencil, Trash2 } from 'lucide-react';

import Link from 'next/link';
import AdminBannerTableSkeleton from '../common/skeleton/tableSkeletons/BannerTableSkeleton';
import Loader from '../common/loaders/Loader';

export default function AdminBannerTable({
  banners = [],
  loading = false,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-4 text-left">Image</th>

            <th className="p-4 text-left">Title</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Order</th>

            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <Loader type="bannerTable" count={8} />
          ) : banners.length > 0 ? (
            banners.map((banner) => (
              <tr
                key={banner._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  <div className="relative h-14 w-24 overflow-hidden rounded-lg">
                    <Image
                      src={
                        banner.image?.thumbnail ||
                        banner.image?.url ||
                        '/images/placeholder.png'
                      }
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>

                <td className="p-4 font-medium">{banner.title}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    {banner.status}
                  </span>
                </td>

                <td className="p-4">{banner.order}</td>

                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/dashboard/banners/${banner._id}/edit`}
                      className="rounded-lg bg-blue-50 p-2 text-blue-600"
                    >
                      <Pencil size={16} />
                    </Link>

                    <button className="rounded-lg bg-red-50 p-2 text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <EmptyState
              title="No Banner Available"
              description="No active banners are available at the moment. Add a banner from the admin panel to display it here."
              action={
                <button className="rounded-lg bg-[#005b96] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
                  Clear Filters
                </button>
              }
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
