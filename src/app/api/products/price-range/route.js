import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();

    const result = await Product.aggregate([
      {
        $project: {
          salePriceValue: {
            $ifNull: ['$salePrice', '$price'],
          },

          price: 1,
        },
      },

      {
        $group: {
          _id: null,

          minPrice: {
            $min: '$salePriceValue',
          },

          maxPrice: {
            $max: '$price',
          },
        },
      },
    ]);

    return NextResponse.json({
      success: true,

      data: result[0] || {
        minPrice: 0,
        maxPrice: 0,
      },
    });
  } catch (error) {
    console.log('PRICE RANGE ERROR:', error);

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
