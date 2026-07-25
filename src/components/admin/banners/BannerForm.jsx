'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

import Input from '@/components/admin/common/form/Input';
import Textarea from '@/components/admin/common/form/Textarea';
import Select from '@/components/admin/common/form/Select';
import FileUpload from '@/components/admin/common/form/FileUpload';

import AdminPageTitle from '../common/header/AdminPageTitle';
import { useLoading } from '@/context/LoadingContext';

const defaultForm = {
  subtitle: '',
  title: '',
  description: '',

  primaryBtnText: 'Shop Now',
  primaryBtnLink: '/products',

  secondaryBtnText: 'Explore',
  secondaryBtnLink: '/categories',

  status: 'active',
  order: 0,
  alt: '',
};

export default function BannerForm({
  initialData = null,
  onSubmit,
  submitText = 'Save Banner',
}) {
  const { loading, startLoading, stopLoading } = useLoading();

  const [formData, setFormData] = useState(defaultForm);

  const [uploadImage, setUploadImage] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      subtitle: initialData.subtitle || '',

      title: initialData.title || '',

      description: initialData.description || '',

      primaryBtnText: initialData.primaryBtnText || 'Shop Now',

      primaryBtnLink: initialData.primaryBtnLink || '/products',

      secondaryBtnText: initialData.secondaryBtnText || 'Explore',

      secondaryBtnLink: initialData.secondaryBtnLink || '/categories',

      status: initialData.status || 'active',

      order: initialData.order ?? 0,

      alt: initialData.image?.alt || '',
    });

    if (initialData.image?.url) {
      setUploadImage(initialData.image.url);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.subtitle.trim())
      errors.push('Subtitle is required');

    if (!formData.title.trim()) errors.push('Title is required');

    if (!formData.description.trim())
      errors.push('Description is required');

    if (!formData.alt.trim())
      errors.push('Image alt text is required');

    if (!uploadImage) errors.push('Banner image is required');

    if (!formData.primaryBtnText.trim())
      errors.push('Primary button text required');

    if (!formData.primaryBtnLink.trim())
      errors.push('Primary button link required');

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (errors.length) {
      errors.forEach((err) => toast.error(err));

      return;
    }

    try {
      startLoading();

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (uploadImage && typeof uploadImage !== 'string') {
        data.append('image', uploadImage);
      }

      await onSubmit(data);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="mx-auto">
      <AdminPageTitle
        title={initialData ? 'Edit Banner' : 'Add Banner'}

        description="Manage homepage banner information"

        backUrl="/dashboard/banners"
      />

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
              label="Subtitle"

              name="subtitle"

              value={formData.subtitle}

              loading={loading}

              onChange={handleChange}
            />

            <Input
              label="Title"

              name="title"

              value={formData.title}

              loading={loading}

              onChange={handleChange}
            />

            <Input
              label="Sort Order"

              name="order"

              type="number"

              value={formData.order}

              loading={loading}

              onChange={handleChange}
            />
          </div>
        </section>

        {/* IMAGE */}

        <section className="rounded-xl border p-6">
          <h2 className="mb-5 text-lg font-semibold">Banner Image</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <FileUpload
              label="Image"

              name="image"

              value={uploadImage}

              loading={loading}

              onChange={setUploadImage}
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
            label="Banner Description"

            name="description"

            value={formData.description}

            loading={loading}

            onChange={handleChange}

            rows={5}
          />
        </section>

        {/* BUTTONS */}

        <section className="rounded-xl border p-6">
          <h2 className="mb-5 text-lg font-semibold">Buttons</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Primary Button Text"

              name="primaryBtnText"

              value={formData.primaryBtnText}

              loading={loading}

              onChange={handleChange}
            />

            <Input
              label="Primary Button Link"

              name="primaryBtnLink"

              value={formData.primaryBtnLink}

              loading={loading}

              onChange={handleChange}
            />

            <Input
              label="Secondary Button Text"

              name="secondaryBtnText"

              value={formData.secondaryBtnText}

              loading={loading}

              onChange={handleChange}
            />

            <Input
              label="Secondary Button Link"

              name="secondaryBtnLink"

              value={formData.secondaryBtnLink}

              loading={loading}

              onChange={handleChange}
            />
          </div>
        </section>

        {/* SETTINGS */}

        <section>
          <div className="rounded-xl border p-5">
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

        <div className="flex justify-end">
          <button
            type="submit"

            disabled={loading}

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
