import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

export async function POST(req) {
  try {
    await connectDB();

    const { code, subtotal } = await req.json();

    if (!code || !subtotal) {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon code and subtotal required',
        },
        {
          status: 400,
        },
      );
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
    });

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid coupon',
        },
        {
          status: 404,
        },
      );
    }

    // status check

    if (coupon.status !== 'active') {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon is inactive',
        },
        {
          status: 400,
        },
      );
    }

    // expiry check

    if (new Date() > coupon.expiryDate) {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon expired',
        },
        {
          status: 400,
        },
      );
    }

    // minimum order check

    if (subtotal < coupon.minOrderAmount) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum order Rs ${coupon.minOrderAmount} required`,
        },
        {
          status: 400,
        },
      );
    }

    let discount = 0;

    // Percentage discount

    if (coupon.discountType === 'percentage') {
      discount = (subtotal * coupon.value) / 100;

      // maximum discount limit

      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }

    // Fixed discount

    if (coupon.discountType === 'fixed') {
      discount = coupon.value;
    }

    return NextResponse.json({
      success: true,

      message: 'Coupon applied successfully',

      data: {
        code: coupon.code,

        discountType: coupon.discountType,

        discount,
      },
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
