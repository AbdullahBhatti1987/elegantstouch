import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';

export async function GET(req) {
  try {
    await connectDB();

    // Filhal dummy guestId
    // Baad me auth/session se ayega
    const guestId = 'USER_ID_HERE';

    const wishlist = await Wishlist.findOne({
      guestId,
    });

    const count = wishlist?.items?.length || 0;

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
