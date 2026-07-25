import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const guestId = searchParams.get('guestId');

    if (!guestId) {
      return NextResponse.json(
        {
          success: false,
          count: 0,
          message: 'Guest ID is required',
        },
        { status: 400 },
      );
    }

    const cart = await Cart.findOne({
      guestId,
      status: 'active',
    });

    const count =
      cart?.items?.reduce(
        (total, item) => total + item.quantity,
        0,
      ) || 0;

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
