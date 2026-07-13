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
  import CategoryForm from '@/components/admin/categories/CategoryForm';

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

   const handleCreate = async (payload) => {

  try {
    setLoading(true);

    const response = await axios.post(
      '/api/categories',
      payload
    );

    if (response.data.success) {
      toast.success('Category added successfully');

      setTimeout(() => {
        router.push('/dashboard/categories');
      }, 2000);
    }

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      error.message ||
      'Something went wrong'
    );
  } finally {
    setLoading(false);
  }
};



    return (
      <div className="mx-auto 
      ">
        {/* Header */}
        
        <CategoryForm
          onSubmit={handleCreate}
          submitText="Save Category"
        />
      </div>
    );
  }

// <form
//   onSubmit={handleSubmit}
//   className="space-y-8 rounded-2xl border bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
// >
//   {/* BASIC INFORMATION */}

//   <section>
//     <div className="mb-5">
//       <h2 className="text-lg font-semibold">
//         Basic Information
//       </h2>

//       <p className="text-sm text-gray-500">
//         Add basic category details
//       </p>
//     </div>

//     <div className="grid gap-5 md:grid-cols-3">
//       <Input
//         label="Category Name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//         loading={loading}
//         placeholder="Hair Accessories"
//       />

//       <Input
//         label="Slug"
//         name="slug"
//         value={formData.slug}
//         onChange={handleChange}
//         placeholder="hair-accessories"
//         required
//         loading={loading}
//       />

//       <Input
//         label="Sort Order"
//         name="sortOrder"
//         type="number"
//         value={formData.sortOrder}
//         onChange={handleChange}
//         placeholder="0"
//         loading={loading}
//       />
//     </div>
//   </section>

//   {/* IMAGE SECTION */}

//   <section className="rounded-xl border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
//     <div className="mb-5">
//       <h2 className="text-lg font-semibold">Category Image</h2>

//       <p className="text-sm text-gray-500">
//         Upload category image
//       </p>
//     </div>

//     <div className="grid gap-8 md:grid-cols-2">
//       <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
//         <FileUpload
//           label="Image"

//           name="image"

//           value={image}

//           onChange={setImage}

//           loading={loading}
//         />
//       </div>

//       <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
//         <div className="space-y-5">
//           <Input
//             label="Image Alt Text"

//             name="alt"

//             value={formData.alt}

//             onChange={handleChange}

//             loading={loading}

//             placeholder="Pink hair band"
//           />

//           <div>
//             <p className="mb-2 text-sm font-medium">
//               Image Guidelines
//             </p>

//             <ul className="space-y-2 text-sm text-gray-500">
//               <li>✓ Recommended size: 800x800px</li>

//               <li>✓ Format: JPG, PNG, WEBP</li>

//               <li>✓ Maximum size: 5MB</li>

//               <li>✓ SEO friendly alt text</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>

//   {/* DESCRIPTION */}

//   <section>
//     <div className="mb-5">
//       <h2 className="text-lg font-semibold">Description</h2>

//       <p className="text-sm text-gray-500">
//         Describe your category
//       </p>
//     </div>

//     <Textarea
//       label="Category Description"
//       name="description"
//       value={formData.description}
//       onChange={handleChange}
//       rows={5}
//       loading={loading}

//       placeholder="Add a brief description about this category"
//     />

//     <div className="mt-5">
//       <Input
//         label="Keywords"
//         name="keywords"
//         value={formData.keywords}
//         onChange={handleChange}
//         loading={loading}
//         required
//         placeholder="hair, clips, bands"
//       />
//     </div>
//   </section>

//   {/* SEO */}

//   <section className="rounded-xl border p-6 dark:border-gray-800">
//     <h2 className="mb-1 text-lg font-semibold">SEO Settings</h2>

//     <p className="mb-5 text-sm text-gray-500">
//       Optimize category for search engines
//     </p>

//     <div className="space-y-5">
//       <Input
//         label="SEO Title"

//         name="seoTitle"

//         value={formData.seoTitle}

//         onChange={handleChange}

//         loading={loading}
//         required
//         placeholder="Buy Hair Accessories Online"
//       />

//       <Textarea
//         label="SEO Description"
//         name="seoDescription"
//         value={formData.seoDescription}
//         onChange={handleChange}
//         rows={4}
//         loading={loading}
//         required
//         placeholder="Discover the best hair accessories for your style"
//       />
//     </div>
//   </section>

//   {/* SETTINGS */}

//   <section>
//     <div className="mb-5">
//       <h2 className="text-lg font-semibold">Settings</h2>
//     </div>

//     <div className="flex flex-col gap-5 rounded-xl border p-5 md:flex-row md:items-center md:justify-between dark:border-gray-800">
//       <Checkbox
//         label="Featured Category"
//         name="featured"
//         checked={formData.featured}
//         onChange={handleChange}
//         loading={loading}
//         required
//       />

//       <div className="w-full md:w-64">
//         <Select
//           label="Status"
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           loading={loading}
//           required
//           options={[
//             {
//               value: 'active',
//               label: 'Active',
//             },
//             {
//               value: 'inactive',
//               label: 'Inactive',
//             },
//           ]}
//         />
//       </div>
//     </div>
//   </section>

//   {/* SUBMIT */}

//   <div className="flex justify-end border-t pt-6">
//     <button
//       type="submit"
//       disabled={loading}
//       className="flex items-center gap-2 rounded-lg bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
//     >
//       {loading ? (
//         <>
//           <Loader2 size={18} className="animate-spin" />
//           Saving Category...
//         </>
//       ) : (
//         'Save Category'
//       )}
//     </button>
//   </div>
// </form>
