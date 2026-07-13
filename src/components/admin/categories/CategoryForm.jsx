'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import Input from '@/components/admin/common/form/Input';
import Textarea from '@/components/admin/common/form/Textarea';
import Select from '@/components/admin/common/form/Select';
import Checkbox from '@/components/admin/common/form/Checkbox';
import FileUpload from '@/components/admin/common/form/FileUpload';

const defaultForm = {
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

export default function CategoryForm({
  initialData = null,
  onSubmit,
  submitText = 'Save Category',
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const [image, setImage] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      name: initialData.name || '',
      slug: initialData.slug || '',
      alt: initialData.alt || '',
      description: initialData.description || '',
      keywords: Array.isArray(initialData.keywords)
        ? initialData.keywords.join(', ')
        : '',
      status: initialData.status || 'active',
      featured: initialData.featured || false,
      sortOrder: initialData.sortOrder || '',
      seoTitle: initialData.seoTitle || '',
      seoDescription: initialData.seoDescription || '',
    });

    if (initialData.image) {
      setImage(initialData.image);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const uploadCategoryImage = async (file) => {
    if (!file || typeof file === 'string') {
      return file;
    }

    const data = new FormData();

    data.append('files', file);

    data.append('folder', 'categories');

    const response = await axios.post('/api/upload', data);

    if (!response.data.success) {
      throw new Error('Image upload failed');
    }

    return response.data.images[0];
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push('Category name is required');
    }

    if (!formData.slug.trim()) {
      errors.push('Category slug is required');
    }

    if (!formData.alt.trim()) {
      errors.push('Image alt text is required');
    }

    if (!formData.description.trim()) {
      errors.push('Category description is required');
    }

    if (!formData.keywords.trim()) {
      errors.push('Keywords are required');
    }

    if (!formData.seoTitle.trim()) {
      errors.push('SEO title is required');
    }

    if (!formData.seoDescription.trim()) {
      errors.push('SEO description is required');
    }

    if (!formData.sortOrder) {
      errors.push('Sort order is required');
    }

    if (!formData.status.trim()) {
      errors.push('Status is required');
    }

    if (!image) {
      errors.push('Category image is required');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 setLoading(true);
    const errors = validateForm();

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      setLoading(false);
      return;
    }

    try {
      setSubmitting(true);

      const imageUrl = await uploadCategoryImage(image);

      const payload = {
        ...formData,

        image: imageUrl,

        sortOrder: Number(formData.sortOrder) || 0,

        keywords: formData.keywords
          ? formData.keywords
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
      };

      await onSubmit(payload);
    } catch (error) {
      console.log(error);
      

      toast.error(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      {/* Header */}

      <div className="my-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {initialData ? 'Edit Category' : 'Add Category'}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage category information
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push('/dashboard/categories')}
          className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border bg-white p-8 dark:bg-gray-900"
      >
        {/* BASIC */}

        <section>
          <h2 className="mb-5 text-lg font-semibold">
            Basic Information
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <Input
              label="Category Name"
              name="name"
              value={formData.name}
              loading={loading}
              onChange={handleChange}
            />

            <Input
              label="Slug"
              name="slug"
              value={formData.slug}
              loading={loading}
              onChange={handleChange}
            />

            <Input
              label="Sort Order"
              name="sortOrder"
              type="number"
              value={formData.sortOrder}
              loading={loading}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* IMAGE */}

        <section className="rounded-xl border p-6">
          <h2 className="mb-5 text-lg font-semibold">
            Category Image
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <FileUpload
              label="Image"
              name="image"
              value={image}
              loading={loading}
              onChange={setImage}
            />

            <Input
              label="Image Alt Text"
              name="alt"
              value={formData.alt}
              loading={loading}

              onChange={handleChange}
            />
          </div>
        </section>

        {/* DESCRIPTION */}

        <section>
          <h2 className="mb-5 text-lg font-semibold">Description</h2>

          <Textarea
            label="Category Description"
            name="description"
            value={formData.description}
            loading={loading}
            onChange={handleChange}
            rows={5}
          />

          <div className="mt-5">
            <Input
              label="Keywords"
              name="keywords"
              value={formData.keywords}
              loading={loading}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* SEO */}

        <section className="rounded-xl border p-6">
          <h2 className="mb-5 text-lg font-semibold">SEO Settings</h2>

          <div className="space-y-5">
            <Input
              label="SEO Title"
              name="seoTitle"
              value={formData.seoTitle}
              loading={loading}
              onChange={handleChange}
            />

            <Textarea
              label="SEO Description"
              name="seoDescription"
              value={formData.seoDescription}
              loading={loading}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </section>

        {/* SETTINGS */}

        <section>
          <div className="flex flex-col gap-5 rounded-xl border p-5 md:flex-row md:items-center md:justify-between">
            <Checkbox
              label="Featured Category"
              name="featured"
              checked={formData.featured}
              loading={loading}
              onChange={handleChange}
            />

            <div className="w-full md:w-64">
              <Select
                label="Status"
                name="status"
                value={formData.status}
                loading={loading}
                onChange={handleChange}
                options={[
                  {
                    value: 'active',
                    label: 'Active',
                  },
                  {
                    value: 'inactive',
                    label: 'Inactive',
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* SUBMIT */}

        <div className="flex justify-end border-t pt-6">
          <button
            type="submit"
            loading={loading}
            className="flex items-center gap-2 rounded-lg bg-black px-8 py-3 text-white"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
