import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';

// GET SINGLE CART
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const cart = await Cart.findById(id).populate({
      path: 'items.productId',
      select: `
          name
          sku
          images
          price
          salePrice
          categoryId
          brand
          stock
        `,
    });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: 'Cart not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: cart,
      },
      {
        status: 200,
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

// UPDATE CART
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const cart = await Cart.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate({
      path: 'items.productId',
      select: `
        name
        sku
        images
        price
        salePrice
        categoryId
        brand
        stock
      `,
    });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: 'Cart not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Cart updated successfully',
        data: cart,
      },
      {
        status: 200,
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

// DELETE CART
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const cart = await Cart.findByIdAndDelete(id);

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: 'Cart not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Cart deleted successfully',
      },
      {
        status: 200,
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
