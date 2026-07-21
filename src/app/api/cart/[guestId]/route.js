import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';

// ================= GET CART BY GUEST ID =================

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { guestId } = await params;

    const cart = await Cart.findOne({
      guestId,
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

    return NextResponse.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log('GET CART ERROR:', error);

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

// ================= UPDATE CART =================

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { guestId } = await params;

    const body = await req.json();

    const cart = await Cart.findOneAndUpdate(
      {
        guestId,
      },
      body,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    ).populate({
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

    return NextResponse.json({
      success: true,

      message: 'Cart updated successfully',

      data: cart,
    });
  } catch (error) {
    console.log('UPDATE CART ERROR:', error);

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

// ================= DELETE CART =================

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { guestId } = await params;

    const cart = await Cart.findOneAndDelete({
      guestId,
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

    return NextResponse.json({
      success: true,

      message: 'Cart deleted successfully',
    });
  } catch (error) {
    console.log('DELETE CART ERROR:', error);

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
