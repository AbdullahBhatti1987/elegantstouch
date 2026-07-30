'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Pencil,
  Trash2,
  CalendarDays,
  Tag,
  MonitorPlay,
  Link as LinkIcon,
} from 'lucide-react';

export default function BannerCard({ banner }) {
  const router = useRouter();

  return (
    <div
      className="group cursor-pointer rounded-2xl border border-gray-400 bg-white p-3 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"

      onClick={() => router.push(`/dashboard/banners/${banner._id}`)}
    >
      {/* Top Section */}

      <div className="flex gap-3">
        {/* Image */}

        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
          {banner?.image ? (
            <Image
              // src={banner.image.thumbnail || banner.image.url}
              src={banner.image.thumbnail  || "/public/placeholder.jpg" }

              alt={banner.image.alt || banner.title}

              fill

              sizes="96px"

              className="object-cover transition group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Basic Info */}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <MonitorPlay size={14} className="text-blue-600" />

            <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white">
              {banner.title}
            </h3>
          </div>

          <div className="mt-1 flex items-center gap-1 truncate text-xs text-gray-500">
            <Tag size={12} />

            {banner.subtitle}
          </div>

          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              banner.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            } `}
          >
            {banner.status}
          </span>
        </div>
      </div>

      {/* Description */}

      <p className="mt-3 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
        {banner.description}
      </p>

      {/* Details Grid */}

      <div className="mt-3 grid grid-cols-3 gap-2">
        {/* Primary Button */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <LinkIcon size={12} className="text-gray-500" />

          <p className="mt-1 truncate text-xs font-bold">
            {banner.primaryBtnText}
          </p>

          <span className="text-[10px] text-gray-500">Button</span>
        </div>

        {/* Order */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <CalendarDays size={12} className="text-gray-500" />

          <p className="mt-1 text-xs font-bold">{banner.order}</p>

          <span className="text-[10px] text-gray-500">Order</span>
        </div>

        {/* Type */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <MonitorPlay size={12} className="text-gray-500" />

          <p className="mt-1 text-xs font-bold">Hero</p>

          <span className="text-[10px] text-gray-500">Type</span>
        </div>
      </div>

      {/* Actions */}

      {/* <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();

            router.push(`/dashboard/banners/${banner._id}/edit`);
          }}

          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={(e) => e.stopPropagation()}

          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
        >
          <Trash2 size={16} />
        </button>
      </div> */}
    </div>
  );
}
