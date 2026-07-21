import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

// GET SINGLE PRODUCT BY SLUG

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const product = await Product.findOne({
      slug: slug,
    })
      .populate('categoryId')
      .lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
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
