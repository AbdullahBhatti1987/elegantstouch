import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';

// ================= GET WISHLIST BY GUEST ID =================

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { guestId } = await params;

    const wishlist = await Wishlist.findOne({
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

    if (!wishlist) {
      return NextResponse.json({
        success: true,
        data: {
          guestId,
          items: [],
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    console.log('GET WISHLIST ERROR:', error);

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

// ================= UPDATE WISHLIST =================

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { guestId } = await params;

    const body = await req.json();

    const wishlist = await Wishlist.findOneAndUpdate(
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

    if (!wishlist) {
      return NextResponse.json(
        {
          success: false,
          message: 'Wishlist not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,

      message: 'Wishlist updated successfully',

      data: wishlist,
    });
  } catch (error) {
    console.log('UPDATE WISHLIST ERROR:', error);

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

// ================= DELETE WISHLIST =================

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { guestId } = await params;

    const wishlist = await Wishlist.findOneAndDelete({
      guestId,
    });

    if (!wishlist) {
      return NextResponse.json(
        {
          success: false,
          message: 'Wishlist not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,

      message: 'Wishlist deleted successfully',
    });
  } catch (error) {
    console.log('DELETE WISHLIST ERROR:', error);

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
