'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import ConfirmModal from '@/components/admin/common/ConfirmModal';
import BackButton from '@/components/admin/common/BackButton';
import CategoryDetailSkeleton from '@/components/admin/common/skeleton/CategoryDetailSkeleton';

export default function CategoryDetailPage() {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function getCategory() {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/categories/${id}`);

        console.log('data==>', data);

        if (data.success) {
          setCategory(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }

    if (id) {
      getCategory();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/categories/${id}`);

      if (data.success) {
        router.push('/dashboard/categories');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

      setShowDeleteModal(false);
    }
  };

if (loading) {
  return <CategoryDetailSkeleton />;
}

  if (!category) {
    return <p className="p-6">Category not found</p>;
  }

  return (
    <>
      <div className="mt-4">
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>

            <p className="text-gray-500">Category Details</p>
          </div>

          <BackButton onClick={() => router.back()} />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Image */}

          <div className="relative h-84 overflow-hidden rounded-xl border">
            {category?.image && (
              <Image
                src={category.image.url || '/images/placeholder.jpg'}
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
            <div className="absolute top-4 right-4 flex gap-2">
              {/* Edit */}
              <button
                onClick={() =>
                  router.push(`/dashboard/categories/update/${id}`)
                }
                className="rounded-lg bg-black p-2 text-white transition hover:bg-gray-800"
                title="Edit Category"
              >
                <Edit size={17} />
              </button>

              {/* Delete */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                title="Delete Category"
              >
                <Trash2 size={17} />
              </button>
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

        <div className="mt-6 rounded-xl border bg-white p-6 dark:bg-zinc-900">
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

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>

      <p className="max-w-full overflow-hidden font-medium text-ellipsis whitespace-nowrap">
        {value || '-'}
      </p>
    </div>
  );
}
