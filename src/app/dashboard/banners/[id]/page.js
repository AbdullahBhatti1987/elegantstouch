'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';

import BackButton from '@/components/admin/common/header/BackButton';
import axios from 'axios';
import {
  ArrowLeft,
  Calendar,
  ImageIcon,
  Link as LinkIcon,
  ExternalLink,
} from 'lucide-react';
import { Info } from '@/components/admin/common/form/Info';
import BannerDetailSkeleton from '@/components/admin/common/skeleton/detailSkeletons/BannerDetailSkeleton';
import { useLoading } from '@/context/LoadingContext';
import ActionButtons from '@/components/admin/common/ActionButtons';
import ConfirmModal from '@/components/admin/common/ConfirmModal';
import NotFound from '@/components/admin/common/states/NotFound';
import AdminViewHeader from '@/components/admin/common/header/AdminViewHeader';

export default function BannerDetailPage() {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBanner = async () => {
    try {
      const { data } = await axios.get(`/api/banners/${id}`);
      console.log('FULL BANNER RESPONSE ==> ', data);
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
      startLoading(true);

      const { data } = await axios.delete(`/api/banners/${id}`);

      if (data.success) {
        router.push('/dashboard/banners');
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading(false);
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    if (id) {
      getBanner();
    }
  }, [id]);

  if (loading) {
    return <BannerDetailSkeleton />;
  }

  if (!banner) {
    return (
      <NotFound
        title="Banner Not Found"
        message="The banner you are looking for does not exist or has been removed."
        buttonText="Back to Banners"
      />
    );
  }

  return (
    <div className="mt-4">
      {/* HEADER */}

      <AdminViewHeader
        title={banner.title}
        subtitle="Banners Details"
      />

      {/* MAIN CARD */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* IMAGE */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="relative aspect-square overflow-hidden rounded-xl border">
            <Image
              src={banner.image?.url || banner.image?.thumbnail}

              alt={banner.image?.alt || banner.title}
              loading="eager"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Alt: {banner?.alt || '-'}
          </p>
        </div>

        {/* DETAILS */}

        <div className="relative space-y-6 lg:col-span-2">
          <div className="flex flex-col gap-6 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Basic Information
            </h2>
            {/* ACTION ICONS */}
            <ActionButtons
              onEdit={() =>
                router.push(`/dashboard/banners/update/${id}`)
              }
              onDelete={() => setShowDeleteModal(true)}
            />

            <div className="relative space-y-4 rounded-xl border p-6 md:col-span-2 dark:bg-zinc-900">
              {/* Action Icons */}

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
                value={new Date(
                  banner.createdAt,
                ).toLocaleDateString()}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Banner"
        message="This banner will be permanently deleted."
        requireText={banner.title}
        confirmText="Delete Banner"
        loading={loading}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
