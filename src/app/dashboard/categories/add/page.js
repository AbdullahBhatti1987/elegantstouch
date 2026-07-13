// 'use client';

// import { useState } from 'react';
// import axios from 'axios';
// import { ArrowLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';

// import Input from '@/components/admin/common/form/Input';
// import Textarea from '@/components/admin/common/form/Textarea';
// import Select from '@/components/admin/common/form/Select';
// import Checkbox from '@/components/admin/common/form/Checkbox';
// import FileUpload from '@/components/admin/common/form/FileUpload';

// const initialForm = {
//   name: '',
//   slug: '',
//   alt: '',
//   description: '',
//   keywords: '',
//   status: 'active',
//   featured: false,
//   sortOrder: '',
//   seoTitle: '',
//   seoDescription: '',
// };

// export default function AddCategoryPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState(initialForm);
//   const [image, setImage] = useState(null);

//   const [loading, setLoading] = useState(false);

//   const [errors, setErrors] = useState({
// if (!image) {
//   errors.image = 'Category image is required';

//   });

//   if (!formData.name.trim()) {
//     setErrors({
//       name: 'Category name is required',
//     });

//     return;
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const uploadCategoryImage = async (file) => {
//     if (!file) {
//       throw new Error('Category image is required');
//     }

//     const formData = new FormData();

//     formData.append('files', file);

//     formData.append('folder', 'categories');

//     const res = await axios.post('/api/upload', formData);

//     if (!res.data.success) {
//       throw new Error(res.data.message || 'Image upload failed');
//     }

//     return res.data.images[0];
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Required fields validation
//     const requiredFields = [
//       {
//         field: 'name',
//         message: 'Category name is required',
//       },
//       {
//         field: 'slug',
//         message: 'Category slug is required',
//       },
//       {
//         field: 'description',
//         message: 'Category description is required',
//       },
//       {
//         field: 'image',
//         message: 'Category image is required',
//       },
//     ];

//     for (const item of requiredFields) {
//       if (!formData[item.field]?.toString().trim()) {
//         toast.error(item.message);

//         return;
//       }
//     }

//     setLoading(true);

//     try {
//       // Upload Image First
//       const imageUrl = await uploadCategoryImage(formData.image);

//       const payload = {
//         ...formData,

//         image: imageUrl,

//         keywords: formData.keywords
//           ? formData.keywords
//               .split(',')
//               .map((item) => item.trim())
//               .filter(Boolean)
//           : [],

//         sortOrder: Number(formData.sortOrder) || 0,
//       };

//       const response = await axios.post('/api/categories', payload);

//       if (response.data.success) {
//         toast.success('Category added successfully');

//         setTimeout(() => {
//           router.push('/dashboard/categories');
//         }, 1500);
//       } else {
//         toast.error(
//           response.data.message || 'Category creation failed',
//         );
//       }
//     } catch (error) {
//       console.log(error);

//       toast.error(
//         error.response?.data?.message ||
//           error.message ||
//           'Something went wrong',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

'use client';

import { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Input from '@/components/admin/common/form/Input';
import Textarea from '@/components/admin/common/form/Textarea';
import Select from '@/components/admin/common/form/Select';
import Checkbox from '@/components/admin/common/form/Checkbox';
import FileUpload from '@/components/admin/common/form/FileUpload';

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

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const uploadCategoryImage = async (file) => {
    if (!file) {
      throw new Error('Category image is required');
    }

    const data = new FormData();

    data.append('files', file);

    data.append('folder', 'categories');

    const res = await axios.post('/api/upload', data);

    if (!res.data.success) {
      throw new Error(res.data.message || 'Image upload failed');
    }

    return res.data.images[0];
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push('Category name is required');
    }

    if (!formData.slug.trim()) {
      errors.push('Category slug is required');
    }

    if (!formData.description.trim()) {
      errors.push('Category description is required');
    }

    if (!image) {
      errors.push('Category image is required');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length) {
      validationErrors.forEach((error) => {
        toast.error(error);
      });

      return;
    }

    try {
      setLoading(true);

      // Upload Image

      const imageUrl = await uploadCategoryImage(image);

      const payload = {
        ...formData,

        image: imageUrl,

        keywords: formData.keywords
          ? formData.keywords
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean)
          : [],

        sortOrder: Number(formData.sortOrder) || 0,
      };

      const response = await axios.post('/api/categories', payload);

      if (response.data.success) {
        toast.success('Category added successfully');

        setTimeout(() => {
          router.push('/dashboard/categories');
        }, 1000);
      } else {
        toast.error(
          response.data.message || 'Category creation failed',
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  // return (

  // <div className="mx-auto max-w-6xl">
  //   {/* Header */}
  //   <div className="my-4 flex items-center justify-between">
  //     <div>
  //       <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
  //         Add Category
  //       </h1>

  //       <p className="mt-1 text-sm text-gray-500">
  //         Create and manage your product categories
  //       </p>
  //     </div>

  //     <button
  //       type="button"
  //       onClick={() => router.push('/dashboard/categories')}
  //       className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
  //     >
  //       <ArrowLeft size={18} />
  //       Back
  //     </button>
  //   </div>

  //   <form
  //     onSubmit={handleSubmit}
  //     className="space-y-8 rounded-2xl border bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
  //   >
  //     {/* Basic Information */}

  //     <section>
  //       <div className="mb-5">
  //         <h2 className="text-lg font-semibold">
  //           Basic Information
  //         </h2>

  //         <p className="text-sm text-gray-500">
  //           Add basic category details
  //         </p>
  //       </div>

  //       <div className="grid gap-5 md:grid-cols-3">
  //         <Input
  //           label="Category Name"
  //           name="name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           required
  //           loading={loading}
  //           error={errors.name}
  //         />

  //         <Input
  //           label="Slug"
  //           name="slug"
  //           value={formData.slug}
  //           onChange={handleChange}
  //           placeholder="hair-accessories"
  //           required
  //           loading={loading}
  //           error={errors.name}
  //         />

  //         <Input
  //           label="Sort Order"
  //           name="sortOrder"
  //           type="number"
  //           value={formData.sortOrder}
  //           onChange={handleChange}
  //           placeholder="0"
  //           loading={loading}
  //           error={errors.name}
  //         />
  //       </div>
  //     </section>

  //     {/* Image Section */}

  //     {/* Image Section */}

  //     <section className="rounded-xl border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
  //       <div className="mb-5">
  //         <h2 className="text-lg font-semibold">Category Image</h2>

  //         <p className="text-sm text-gray-500">
  //           Upload category thumbnail and optimize image SEO
  //         </p>
  //       </div>

  //       <div className="grid items-start gap-8 md:grid-cols-2">
  //         {/* Upload Box */}

  //         <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
  //           <FileUpload
  //             label="Category Image"
  //             name="image"
  //             value={formData.image}
  //             onChange={(file) =>
  //               setFormData({
  //                 ...formData,
  //                 image: file,
  //               })
  //             }
  //             loading={uploading}
  //             error={errors.image}
  //           />
  //         </div>

  //         {/* Image Details */}

  //         <div className="flex h-full flex-col justify-center rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
  //           <div className="space-y-5">
  //             <Input
  //               label="Image Alt Text"
  //               name="alt"
  //               value={formData.alt}
  //               onChange={handleChange}
  //               placeholder="Example: Pink hair accessories"
  //             />

  //             <div>
  //               <p className="mb-2 text-sm font-medium">
  //                 Image Guidelines
  //               </p>

  //               <ul className="space-y-2 text-sm text-gray-500">
  //                 <li>✓ Recommended size: 800x800px</li>

  //                 <li>✓ Format: JPG, PNG, WEBP</li>

  //                 <li>✓ Maximum size: 5MB</li>

  //                 <li>✓ Use SEO friendly alt text</li>
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Description */}

  //     <section>
  //       <div className="mb-5">
  //         <h2 className="text-lg font-semibold">Description</h2>

  //         <p className="text-sm text-gray-500">
  //           Describe your category
  //         </p>
  //       </div>

  //       <Textarea
  //         label="Category Description"
  //         name="description"
  //         value={formData.description}
  //         onChange={handleChange}
  //         rows={5}
  //         loading={loading}
  //         error={errors.name}
  //       />

  //       <div className="mt-5">
  //         <Input
  //           label="Keywords"
  //           name="keywords"
  //           value={formData.keywords}
  //           onChange={handleChange}
  //           loading={loading}
  //           error={errors.name}
  //         />
  //       </div>
  //     </section>

  //     {/* SEO */}

  //     <section className="rounded-xl border p-6 dark:border-gray-800">
  //       <h2 className="mb-1 text-lg font-semibold">SEO Settings</h2>

  //       <p className="mb-5 text-sm text-gray-500">
  //         Optimize category for search engines
  //       </p>

  //       <div className="space-y-5">
  //         <Input
  //           label="SEO Title"
  //           name="seoTitle"
  //           value={formData.seoTitle}
  //           onChange={handleChange}
  //           loading={loading}
  //           error={errors.seoTitle}
  //         />

  //         <Textarea
  //           label="SEO Description"
  //           name="seoDescription"
  //           value={formData.seoDescription}
  //           onChange={handleChange}
  //           rows={4}
  //           loading={loading}
  //           error={errors.seoDescription}
  //         />
  //       </div>
  //     </section>

  //     {/* Settings */}

  //     <section>
  //       <div className="mb-5">
  //         <h2 className="text-lg font-semibold">Settings</h2>
  //       </div>

  //       <div className="flex flex-col gap-5 rounded-xl border p-5 md:flex-row md:items-center md:justify-between dark:border-gray-800">
  //         <Checkbox
  //           label="Featured Category"
  //           name="featured"
  //           checked={formData.featured}
  //           onChange={handleChange}
  //           loading={loading}
  //           error={errors.featured}
  //         />

  //         <div className="w-full md:w-64">
  //           <Select
  //             label="Status"
  //             name="status"
  //             value={formData.status}
  //             onChange={handleChange}
  //             options={[
  //               {
  //                 value: 'active',
  //                 label: 'Active',
  //               },
  //               {
  //                 value: 'inactive',
  //                 label: 'Inactive',
  //               },
  //             ]}
  //           />
  //         </div>
  //       </div>
  //     </section>

  //     {/* Submit */}

  //     <div className="flex justify-end border-t pt-6">
  //       <button
  //         disabled={loading}
  //         className="rounded-lg bg-black px-8 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-50"
  //       >
  //         {loading ? 'Saving Category...' : 'Save Category'}
  //       </button>
  //     </div>
  //   </form>
  // </div>
  // );
  // }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="my-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Add Category
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage your product categories
          </p>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={() => router.push('/dashboard/categories')}
          className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
      >
        {/* BASIC INFORMATION */}

        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Basic Information
            </h2>

            <p className="text-sm text-gray-500">
              Add basic category details
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <Input
              label="Category Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              loading={loading}
              placeholder="Hair Accessories"
            />

            <Input
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="hair-accessories"
              required
              loading={loading}
            />

            <Input
              label="Sort Order"
              name="sortOrder"
              type="number"
              value={formData.sortOrder}
              onChange={handleChange}
              placeholder="0"
              loading={loading}
            />
          </div>
        </section>

        {/* IMAGE SECTION */}

        <section className="rounded-xl border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Category Image</h2>

            <p className="text-sm text-gray-500">
              Upload category image
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <FileUpload
                label="Image"

                name="image"

                value={image}

                onChange={setImage}

                loading={loading}
              />
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="space-y-5">
                <Input
                  label="Image Alt Text"

                  name="alt"

                  value={formData.alt}

                  onChange={handleChange}

                  loading={loading}

                  placeholder="Pink hair band"
                />

                <div>
                  <p className="mb-2 text-sm font-medium">
                    Image Guidelines
                  </p>

                  <ul className="space-y-2 text-sm text-gray-500">
                    <li>✓ Recommended size: 800x800px</li>

                    <li>✓ Format: JPG, PNG, WEBP</li>

                    <li>✓ Maximum size: 5MB</li>

                    <li>✓ SEO friendly alt text</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DESCRIPTION */}

        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Description</h2>

            <p className="text-sm text-gray-500">
              Describe your category
            </p>
          </div>

          <Textarea
            label="Category Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            loading={loading}

            placeholder="Add a brief description about this category"
          />

          <div className="mt-5">
            <Input
              label="Keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              loading={loading}
              required
              placeholder="hair, clips, bands"
            />
          </div>
        </section>

        {/* SEO */}

        <section className="rounded-xl border p-6 dark:border-gray-800">
          <h2 className="mb-1 text-lg font-semibold">SEO Settings</h2>

          <p className="mb-5 text-sm text-gray-500">
            Optimize category for search engines
          </p>

          <div className="space-y-5">
            <Input
              label="SEO Title"

              name="seoTitle"

              value={formData.seoTitle}

              onChange={handleChange}

              loading={loading}
              required
              placeholder="Buy Hair Accessories Online"
            />

            <Textarea
              label="SEO Description"
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleChange}
              rows={4}
              loading={loading}
               required
              placeholder="Discover the best hair accessories for your style"
            />
          </div>
        </section>

        {/* SETTINGS */}

        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Settings</h2>
          </div>

          <div className="flex flex-col gap-5 rounded-xl border p-5 md:flex-row md:items-center md:justify-between dark:border-gray-800">
            <Checkbox
              label="Featured Category"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              loading={loading}
               required
            />

            <div className="w-full md:w-64">
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                loading={loading}
                 required
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
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving Category...
              </>
            ) : (
              'Save Category'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
