import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

// GET ALL COUPONS
export async function GET() {
  try {
    await connectDB();

    const coupons = await Coupon.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: coupons,
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

// CREATE COUPON (ADMIN)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const coupon = await Coupon.create({
      code: body.code,

      discountType: body.discountType,

      value: Number(body.value),

      minOrderAmount: Number(body.minOrderAmount) || 0,

      maxDiscount: body.maxDiscount ? Number(body.maxDiscount) : null,

      usageLimit: body.usageLimit ? Number(body.usageLimit) : null,

      expiryDate: new Date(body.expiryDate),

      status: 'active',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Coupon created successfully',
        data: coupon,
      },
      {
        status: 201,
      },
    );
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
