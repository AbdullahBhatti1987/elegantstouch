import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

import FlashSale from '@/models/FlashSale';

export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search') || '';

    const page = Number(searchParams.get('page')) || 1;

    const limit = Number(searchParams.get('limit')) || 8;

    const skip = (page - 1) * limit;

    const query = {};

    // Search

    if (search) {
      query.title = {
        $regex: search,
        $options: 'i',
      };
    }

    const total = await FlashSale.countDocuments(query);

    const sales = await FlashSale.find(query)

      .populate('products', 'name price salePrice images slug')

      .sort({
        createdAt: -1,
      })

      .skip(skip)

      .limit(limit);

    return NextResponse.json({
      success: true,

      data: sales,

      pagination: {
        page,

        limit,

        total,

        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log('GET FLASH SALES ERROR:', error);

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
