import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

import FlashSale from '@/models/FlashSale';

export async function GET() {
  await connectDB();

  try {
    const sale = await FlashSale.findOne({
      status: 'active',

      endTime: {
        $gt: new Date(),
      },
    })
      .populate('products', 'name price salePrice images slug')
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,

      data: sale,
    });
  } catch (error) {
    console.log('GET ACTIVE FLASH SALE ERROR:', error);

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
