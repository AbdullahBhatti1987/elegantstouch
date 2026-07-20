'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

import Input from '@/components/admin/common/form/Input';
import Textarea from '@/components/admin/common/form/Textarea';
import Checkbox from '@/components/admin/common/form/Checkbox';
import MultiImageUpload from '@/components/admin/common/form/MultiImageUpload';

const defaultForm = {
  sku: '',
  name: '',
  slug: '',

  categoryId: '',
  brand: '',
  collectionName: '',

  price: '',
  salePrice: '',
  currency: 'PKR',

  stock: '',
  inStock: true,

  badge: '',

  shortDescription: '',
  description: '',

  features: '',

  material: '',
  color: '',
  ageGroup: '',
  weight: '',

  tags: '',

  seoTitle: '',
  seoDescription: '',
  keywords: '',

  status: 'active',
  featured: false,
};

export default function ProductForm({
  initialData = null,
  onSubmit,
  submitText = 'Save Product',
  loading,
  setLoading,
}) {
  const router = useRouter();

  const [formData, setFormData] = useState(defaultForm);

  const [categories, setCategories] = useState([]);

  const [images, setImages] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get('/api/categories');

        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, []);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      sku: initialData.sku || '',
      name: initialData.name || '',
      slug: initialData.slug || '',

      categoryId:
        initialData.categoryId?._id || initialData.categoryId || '',

      brand: initialData.brand || '',
      collectionName: initialData.collectionName || '',

      price: initialData.price || '',
      salePrice: initialData.salePrice || '',

      currency: initialData.currency || 'PKR',

      stock: initialData.stock || '',

      inStock: initialData.inStock ?? true,

      badge: initialData.badge || '',

      shortDescription: initialData.shortDescription || '',

      description: initialData.description || '',

      features: initialData.features || '',

      material: initialData.material || '',

      color: initialData.color || '',

      ageGroup: initialData.ageGroup || '',

      weight: initialData.weight || '',

      tags: initialData.tags?.join(', ') || '',

      seoTitle: initialData.seoTitle || '',

      seoDescription: initialData.seoDescription || '',

      keywords: initialData.keywords?.join(', ') || '',

      status: initialData.status || 'active',

      featured: initialData.featured || false,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };

      if (name === 'name') {
        updated.slug = value
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
      }

      return updated;
    });
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim())
      errors.push('Product name is required');

    if (!formData.sku.trim()) errors.push('SKU is required');

    if (!formData.categoryId) errors.push('Category is required');

    if (!formData.price) errors.push('Price is required');

    if (!formData.stock) errors.push('Stock is required');

    if (images.length === 0)
      errors.push('Product images are required');

    if (!formData.description.trim())
      errors.push('Description is required');

    if (!formData.material.trim())
      errors.push('Material is required');

    if (!formData.color.trim()) errors.push('Color is required');

    if (!formData.seoTitle.trim())
      errors.push('SEO title is required');

    if (!formData.seoDescription.trim())
      errors.push('SEO description is required');

    if (!formData.keywords.trim())
      errors.push('Keywords are required');

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (errors.length) {
      errors.forEach((error) => toast.error(error));

      return;
    }

    try {
      setLoading(true);
      setSubmitting(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((item) => {
        data.append('images', item.file);
      });

      await onSubmit(data);
    } catch (error) {
      console.log(error);

      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      {/* HEADER */}

      <div className="my-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {initialData ? 'Edit Product' : 'Add Product'}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage product information
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
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
        <section>
          <h2 className="mb-5 text-lg font-semibold">
            Basic Information
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              loading={loading}
            />

            <Input
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              loading={loading}
            />

            <Input
              label="Slug"
              name="slug"
              value={formData.slug}
              readOnly
              loading={loading}
            />

            <div>
              <label className="mb-2 block font-medium">
                Category
              </label>

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              loading={loading}
            />

            <Input
              label="Collection Name"
              name="collectionName"
              value={formData.collectionName}
              onChange={handleChange}
              loading={loading}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-lg font-semibold">
            Pricing & Stock
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <Input
              label="Price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              loading={loading}
            />

            <Input
              label="Sale Price"
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              loading={loading}
            />

            <Input
              label="Stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              loading={loading}
            />
          </div>

          <Checkbox
            label="Available In Stock"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            loading={loading}
          />
        </section>

        <MultiImageUpload
          value={images}
          onChange={setImages}
          loading={loading}
        />

        <section>
          <h2 className="mb-5 text-lg font-semibold">Description</h2>

          <Textarea
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            loading={loading}
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            loading={loading}
          />

          <Input
            label="Features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            loading={loading}
          />
        </section>

        <section>
          <h2 className="mb-5 text-lg font-semibold">
            Specifications
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              loading={loading}
            />

            <Input
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              loading={loading}
            />

            <Input
              label="Age Group"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
              loading={loading}
            />

            <Input
              label="Weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              loading={loading}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-lg font-semibold">SEO</h2>

          <Input
            label="SEO Title"
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleChange}
            loading={loading}
          />

          <Textarea
            label="SEO Description"
            name="seoDescription"
            value={formData.seoDescription}
            onChange={handleChange}
            loading={loading}
          />

          <Input
            label="Keywords"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            loading={loading}
          />
        </section>

        <div className="flex justify-end border-t pt-6">
          <button
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
