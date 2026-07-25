import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import Category from '@/models/Category';

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
        model: 'Product',
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

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { guestId, productId, quantity = 1 } = body;

    const cartQuantity = Number(quantity);

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

    const product = await Product.findById(productId);

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

    if (!product.inStock || product.stock <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product is out of stock',
        },
        {
          status: 400,
        },
      );
    }

    if (product.stock < cartQuantity) {
      return NextResponse.json(
        {
          success: false,
          message: `Only ${product.stock} items available`,
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

    if (!cart) {
      cart = await Cart.create({
        guestId,

        items: [
          {
            productId,
            quantity: cartQuantity,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => String(item.productId) === String(productId),
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + cartQuantity;

        if (product.stock < newQuantity) {
          return NextResponse.json(
            {
              success: false,
              message: `Only ${product.stock} items available`,
            },
            {
              status: 400,
            },
          );
        }

        existingItem.quantity = newQuantity;

        await cart.save();

        return NextResponse.json({
          success: true,
          message: 'Cart quantity updated',
          data: cart,
        });
      }

      cart.items.push({
        productId,
        quantity: cartQuantity,
      });

      await cart.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Product added to cart successfully',
      data: cart,
    });
  } catch (error) {
    console.log('ADD CART ERROR:', error);

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

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const { guestId, productId, quantity = 1 } = body;

//     const cartQuantity = Number(quantity);

//     if (!guestId || !productId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'GuestId and ProductId are required',
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Product not found',
//         },
//         {
//           status: 404,
//         },
//       );
//     }

//     if (product.stock < cartQuantity) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Not enough stock available',
//         },
//         {
//           status: 400,
//         },
//       );
//     }
//     if (!product.inStock) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Product is out of stock',
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     let cart = await Cart.findOne({
//       guestId,
//       status: 'active',
//     });

//     if (!cart) {
//       cart = await Cart.create({
//         guestId,
//         items: [
//           {
//             productId,
//             cartQuantity,
//           },
//         ],
//       });
//     } else {
//       const existingItem = cart.items.find(
//         (item) => String(item.productId) === String(productId),
//       );

//       if (existingItem) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: 'Product already exists in cart',
//             data: cart,
//           },
//           {
//             status: 409,
//           },
//         );
//       }

//       cart.items.push({
//         productId,
//         cartQuantity,
//       });

//       await cart.save();
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Product added to cart successfully',
//       data: cart,
//     });
//   } catch (error) {
//     console.log('ADD CART ERROR:', error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message,
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }
