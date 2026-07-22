import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';

// GET ALL WISHLISTS
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search') || '';
    const guestId = searchParams.get('guestId') || '';

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 12;

    const skip = (page - 1) * limit;

    let query = {};

    // GuestId Filter
    if (guestId) {
      query.guestId = guestId;
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

    const totalWishlists = await Wishlist.countDocuments(query);

    const wishlists = await Wishlist.find(query)
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

      data: wishlists,

      pagination: {
        total: totalWishlists,

        page,

        limit,

        totalPages: Math.ceil(totalWishlists / limit),

        hasNextPage: page < Math.ceil(totalWishlists / limit),

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

// ADD TO WISHLIST
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { guestId, productId } = body;

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

    let wishlist = await Wishlist.findOne({
      guestId,
    });

    // Create New Wishlist
    if (!wishlist) {
      wishlist = await Wishlist.create({
        guestId,

        items: [
          {
            productId,
          },
        ],
      });
    } else {
      const existingItem = wishlist.items.find(
        (item) => item.productId.toString() === productId,
      );

      // Already Exists
      if (existingItem) {
        return NextResponse.json(
          {
            success: false,

            message: 'Product already exists in wishlist',

            data: wishlist,
          },
          {
            status: 409,
          },
        );
      }

      // Add Product
      wishlist.items.push({
        productId,
      });

      await wishlist.save();
    }

    return NextResponse.json({
      success: true,

      message: 'Product added to wishlist successfully',

      data: wishlist,
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
