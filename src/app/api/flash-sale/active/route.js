import { NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongodb';

import FlashSale from '@/models/FlashSale';
import Product from '@/models/Product'; // 👈 add this

export async function GET() {
  try {
    await connectDB();

    const sale = await FlashSale.findOne({
      status: 'active',
      endTime: {
        $gt: new Date(),
      },
    }).populate({
      path: 'products',
      model: Product,
    });

    if (!sale) {
      return NextResponse.json({
        success: true,
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      data: sale,
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
