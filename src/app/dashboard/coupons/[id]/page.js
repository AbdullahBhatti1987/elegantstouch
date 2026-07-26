'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

import ConfirmModal from '@/components/admin/common/ConfirmModal';
import AdminViewHeader from '@/components/admin/common/header/AdminViewHeader';
import ActionButtons from '@/components/admin/common/ActionButtons';
import CouponDetailSkeleton from '@/components/admin/common/skeleton/detailSkeletons/CouponDetailSkeleton';
import NotFound from '@/components/admin/common/states/NotFound';
import { Info } from '@/components/admin/common/form/Info';

import { useLoading } from '@/context/LoadingContext';

export default function CouponDetailPage() {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();

  const [coupon, setCoupon] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    async function getCoupon() {
      startLoading();

      try {
        const { data } = await axios.get(`/api/coupons/${id}`);

        console.log('coupon==>', data);

        if (data.success) {
          setCoupon(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    }

    if (id) {
      getCoupon();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      startLoading();

      const { data } = await axios.delete(`/api/coupons/${id}`);

      if (data.success) {
        router.push('/dashboard/coupons');
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();

      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return <CouponDetailSkeleton />;
  }

  if (!coupon) {
    return (
      <NotFound
        title="Coupon Not Found"

        message="The coupon you are looking for does not exist or has been removed."

        buttonText="Back to Coupons"
      />
    );
  }

  return (
    <>
      <div className="mt-4">
        {/* Header */}

        <AdminViewHeader
          title={coupon.name}

          subtitle="Coupon Details"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {/* Coupon Info */}

          <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
            <div className="mb-5 flex items-center justify-center rounded-lg bg-zinc-100 p-8 dark:bg-zinc-800">
              <div className="text-center">
                <p className="text-sm text-gray-500">Coupon Code</p>

                <h2 className="mt-2 text-3xl font-bold tracking-widest">
                  {coupon.code}
                </h2>
              </div>
            </div>

            <Info
              label="Status"

              value={coupon.status}
            />
          </div>

          {/* Details */}

          <div className="relative space-y-4 rounded-xl border bg-white p-6 md:col-span-2 dark:bg-zinc-900">
            <ActionButtons
              onEdit={() =>
                router.push(`/dashboard/coupons/update/${id}`)
              }

              onDelete={() => setShowDeleteModal(true)}
            />

            <Info
              label="Name"

              value={coupon.name}
            />

            <Info
              label="Code"

              value={coupon.code}
            />

            <Info
              label="Type"

              value={coupon.type}
            />

            <Info
              label="Discount Value"

              value={
                coupon.discountType === 'percentage'
                  ? `${coupon.value}%`
                  : coupon.value
              }
            />

            <Info
              label="Minimum Purchase"

              value={coupon.minPurchase}
            />

            <Info
              label="Maximum Discount"

              value={coupon.maxDiscount}
            />
          </div>
        </div>

        {/* Extra Information */}

        <div className="mt-6 space-y-4 rounded-xl border bg-white p-6 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold">
            Additional Information
          </h2>

          <Info
            label="Description"

            value={coupon.description}
          />

          <Info
            label="Usage Limit"

            value={coupon.usageLimit}
          />

          <Info
            label="Used Count"

            value={coupon.usedCount}
          />

          <Info
            label="Expiry Date"

            value={
              coupon.expiryDate
                ? new Date(coupon.expiryDate).toLocaleDateString()
                : '-'
            }
          />
        </div>
      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Coupon"
        message="
    This coupon will be permanently deleted.
  "
        requireText={coupon.code}
        confirmText="Delete Coupon"
        loading={loading}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
