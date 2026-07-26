import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';

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
        },
        { status: 400 },
      );
    }

    const wishlist = await Wishlist.findOne({ guestId });

    return NextResponse.json({
      success: true,
      count: wishlist?.items?.length || 0,
    });
  } catch (error) {
    console.log('WISHLIST COUNT ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        count: 0,
      },
      { status: 500 },
    );
  }
}
