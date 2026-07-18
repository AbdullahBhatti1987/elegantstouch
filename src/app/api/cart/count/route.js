import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function GET(req) {
  try {
    await connectDB();

    // Filhal dummy userId
    // Baad me auth/session se ayega
    const userId = 'USER_ID_HERE';

    const cart = await Cart.findOne({
      userId,
    });

    const count = cart?.products?.length || 0;

    return NextResponse.json({
      success: true,
      count,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        count: 0,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
