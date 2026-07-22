import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';

// GET ALL CARTS
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const guestId = searchParams.get('guestId') || '';
    const status = searchParams.get('status') || '';
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 12;
    const skip = (page - 1) * limit;

    let query = {};

    // Guest ID filter
    if (guestId) {
      query.guestId = guestId;
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    // Search
    if (search) {
      query.$or = [
        {
          guestId: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    const totalCarts = await Cart.countDocuments(query);

    const carts = await Cart.find(query)
      .populate({
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
      })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,

      data: carts,

      pagination: {
        total: totalCarts,

        page,

        limit,

        totalPages: Math.ceil(totalCarts / limit),

        hasNextPage: page < Math.ceil(totalCarts / limit),

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

// CREATE / ADD CART
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { guestId, productId, quantity = 1 } = body;

    if (!guestId || !productId) {
      return NextResponse.json(
        {
          success: false,
          message: 'GuestId and ProductId are required',
        },
        {
          status: 400,
        },
      );
    }

    let cart = await Cart.findOne({
      guestId,
      status: 'active',
    });

    // Create new cart
    if (!cart) {
      cart = await Cart.create({
        guestId,

        items: [
          {
            productId,
            quantity,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId,
      );

      // Already exists
      if (existingItem) {
        return NextResponse.json(
          {
            success: false,

            message: 'Product already exists in cart',

            data: cart,
          },
          {
            status: 409,
          },
        );
      }

      // Add new product

      cart.items.push({
        productId,

        quantity,
      });

      await cart.save();
    }

    return NextResponse.json({
      success: true,

      message: 'Product added to cart successfully',

      data: cart,
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
