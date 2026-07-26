// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import axios from 'axios';

// export default function BannerDetailPage() {
//   const params = useParams();
//   const bannerId = params.id;

//   const [banner, setBanner] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getBanner = async () => {
//     try {
//       const { data } = await axios.get(`/api/banners/${bannerId}`);

//       if (data.success) {
//         setBanner(data.data);
//       }
//     } catch (error) {
//       console.log(
//         'Banner Fetch Error:',
//         error.response?.data || error.message,
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (bannerId) {
//       getBanner();
//     }
//   }, [bannerId]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <p className="text-gray-500">Loading banner...</p>
//       </div>
//     );
//   }

//   if (!banner) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <p className="text-gray-500">Banner not found</p>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-white dark:bg-black">
//       {/* HERO */}

//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50 dark:from-zinc-900 dark:via-black dark:to-zinc-900" />

//         <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
//           {/* CONTENT */}

//           <div>
//             {banner.subtitle && (
//               <p className="mb-3 text-sm font-semibold tracking-wide text-pink-600 uppercase">
//                 {banner.subtitle}
//               </p>
//             )}

//             <h1 className="text-4xl leading-tight font-bold text-gray-900 md:text-6xl dark:text-white">
//               {banner.title}
//             </h1>

//             <p className="mt-5 max-w-xl text-gray-600 dark:text-gray-300">
//               {banner.description}
//             </p>

//             <div className="mt-8 flex flex-wrap gap-4">
//               {banner.primaryBtnText && (
//                 <Link
//                   href={banner.primaryBtnLink || '/products'}
//                   className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:scale-105 dark:bg-white dark:text-black"
//                 >
//                   {banner.primaryBtnText}
//                 </Link>
//               )}

//               {banner.secondaryBtnText && (
//                 <Link
//                   href={banner.secondaryBtnLink || '/categories'}
//                   className="rounded-lg border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-zinc-800"
//                 >
//                   {banner.secondaryBtnText}
//                 </Link>
//               )}
//             </div>
//           </div>

//           {/* IMAGE */}

//           <div className="flex justify-center">
//             <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-xl">
//               <Image
//                 src={
//                   banner.image?.url ||
//                   banner.image?.thumbnail ||
//                   '/images/placeholder.png'
//                 }
//                 alt={banner.image?.alt || banner.title}
//                 fill
//                 priority
//                 sizes="(max-width:768px) 100vw, 500px"
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* DETAILS */}

//       <section className="mx-auto max-w-7xl px-6 py-12">
//         <div className="rounded-2xl border bg-gray-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
//           <h2 className="text-xl font-bold dark:text-white">
//             Banner Details
//           </h2>

//           <div className="mt-5 grid gap-4 md:grid-cols-3">
//             <div>
//               <p className="text-sm text-gray-500">Status</p>

//               <p className="font-semibold dark:text-white">
//                 {banner.status}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Order</p>

//               <p className="font-semibold dark:text-white">
//                 {banner.order}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Created</p>

//               <p className="font-semibold dark:text-white">
//                 {new Date(banner.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import ConfirmModal from '@/components/admin/common/ConfirmModal';
import BackButton from '@/components/admin/common/header/BackButton';
import axios from 'axios';
import {
  ArrowLeft,
  Calendar,
  ImageIcon,
  Link as LinkIcon,
  ExternalLink,
} from 'lucide-react';

export default function BannerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const bannerId = params.id;
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBanner = async () => {
    try {
      const { data } = await axios.get(`/api/banners/${bannerId}`);

      if (data.success) {
        setBanner(data.data);
      }
    } catch (error) {
      console.log(
        'Banner Fetch Error:',
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      const { data } = await axios.delete(`/api/banners/${bannerId}`);

      if (data.success) {
        router.push('/dashboard/banners');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    if (bannerId) {
      getBanner();
    }
  }, [bannerId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Banner not found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banner Details</h1>

          <p className="mt-1 text-gray-500">
            View complete banner information
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* MAIN CARD */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* IMAGE */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <ImageIcon size={18} />
            Banner Image
          </h2>

          <div className="relative aspect-square overflow-hidden rounded-xl border">
            <Image
              src={
                banner.image?.url ||
                banner.image?.thumbnail ||
                '/images/placeholder.png'
              }

              alt={banner.image?.alt || banner.title}

              fill

              className="object-cover"
            />
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Alt: {banner.image?.alt || '-'}
          </p>
        </div>

        {/* DETAILS */}

        <div className="relative space-y-6 lg:col-span-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">
              Basic Information
            </h2>

            {/* ACTION ICONS */}

            <div className="absolute top-4 right-4 z-[999] flex gap-2">
              {/* EDIT */}

              <button
                onClick={() =>
                  router.push(`/dashboard/banners/update/${bannerId}`)
                }
                className="cursor-pointer rounded-lg bg-black p-2 text-white transition hover:bg-gray-800"
                title="Edit Banner"
              >
                <Edit size={17} />
              </button>

              {/* DELETE */}

              <button
                onClick={() => setShowDeleteModal(true)}
                className="cursor-pointer rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                title="Delete Banner"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Info label="Subtitle" value={banner.subtitle} />

              <Info label="Title" value={banner.title} />

              <Info
                label="Status"
                value={
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      banner.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {banner.status}
                  </span>
                }
              />

              <Info label="Sort Order" value={banner.order} />
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold">
              Description
            </h2>

            <p className="leading-relaxed text-gray-600">
              {banner.description || '-'}
            </p>
          </div>

          {/* BUTTON DETAILS */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold">
              <LinkIcon size={20} />
              Buttons
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Info
                label="Primary Button"
                value={banner.primaryBtnText}
              />

              <Info
                label="Primary Link"
                value={banner.primaryBtnLink}
              />

              <Info
                label="Secondary Button"
                value={banner.secondaryBtnText}
              />

              <Info
                label="Secondary Link"
                value={banner.secondaryBtnLink}
              />
            </div>
          </div>

          {/* DATE */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Calendar size={20} />
              Timeline
            </h2>

            <Info
              label="Created At"
              value={new Date(banner.createdAt).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>

      <div className="mt-1 font-medium text-gray-900">
        {value || '-'}
      </div>
    </div>
  );
}
