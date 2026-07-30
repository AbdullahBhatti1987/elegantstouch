import { NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongodb';

import FlashSale from '@/models/FlashSale';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') || 1);

    const limit = Number(searchParams.get('limit') || 12);

    const skip = (page - 1) * limit;

    const sale = await FlashSale.findOne({
      status: 'active',
      endTime: {
        $gt: new Date(),
      },
    });

    if (!sale) {
      return NextResponse.json({
        success: true,
        data: null,
      });
    }

    const totalProducts = sale.products.length;

    const products = await Product.find({
      _id: {
        $in: sale.products,
      },
    })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,

      data: {
        _id: sale._id,

        title: sale.title,

        description: sale.description,

        endTime: sale.endTime,

        products,

        pagination: {
          page,

          limit,

          totalProducts,

          totalPages: Math.ceil(totalProducts / limit),

          hasMore: skip + products.length < totalProducts,
        },
      },
    });
  } catch (error) {
    console.log('GET ACTIVE FLASH SALE ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'No active flash sale found',
      },
      {
        status: 500,
      },
    );
  }
}
