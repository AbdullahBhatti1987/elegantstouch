'use client';

import { useRouter } from 'next/navigation';

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  gradient,
  loading,
  link,
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(link)}
      className={`group relative overflow-hidden cursor-pointer rounded-2xl border border-gray-400 px-4 py-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${gradient} `}
    >
      {/* Soft Background Glow */}

      <div className="absolute -top-6 -right-6 h-10 w-10 rounded-full bg-white/40 blur-2xl transition-all duration-500 group-hover:scale-150" />

      {/* Icon */}

      <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 shadow-sm backdrop-blur transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-md">
        <Icon
          size={18}
          className="text-black transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content */}

      <div className="relative">
        <p className="text-sm font-medium text-gray-700">{title}</p>

        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          {loading ? 'Loading...' : value}
        </h2>

        <p className="mt-1 text-xs text-gray-600">Total {title}</p>
      </div>
    </div>
  );
}
