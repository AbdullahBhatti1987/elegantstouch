// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongodb';
// import Product from '@/models/Product';

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const product = await Product.create({
//       ...body,

//       price: Number(body.price),

//       salePrice: body.salePrice ? Number(body.salePrice) : null,

//       stock: Number(body.stock),

//       features: body.features || "",

//       tags: body.tags
//         ? body.tags.split(',').map((i) => i.trim())
//         : [],

//       keywords: body.keywords
//         ? body.keywords.split(',').map((i) => i.trim())
//         : [],
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         data: product,
//         message: 'Product created successfully',
//       },
//       {
//         status: 201,
//       },
//     );
//   } catch (error) {
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

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

// GET ALL PRODUCTS

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .populate('categoryId')
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,

      data: products,
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

// POST PRODUCT

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Category is required',
        },
        {
          status: 400,
        },
      );
    }

    const product = await Product.create({
      ...body,

      price: Number(body.price),

      salePrice: body.salePrice ? Number(body.salePrice) : null,

      stock: Number(body.stock),

      features: body.features || '',

      tags: Array.isArray(body.tags)
        ? body.tags
        : body.tags
          ? body.tags.split(',').map((i) => i.trim())
          : [],

      keywords: Array.isArray(body.keywords)
        ? body.keywords
        : body.keywords
          ? body.keywords.split(',').map((i) => i.trim())
          : [],
    });

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: 'Product created successfully',
      },

      {
        status: 201,
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
