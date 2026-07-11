'use client';

import { useState } from 'react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const initialForm = {
  name: '',
  slug: '',
  alt: '',
  description: '',
  keywords: '',
  status: 'active',
  featured: false,
  sortOrder: '',
  seoTitle: '',
  seoDescription: '',
};

export default function AddCategoryPage() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialForm);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,

        keywords: formData.keywords
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),

        sortOrder: Number(formData.sortOrder) || 0,
      };

      const response = await axios.post('/api/categories', payload);

      if (response.data.success) {
        toast.success('Category added successfully');

        setTimeout(() => {
          router.push('/dashboard/categories');
        }, 2000);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="my-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Add Category</h1>

          <p className="text-sm text-gray-500">
            Create new product category
          </p>
        </div>

        <div
          onClick={() => router.push('/dashboard/categories')}
          className="flex items-center gap-2 rounded-lg border bg-black px-4 py-2 text-white"
        >
          <ArrowLeft size={18} />
          Back
        </div>
      </div>

      <form
        onSubmit={handleSubmit}

        className="space-y-6 rounded-xl border bg-white p-6 dark:bg-gray-900"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Category Name"

            name="name"

            value={formData.name}

            onChange={handleChange}
          />

          <Input
            label="Slug"

            name="slug"

            value={formData.slug}

            onChange={handleChange}
          />

          <Input
            label="Image Alt Text"

            name="alt"

            value={formData.alt}

            onChange={handleChange}
          />

          <Input
            label="Sort Order"

            name="sortOrder"

            value={formData.sortOrder}

            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Category Image
          </label>

          <input
            type="file"

            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            name="description"

            value={formData.description}

            onChange={handleChange}

            rows="4"

            className="w-full rounded-lg border p-3"
          />
        </div>

        <Input
          label="Keywords (comma separated)"

          name="keywords"

          value={formData.keywords}

          onChange={handleChange}
        />

        <div className="border-t pt-6">
          <h3 className="mb-4 font-semibold">SEO Settings</h3>

          <Input
            label="SEO Title"

            name="seoTitle"

            value={formData.seoTitle}

            onChange={handleChange}
          />

          <textarea
            name="seoDescription"

            value={formData.seoDescription}

            onChange={handleChange}

            placeholder="SEO Description"

            rows="3"

            className="mt-4 w-full rounded-lg border p-3"
          />
        </div>

        <div className="flex gap-8">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"

              name="featured"

              checked={formData.featured}

              onChange={handleChange}
            />
            Featured Category
          </label>

          <select
            name="status"

            value={formData.status}

            onChange={handleChange}

            className="rounded-lg border px-3"
          >
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          disabled={loading}

          className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Category'}
        </button>
      </form>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <input
        name={name}

        value={value}

        onChange={onChange}

        className="w-full rounded-lg border px-3 py-2"
      />
    </div>
  );
}
