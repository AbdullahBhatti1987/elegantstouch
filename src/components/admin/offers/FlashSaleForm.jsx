'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import ProductSelector from './ProductSelector';
import CategorySelector from './CategorySelector';
import AdminPageTitle from '../common/header/AdminPageTitle';
import Input from '../common/form/Input';
import Select from '../common/form/Select';
import Textarea from '../common/form/Textarea';
import CustomDropdown from '../common/form/CustomDropdown';
import { Loader2 } from 'lucide-react';

export default function FlashSaleForm({
  initialData,
  submitText = 'Add Flash Sale',
  onSubmit,
  loading,
}) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [title, setTitle] = useState(initialData?.title || '');

  const [description, setDescription] = useState(
    initialData?.description || '',
  );

  const [categories, setCategories] = useState(
    initialData?.categories || [],
  );

  const [products, setProducts] = useState(
    initialData?.products?.map((p) => p._id) || [],
  );

  const [startTime, setStartTime] = useState(
    initialData?.startTime?.slice(0, 16) || '',
  );

  const [endTime, setEndTime] = useState(
    initialData?.endTime?.slice(0, 16) || '',
  );

  const [status, setStatus] = useState(
    initialData?.status || 'inactive',
  );

  const submit = async () => {
    const payload = {
      title,
      description,
      products,
      startTime,
      endTime,
      status,
    };

    if (!title) {
      toast.error('Sale title is required');
      return;
    }

    if (!products.length) {
      toast.error('Please select at least one product');
      return;
    }

    onSubmit(payload);
  };

  return (
    <div className="mx-auto space-y-6 rounded-2xl bg-white p-6 shadow dark:bg-neutral-900">
      <AdminPageTitle
        title={initialData ? 'Edit Flash Sale' : 'Add Flash Sale'}
        description="Manage flash sale information"
        backUrl="/dashboard/offers/flash-sale"
      />

      <div className="space-y-8 rounded-2xl border bg-white p-8 dark:bg-gray-900">
        <section>
          <h2 className="mb-5 text-lg font-semibold underline">
            Basic Information
          </h2>

          <div className="space-y-5">
            <Input
              label="Flash Sale Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              loading={loading}
            />

            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              loading={loading}
            />
          </div>
        </section>
        <section>
          <h2 className="mb-5 text-lg font-semibold underline">
            Sale Schedule
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Start Time"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              loading={loading}
            />

            <Input
              label="End Time"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              loading={loading}
            />
          </div>
        </section>
        <section>
          <h2 className="mb-5 text-lg font-semibold underline">
            Products Selection
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 font-medium">
                Filter Products By Category
              </h3>

              <CategorySelector
                selectedCategories={categories}
                setSelectedCategories={setCategories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>

            <div>
              <h3 className="mb-3 font-medium">Select Products</h3>

              <ProductSelector
                category={activeCategory}
                selectedProducts={products}
                setSelectedProducts={setProducts}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="rounded-xl border p-5">
            <CustomDropdown
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
        <div className="flex justify-end">
          <button
            onClick={submit}
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
      </div>
    </div>
  );
}
