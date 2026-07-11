import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

// GET SINGLE PRODUCT

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id).populate('categoryId');

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

// UPDATE PRODUCT

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const product = await Product.findByIdAndUpdate(
      id,

      {
        ...body,

        price: Number(body.price),

        salePrice: body.salePrice ? Number(body.salePrice) : null,

        stock: Number(body.stock),

        tags: body.tags
          ? body.tags.split(',').map((i) => i.trim())
          : [],

        keywords: body.keywords
          ? body.keywords.split(',').map((i) => i.trim())
          : [],
      },

      {
        new: true,
      },
    );

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

      message: 'Product updated successfully',
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

// DELETE PRODUCT

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);

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

      message: 'Product deleted successfully',
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
