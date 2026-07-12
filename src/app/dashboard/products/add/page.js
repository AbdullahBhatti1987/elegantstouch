'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    slug: '',

    categoryId: '',
    brand: '',
    collection: '',

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

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        ...formData,

        price: Number(formData.price),

        salePrice: formData.salePrice
          ? Number(formData.salePrice)
          : null,

        stock: Number(formData.stock),

        features: formData.features || '',

        tags: formData.tags
          ? formData.tags.split(',').map((item) => item.trim())
          : [],

        keywords: formData.keywords
          ? formData.keywords.split(',').map((item) => item.trim())
          : [],
      };

      const { data } = await axios.post('/api/products', payload);

      if (data.success) {
        toast.success(data.message || 'Product added successfully');

        setTimeout(() => {
          router.push('/dashboard/products');
        }, 1500);
      } else {
        toast.error(data.message || 'Product creation failed');
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

        <Section title="Basic Information">
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />

            <Input
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
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
            />

            <Input
              label="Collection"
              name="collection"
              value={formData.collection}
              onChange={handleChange}
            />
          </div>
        </Section>

        {/* Pricing */}

        <Section title="Pricing & Stock">
          <div className="grid gap-6 md:grid-cols-3">
            <Input
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <Input
              label="Sale Price"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
            />

            <Input
              label="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
            Available In Stock
          </label>
        </Section>

        {/* Images */}

        <Section title="Product Images">
          <input
            type="file"
            multiple
            className="w-full rounded-lg border p-2"
          />
        </Section>

        {/* Description */}

        <Section title="Description">
          <Textarea
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
          />

          <Textarea
            label="Full Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <Input
            label="Features (comma separated)"
            name="features"
            value={formData.features}
            onChange={handleChange}
          />
        </Section>

        {/* Specifications */}

        <Section title="Specifications">
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Material"
              name="material"
              value={formData.material}
              onChange={handleChange}
            />

            <Input
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />

            <Input
              label="Age Group"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
            />

            <Input
              label="Weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </Section>

        {/* Tags */}

        <Section title="Tags">
          <Input
            label="Tags (comma separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </Section>

        {/* SEO */}

        <Section title="SEO">
          <Input
            label="SEO Title"
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleChange}
          />

          <Textarea
            label="SEO Description"
            name="seoDescription"
            value={formData.seoDescription}
            onChange={handleChange}
          />

          <Input
            label="Keywords"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
          />
        </Section>

        <button
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="">
      <h2 className="mb-5 text-lg font-semibold">{title}</h2>

      {children}
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

function Textarea({ label, name, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="4"
        className="w-full rounded-lg border p-3"
      />
    </div>
  );
}
