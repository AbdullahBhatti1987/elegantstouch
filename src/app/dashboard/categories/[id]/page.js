'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import ConfirmModal from '@/components/admin/common/ConfirmModal';
import BackButton from '@/components/admin/common/header/BackButton';
import CategoryDetailSkeleton from '@/components/admin/common/skeleton/detailSkeletons/CategoryDetailSkeleton';
import { Info } from '@/components/admin/common/form/Info';
import { useLoading } from '@/context/LoadingContext';
import AdminViewHeader from '@/components/admin/common/header/AdminViewHeader';
import NotFound from '@/components/admin/common/states/NotFound';
import ActionButtons from '@/components/admin/common/ActionButtons';

export default function CategoryDetailPage() {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();

  const [category, setCategory] = useState(null);
  const { loading, startLoading, stopLoading } = useLoading();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function getCategory() {
      startLoading();
      try {
        const { data } = await axios.get(`/api/categories/${id}`);

        console.log('data==>', data);

        if (data.success) {
          setCategory(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    }

    if (id) {
      getCategory();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      startLoading();
      const { data } = await axios.delete(`/api/categories/${id}`);

      if (data.success) {
        router.push('/dashboard/categories');
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return <CategoryDetailSkeleton />;
  }

  if (!category) {
    return (
      <NotFound
        title="Category Not Found"
        message="The category you are looking for does not exist or has been removed."
        buttonText="Back to Categories"
      />
    );
  }

  return (
    <>
      <div className="mt-4">
        {/* Header */}

        <AdminViewHeader
          title={category.name}
          subtitle="Category Details"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {/* Image */}

          <div className="relative min-h-84 overflow-hidden rounded-xl border">
            {category?.image && (
              <Image
                src={
                  category.image.thumbnail ||
                  '/images/placeholder.jpg'
                }
                alt={category.alt || category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            )}
          </div>

          {/* Information */}

          <div className="relative space-y-4 rounded-xl border bg-white p-6 md:col-span-2 dark:bg-zinc-900">
            {/* Action Icons */}
            <ActionButtons
              onEdit={() =>
                router.push(`/dashboard/categories/update/${id}`)
              }
              onDelete={() => setShowDeleteModal(true)}
            />

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Category Summary
              </h2>
            </div>
            {/* Information */}

            <Info label="Name" value={category.name} />

            <Info label="Slug" value={category.slug} />

            <Info label="Description" value={category.description} />

            <Info label="Status" value={category.status} />

            <Info
              label="Featured"
              value={category.featured ? 'Yes' : 'No'}
            />
          </div>
        </div>

        {/* SEO */}

        <div className="mt-6 space-y-4 rounded-xl border bg-white p-6 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold">
            SEO Information
          </h2>

          <Info label="SEO Title" value={category.seoTitle} />

          <Info
            label="SEO Description"
            value={category.seoDescription}
          />

          <Info
            label="Keywords"
            value={category.keywords?.join(', ')}
          />
        </div>
      </div>
      <ConfirmModal
        open={showDeleteModal}

        title="Delete Category"

        message="This category and related data will be permanently deleted."

        requireText={category.name}

        confirmText="Delete Category"

        loading={loading}

        onCancel={() => setShowDeleteModal(false)}

        onConfirm={handleDelete}
      />
    </>
  );
}
