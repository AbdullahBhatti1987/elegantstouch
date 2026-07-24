'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Input from '@/components/admin/common/form/Input';
import CustomDropdown from '../common/form/CustomDropdown';
import AdminPageTitle from '../common/header/AdminPageTitle';

const defaultForm = {
  code: '',
  discountType: 'percentage',
  maxDiscount: '',
  value: '',
  minOrderAmount: 0,
  usageLimit: 0,
  expiryDate: '',
  applyType: 'all',

  categoryIds: [],
  productIds: [],

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
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(defaultForm);

  const getCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/categories/dropdown');

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    if (!categoryId) {
      setProducts([]);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      categoryIds: [categoryId],
      productIds: [],
    }));

    const { data } = await axios.get(
      `/api/products/dropdown?categoryId=${categoryId}`,
    );
    console.log('PRODUCT DATA:', data);
    if (data.success) {
      setProducts(data.data);
    }
  };
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
        categoryIds: initialData.categoryIds || [],
        productIds: initialData.productIds || [],
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

    if (
      formData.applyType === 'products' &&
      formData.productIds.length === 0
    ) {
      errors.push('Select at least one product');
    }

    if (
      formData.applyType === 'categories' &&
      formData.categoryIds.length === 0
    ) {
      errors.push('Select category');
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
        if (key === 'productIds' || key === 'categoryIds') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
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
      <AdminPageTitle
        title={initialData ? 'Edit Coupon' : 'Add Coupon'}
        description="Manage discount coupons"
        backUrl="/dashboard/coupons"
      />

      <form
        onSubmit={handleSubmit}

        className="space-y-8 rounded-2xl border bg-white p-8 dark:bg-gray-900"
      >
        <section className="rounded-xl border p-6">
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
              className={'uppercase'}
            />

            <CustomDropdown
              label="Discount Type"
              value={formData.discountType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  discountType: e.target.value,
                }))
              }
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
              label="Maximum Discount"
              name="maxDiscount"
              type="number"
              value={formData.maxDiscount}
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
            {/* APPLY TYPE */}

            <CustomDropdown
              label="Apply Type"
              value={formData.applyType}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  applyType: e.target.value,
                  categoryIds: [],
                  productIds: [],
                }));

                setProducts([]);
              }}
              options={[
                {
                  value: 'all',
                  label: 'All Products',
                },
                {
                  value: 'products',
                  label: 'Specific Products',
                },
                {
                  value: 'categories',
                  label: 'Specific Category',
                },
              ]}
            />

            {/* CATEGORY DROPDOWN */}

            {formData.applyType !== 'all' && (
              <CustomDropdown
                label="Category"
                value={formData.categoryIds[0] || ''}
                onChange={(e) => {
                  handleCategoryChange(e);
                }}
                options={categories.map((category) => ({
                  value: category._id,
                  label: category.name,
                }))}
                placeholder="Select Category"
              />
            )}

            {/* PRODUCT CHECKBOX DROPDOWN */}

            {formData.applyType === 'products' &&
              products.length > 0 && (
                <CustomDropdown
                  label="Select Products"

                  multiple={true}

                  selectedValues={formData.productIds}

                  onChange={(values) => {
                    setFormData((prev) => ({
                      ...prev,
                      productIds: values,
                    }));
                  }}

                  options={products.map((product) => ({
                    value: product._id,
                    label: product.name,
                  }))}

                  placeholder="Select Products"
                />
              )}
          </div>
        </section>

        <section>
          <div className="rounded-xl border p-6">
            <div className="grid gap-5 md:grid-cols-3">
              <CustomDropdown
                label="Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
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

              <Input
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleChange}
                loading={loading}
              />
            </div>
          </div>
        </section>

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
