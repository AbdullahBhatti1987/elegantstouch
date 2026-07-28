'use client';

import { useState } from 'react';

import axios from 'axios';

import { useRouter } from 'next/navigation';

import ProductSelector from './ProductSelector';

export default function FlashSaleForm({ initialData }) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');

  const [description, setDescription] = useState(
    initialData?.description || '',
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

  async function submit() {
    const payload = {
      title,

      description,

      products,

      startTime,

      endTime,

      status,
    };

    if (initialData) {
      await axios.put(
        `/api/flash-sale/${initialData._id}`,

        payload,
      );
    } else {
      await axios.post(
        '/api/flash-sale',

        payload,
      );
    }

    router.push('/admin/offers/flash-sale');
  }

  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow dark:bg-neutral-900">
      <input
        value={title}

        onChange={(e) => setTitle(e.target.value)}

        placeholder="Sale Title"

        className="input"
      />

      <textarea
        value={description}

        onChange={(e) => setDescription(e.target.value)}

        placeholder="Description"

        className="input"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="datetime-local"

          value={startTime}

          onChange={(e) => setStartTime(e.target.value)}

          className="input"
        />

        <input
          type="datetime-local"

          value={endTime}

          onChange={(e) => setEndTime(e.target.value)}

          className="input"
        />
      </div>

      <select
        value={status}

        onChange={(e) => setStatus(e.target.value)}

        className="input"
      >
        <option value="active">Active</option>

        <option value="inactive">Inactive</option>
      </select>

      <h3 className="font-bold">Select Products</h3>

      <ProductSelector
        selected={products}

        setSelected={setProducts}
      />

      <button
        onClick={submit}

        className="rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white"
      >
        Save Flash Sale
      </button>
    </div>
  );
}
