'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();

  const router = useRouter();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  async function getProduct() {
    try {
      const { data } = await axios.get(`/api/products/${params.id}`);

      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Product not found',
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct() {
    const confirmDelete = confirm(
      'Are you sure you want to delete this product?',
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(
        `/api/products/${params.id}`,
      );

      if (data.success) {
        toast.success('Product deleted');

        router.push('/dashboard/products');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  }

  useEffect(() => {
    if (params.id) {
      getProduct();
    }
  }, [params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="pt-4 flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-gray-500">Product Details</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-black text-white rounded-lg border px-4 py-2"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        
        </div>
      </div>

      {/* Product Card */}

      <div className="grid gap-8 rounded-xl border bg-white p-6 md:grid-cols-2">
        {/* Image */}

        <div className="relative h-[400px]">
          <Image
            src={product?.image }

            alt={product?.name}

            fill

            className="rounded-xl object-cover"
          />
        </div>

        {/* Details */}

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Information</h2>

          <p>
            SKU:
            <b className="ml-2">{product.sku}</b>
          </p>

          <p>
            Category:
            <b className="ml-2">{product.categoryId?.name}</b>
          </p>

          <p>
            Price:
            <b className="ml-2">
              {product.price}
              {product.currency}
            </b>
          </p>

          <p>
            Sale Price:
            <b className="ml-2">{product.salePrice || '-'}</b>
          </p>

          <p>
            Stock:
            <b className="ml-2">{product.stock}</b>
          </p>

          <p>Description:</p>

          <p className="text-gray-500">{product.description}</p>
        </div>
      </div>
      <div className="flex gap-3">
          <button
            onClick={() =>
              router.push(`/dashboard/products/${product._id}/edit`)
            }
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
          >
            <Edit size={18} />
            Edit
          </button>

          <button
            onClick={deleteProduct}

            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            <Trash size={18} />
            Delete
          </button>
      </div>
    </div>
  );
}
