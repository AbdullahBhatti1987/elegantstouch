import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { multipleFilesToCloudinary } from '@/lib/multipleFilesToCloudinary';

// GET ALL PRODUCTS

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || '';
    const categorySlug = searchParams.get('category') || '';

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 8;
    const skip = (page - 1) * limit;

    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');

    const featured = searchParams.get('featured');
    const status = searchParams.get('status');

    const sort = searchParams.get('sort') || 'latest';

    let query = {};

    // Search
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          slug: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          sku: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    // Category Filter
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

    // Price Filter
    if (priceMin || priceMax) {
      query.price = {};

      if (priceMin) {
        query.price.$gte = Number(priceMin);
      }

      if (priceMax) {
        query.price.$lte = Number(priceMax);
      }
    }

    // Featured Filter
    if (featured === 'true') {
      query.featured = true;
    }

    if (featured === 'false') {
      query.featured = false;
    }

    // Status Filter
    if (status) {
      query.status = status;
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case 'price-low-high':
        sortOption = { price: 1 };
        break;

      case 'price-high-low':
        sortOption = { price: -1 };
        break;

      case 'name-a-z':
        sortOption = { name: 1 };
        break;

      case 'name-z-a':
        sortOption = { name: -1 };
        break;

      case 'oldest':
        sortOption = { createdAt: 1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate('categoryId')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,

      data: products,

      pagination: {
        total: totalProducts,
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit),
        hasNextPage: page < Math.ceil(totalProducts / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error(error);

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

    const product = await Product.create({
      ...body,

      price: Number(body.price),

      salePrice: body.salePrice ? Number(body.salePrice) : null,

      stock: Number(body.stock),

      tags: body.tags || [],

      keywords: body.keywords || [],
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully',
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
