import { NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongodb';

import FlashSale from '@/models/FlashSale';

export async function GET(req, { params }) {
  await connectDB();

  const sale = await FlashSale.findById(params.id).populate(
    'products',
    'name price salePrice images',
  );

  return NextResponse.json({
    success: true,

    data: sale,
  });
}

export async function PUT(req, { params }) {
  await connectDB();

  const body = await req.json();

  const sale = await FlashSale.findByIdAndUpdate(
    params.id,

    body,

    {
      new: true,
    },
  );

  return NextResponse.json({
    success: true,

    data: sale,
  });
}

export async function DELETE(req, { params }) {
  await connectDB();

  await FlashSale.findByIdAndDelete(params.id);

  return NextResponse.json({
    success: true,
  });
}
