'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Input from '@/components/admin/common/form/Input';
import Select from '@/components/admin/common/form/Select';

const defaultForm = {
  code: '',
  discountType: 'percentage',
  value: '',
  minOrderAmount: 0,
  usageLimit: 0,
  expiryDate: '',
  applyType: 'all',
  productId: '',
  categoryId: '',
  status: 'active',
};

export default function CouponForm({
  initialData = null,
  onSubmit,
  submitText = 'Save Coupon',
  loading,
  setLoading,
}) {
  const router = useRouter();

  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        discountType: initialData.discountType || 'percentage',
        value: initialData.value || '',
        minOrderAmount: initialData.minOrderAmount || 0,
        usageLimit: initialData.usageLimit || 0,
        expiryDate: initialData.expiryDate
          ? initialData.expiryDate.substring(0, 10)
          : '',
        applyType: initialData.applyType || 'all',
        productId: initialData.productId || '',
        categoryId: initialData.categoryId || '',
        status: initialData.status || 'active',
      });
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

    if (!formData.code.trim()) {
      errors.push('Coupon code is required');
    }

    if (!formData.value) {
      errors.push('Discount value is required');
    }

    if (!formData.expiryDate) {
      errors.push('Expiry date is required');
    }

    if (formData.applyType === 'product' && !formData.productId) {
      errors.push('Product is required');
    }

    if (formData.applyType === 'category' && !formData.categoryId) {
      errors.push('Category is required');
    }

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

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await onSubmit(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <div className="my-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {initialData ? 'Edit Coupon' : 'Add Coupon'}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage discount coupons
          </p>
        </div>

        <button
          type="button"

          onClick={() => router.push('/dashboard/coupons')}

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
            Coupon Information
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <Input
              label="Coupon Code"

              name="code"

              value={formData.code}

              onChange={handleChange}

              loading={loading}
            />

            <Select
              label="Discount Type"

              name="discountType"

              value={formData.discountType}

              onChange={handleChange}

              loading={loading}

              options={[
                {
                  value: 'percentage',
                  label: 'Percentage',
                },
                {
                  value: 'fixed',
                  label: 'Flat Amount',
                },
              ]}
            />

            <Input
              label="Discount Value"

              name="value"

              type="number"

              value={formData.value}

              onChange={handleChange}

              loading={loading}
            />
          </div>
        </section>

        <section className="rounded-xl border p-6">
          <h2 className="mb-5 text-lg font-semibold">Rules</h2>

          <div className="grid gap-5 md:grid-cols-3">
            <Input
              label="Minimum Order Amount"

              name="minOrderAmount"

              type="number"

              value={formData.minOrderAmount}

              onChange={handleChange}

              loading={loading}
            />

            <Input
              label="Usage Limit"

              name="usageLimit"

              type="number"

              value={formData.usageLimit}

              onChange={handleChange}

              loading={loading}
            />

            <Input
              label="Expiry Date"

              name="expiryDate"

              type="date"

              value={formData.expiryDate}

              onChange={handleChange}

              loading={loading}
            />
          </div>
        </section>

        <section className="rounded-xl border p-6">
          <h2 className="mb-5 text-lg font-semibold">
            Apply Coupon On
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <Select
              label="Apply Type"

              name="applyType"

              value={formData.applyType}

              onChange={handleChange}

              loading={loading}

              options={[
                {
                  value: 'all',
                  label: 'All Products',
                },
                {
                  value: 'product',
                  label: 'Specific Product',
                },
                {
                  value: 'category',
                  label: 'Specific Category',
                },
              ]}
            />

            {formData.applyType === 'product' && (
              <Input
                label="Product ID"

                name="productId"

                value={formData.productId}

                onChange={handleChange}

                loading={loading}
              />
            )}

            {formData.applyType === 'category' && (
              <Input
                label="Category ID"

                name="categoryId"

                value={formData.categoryId}

                onChange={handleChange}

                loading={loading}
              />
            )}
          </div>
        </section>

        <section>
          <div className="w-full md:w-64">
            <Select
              label="Status"

              name="status"

              value={formData.status}

              onChange={handleChange}

              loading={loading}

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
        </section>

        <div className="flex justify-end border-t pt-6">
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
