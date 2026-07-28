import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

import FlashSale from '@/models/FlashSale';

export async function GET() {
  await connectDB();

  const sales = await FlashSale.find()
    .populate('products', 'name price salePrice images')
    .sort({
      createdAt: -1,
    });

  return NextResponse.json({
    success: true,

    data: sales,
  });
}

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();

    const sale = await FlashSale.create(body);

    return NextResponse.json({
      success: true,

      data: sale,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,

        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
