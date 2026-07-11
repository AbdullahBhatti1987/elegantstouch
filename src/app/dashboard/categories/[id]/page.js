'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';

export default function CategoryDetailPage() {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCategory() {
      try {
        const { data } = await axios.get(`/api/categories/${id}`);

        console.log('data==>', data);

        if (data.success) {
          setCategory(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getCategory();
    }
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this category?',
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        router.push('/dashboard/categories');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!category) {
    return <p className="p-6">Category not found</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>

          <p className="text-gray-500">Category Details</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}

            className="flex items-center gap-2 rounded-lg border px-4 py-2"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={() =>
              router.push(`/dashboard/categories/edit/${id}`)
            }

            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
          >
            <Edit size={18} />
            Edit
          </button>

          <button
            onClick={handleDelete}

            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Image */}

        <div className="relative h-80 overflow-hidden rounded-xl border">
          {category?.image && (
            <Image
              src={category.image}
              alt={category.alt || category.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Information */}

        <div className="space-y-4 rounded-xl border bg-white p-6 md:col-span-2 dark:bg-zinc-900">
          <Info label="Name" value={category.name} />

          <Info label="Slug" value={category.slug} />

          <Info label="Description" value={category.description} />

          <Info label="Products" value={category.productCount} />

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
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>

      <p className="font-medium">{value || '-'}</p>
    </div>
  );
}
