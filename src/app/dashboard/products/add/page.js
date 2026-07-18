'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import MultiImageUpload from '@/components/admin/common/form/MultiImageUpload';
import Input from '@/components/admin/common/form/Input';
import Textarea from '@/components/admin/common/form/Textarea';
import Checkbox from '@/components/admin/common/form/Checkbox';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

    if (!formData.name.trim()) {
      errors.push('Product name is required');
    }

    if (!formData.sku.trim()) {
      errors.push('SKU is required');
    }

    if (!formData.slug.trim()) {
      errors.push('Product slug is required');
    }

    if (!formData.categoryId) {
      errors.push('Category is required');
    }

    if (!formData.brand.trim()) {
      errors.push('Brand is required');
    }

    if (!formData.price) {
      errors.push('Price is required');
    }

    if (!formData.stock) {
      errors.push('Stock is required');
    }

    if (!images || images.length === 0) {
      errors.push('Product images are required');
    }

    if (!formData.shortDescription.trim()) {
      errors.push('Short description is required');
    }

    if (!formData.description.trim()) {
      errors.push('Product description is required');
    }

    if (!formData.material.trim()) {
      errors.push('Material is required');
    }

    if (!formData.color.trim()) {
      errors.push('Color is required');
    }

    if (!formData.ageGroup.trim()) {
      errors.push('Age group is required');
    }

    if (!formData.weight.trim()) {
      errors.push('Weight is required');
    }

    if (!formData.seoTitle.trim()) {
      errors.push('SEO title is required');
    }

    if (!formData.seoDescription.trim()) {
      errors.push('SEO description is required');
    }

    if (!formData.keywords.trim()) {
      errors.push('Keywords are required');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));

      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      // Normal fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Multiple product images
      images.forEach((item) => {
        data.append('images', item.file);
      });

      const response = await axios.post('/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(
          response.data.message || 'Product added successfully',
        );

        setTimeout(() => {
          router.push('/dashboard/products');
        }, 1500);
      } else {
        toast.error(
          response.data.message || 'Product creation failed',
        );
      }
    } catch (error) {
      console.error('Add Product Error:', error);

      toast.error(
        error.response?.data?.message ||
          'Something went wrong while adding product',
      );
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div>
      {/* Header */}

      <div className="my-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Add Product</h1>

          <p className="text-gray-500">Create new store product</p>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg border bg-black px-4 py-2 text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-xl border bg-white p-6 dark:bg-gray-900"
      >
        {/* Basic Information */}

        <section title="Basic Information">
          <div className="grid gap-6 md:grid-cols-2">
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
              onChange={handleChange}
              loading={loading}
              readOnly
            />

            <div>
              <label className="mb-2 block font-medium">
                Category
              </label>

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                loading={loading}
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

        {/* Pricing */}

        <section title="Pricing & Stock">
          <div className="grid gap-6 md:grid-cols-3">
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
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            loading={loading}
          />
        </section>

        {/* Images */}

        <MultiImageUpload
          value={images}
          onChange={setImages}
          loading={loading}
        />

        {/* Description */}

        <section title="Description">
          <Textarea
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            loading={loading}
          />

          <Textarea
            label="Full Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            loading={loading}
          />

          <Input
            label="Features (comma separated)"
            name="features"
            value={formData.features}
            onChange={handleChange}
            loading={loading}
          />
        </section>

        {/* Specifications */}

        <section title="Specifications">
          <div className="grid gap-6 md:grid-cols-2">
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

        {/* Tags */}

        <section title="Tags">
          <Input
            label="Tags (comma separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            loading={loading}
          />
        </section>

        {/* SEO */}

        <section title="SEO">
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
        <div className="flex items-center justify-end">
          <button
            disabled={loading}
            className="rounded-lg bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
