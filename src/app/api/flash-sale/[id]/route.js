import { NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongodb';

import FlashSale from '@/models/FlashSale';

export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = await params;

    const sale = await FlashSale.findById(id).populate(
      'products',
      'name price salePrice images',
    );

    if (!sale) {
      return NextResponse.json(
        {
          success: false,
          message: 'Flash Sale not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,

      data: sale,
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
export async function PUT(req, { params }) {
  await connectDB();

  try {
    const { id } = await params;

    const body = await req.json();

    const sale = await FlashSale.findByIdAndUpdate(
      id,
      {
        title: body.title,
        description: body.description,
        products: body.products,
        startTime: body.startTime,
        endTime: body.endTime,
        status: body.status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!sale) {
      return NextResponse.json(
        {
          success: false,
          message: 'Flash Sale not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Flash Sale updated successfully',
      data: sale,
    });
  } catch (error) {
    console.log('UPDATE FLASH SALE ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to update flash sale',
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req, { params }) {
  await connectDB();

  await FlashSale.findByIdAndDelete(params.id);

  return NextResponse.json({
    success: true,
  });
}
