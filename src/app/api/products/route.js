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
import Category from '@/models/Category';

// GET ALL PRODUCTS

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const categorySlug = searchParams.get('category');

    let query = {};

    if (categorySlug) {
      const category = await Category.findOne({
        slug: categorySlug,
      });

      if (!category) {
        return NextResponse.json(
          {
            success: false,
            message: 'Category not found',
          },
          {
            status: 404,
          },
        );
      }

      query.categoryId = category._id;
    }

    const products = await Product.find(query)
      .populate('categoryId')
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('PRODUCT API ERROR:', error);

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
