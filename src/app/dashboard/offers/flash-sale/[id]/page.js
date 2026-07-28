'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

import AdminViewHeader from '@/components/admin/common/header/AdminViewHeader';
import ActionButtons from '@/components/admin/common/ActionButtons';
import { Info } from '@/components/admin/common/form/Info';
import NotFound from '@/components/admin/common/states/NotFound';
import FlashSaleDetailSkeleton from '@/components/admin/common/skeleton/detailSkeletons/FlashSaleDetailSkeleton';

import { useLoading } from '@/context/LoadingContext';

export default function FlashSaleDetailPage() {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();

  const [sale, setSale] = useState(null);

  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    async function getSale() {
      try {
        startLoading();

        const { data } = await axios.get(`/api/flash-sale/${id}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (data.success) {
          setSale(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    }

    if (id) {
      getSale();
    }
  }, [id]);

  if (loading) {
    return <FlashSaleDetailSkeleton />;
  }

  if (!sale) {
    return (
      <NotFound
        title="Flash Sale Not Found"
        message="The flash sale you are looking for does not exist or has been removed."
        buttonText="Back to Flash Sales"
      />
    );
  }

  return (
    <div className="mt-4">
      <AdminViewHeader
        title={sale.title}
        subtitle="Flash Sale Details"
      />

      {/* Main Info */}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Sale Information */}

        <div className="relative space-y-4 rounded-xl border bg-white p-6 md:col-span-3 dark:bg-zinc-900">
          <ActionButtons
            onEdit={() =>
              router.push(`/dashboard/offers/flash-sale/update/${id}`)
            }

            onDelete={() => {}}
          />

          <Info label="Title" value={sale.title} />

          <Info label="Description" value={sale.description} />

          <Info label="Status" value={sale.status} />

          <Info
            label="Start Time"
            value={
              sale.startTime
                ? new Date(sale.startTime).toLocaleString()
                : '-'
            }
          />

          <Info
            label="End Time"
            value={
              sale.endTime
                ? new Date(sale.endTime).toLocaleString()
                : '-'
            }
          />
        </div>
      </div>

      {/* Products */}

      <div className="mt-6 rounded-xl border bg-white p-6 dark:bg-zinc-900">
        <h2 className="mb-5 text-xl font-semibold">
          Sale Products ({sale.products?.length || 0})
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {sale.products?.map((product) => (
            <div key={product._id} className="rounded-xl border p-3">
              <img
                src={
                  product.images?.[0]?.thumbnail ||
                  '/images/placeholder.jpg'
                }
                alt={product.name}
                className="h-40 w-full rounded-lg object-cover"
              />

              <p className="mt-3 font-semibold">{product.name}</p>

              <p className="text-sm text-gray-500">
                Price: {product.price}
              </p>

              {product.salePrice && (
                <p className="text-sm text-rose-600">
                  Sale Price: {product.salePrice}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
