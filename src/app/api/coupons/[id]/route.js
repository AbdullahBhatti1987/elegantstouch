import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

import { connectDB } from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

import '@/models/Category';
import '@/models/Product';

// GET SINGLE COUPON

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid coupon id',
        },
        {
          status: 400,
        },
      );
    }

    const coupon = await Coupon.findById(id)
      .populate({
        path: 'categoryIds',
        select: 'name image slug',
      })
      .populate({
        path: 'productIds',
        select: 'name price images slug',
      });

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: coupon,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('GET COUPON ERROR:', error);

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

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid coupon id',
        },
        {
          status: 400,
        },
      );
    }

    const existingCoupon = await Coupon.findById(id);

    if (!existingCoupon) {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon not found',
        },
        {
          status: 404,
        },
      );
    }

    const formData = await req.formData();

    const body = Object.fromEntries(formData.entries());

    const updateData = {
      code: body.code
        ? body.code.trim().toUpperCase()
        : existingCoupon.code,

      discountType: body.discountType || existingCoupon.discountType,

      value: body.value ? Number(body.value) : existingCoupon.value,

      minOrderAmount: body.minOrderAmount
        ? Number(body.minOrderAmount)
        : 0,

      maxDiscount: body.maxDiscount ? Number(body.maxDiscount) : null,

      usageLimit: body.usageLimit ? Number(body.usageLimit) : null,

      expiryDate: body.expiryDate
        ? new Date(body.expiryDate)
        : existingCoupon.expiryDate,

      applyType: body.applyType || existingCoupon.applyType,

      categoryIds: body.categoryIds
        ? JSON.parse(body.categoryIds)
        : [],

      productIds: body.productIds ? JSON.parse(body.productIds) : [],

      status: body.status || existingCoupon.status,
    };

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,

      updateData,

      {
        new: true,
        runValidators: true,
      },
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Coupon updated successfully',
        data: updatedCoupon,
      },

      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('UPDATE COUPON ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to update coupon',
      },

      {
        status: 500,
      },
    );
  }
}

// DELETE COUPON

export async function DELETE(_req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid coupon id',
        },
        {
          status: 400,
        },
      );
    }

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon not found',
        },
        {
          status: 404,
        },
      );
    }

    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon deletion failed',
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Coupon deleted successfully',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('DELETE COUPON ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to delete coupon',
      },
      {
        status: 500,
      },
    );
  }
}
