import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

// GET ALL COUPONS
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search') || '';

    const page = Number(searchParams.get('page')) || 1;

    const limit = Number(searchParams.get('limit')) || 8;

    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.code = {
        $regex: search,
        $options: 'i',
      };
    }

    const totalCoupons = await Coupon.countDocuments(query);

    const coupons = await Coupon.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,

      data: coupons,

      pagination: {
        total: totalCoupons,

        page,

        limit,

        totalPages: Math.ceil(totalCoupons / limit),

        hasNextPage: page < Math.ceil(totalCoupons / limit),

        hasPrevPage: page > 1,
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

// CREATE COUPON (ADMIN)
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const body = Object.fromEntries(formData.entries());

    body.categoryIds = JSON.parse(body.categoryIds || '[]');
    body.productIds = JSON.parse(body.productIds || '[]');

    const coupon = await Coupon.create({
      code: body.code.trim().toUpperCase(),

      discountType: body.discountType,

      value: Number(body.value),

      minOrderAmount: Number(body.minOrderAmount) || 0,

      maxDiscount: body.maxDiscount ? Number(body.maxDiscount) : null,

      usageLimit: body.usageLimit ? Number(body.usageLimit) : null,

      expiryDate: new Date(body.expiryDate),

      applyType: body.applyType,

      categoryIds: body.categoryIds,

      productIds: body.productIds,

      status: body.status || 'active',
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
