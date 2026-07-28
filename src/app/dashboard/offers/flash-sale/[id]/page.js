"use client"

import FlashSaleForm from '@/components/admin/flash-sale/FlashSaleForm';
import axios from 'axios';

async function getSale(id) {
  const { data } = await axios.get(`/api/flash-sale/${id}`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  return data.data;
}

export default async function Page({ params }) {
  const sale = await getSale(params.id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Flash Sale</h1>

      <FlashSaleForm initialData={sale} />
    </div>
  );
}
