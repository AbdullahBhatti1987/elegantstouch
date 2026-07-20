import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';
import { singleFileToCloudinary } from '@/lib/singleFileToCloudinary';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 12;
    const skip = (page - 1) * limit;
    let query = {};

    if (search) {
      query = {
        $or: [
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
        ],
      };
    }

    const totalCategories = await Category.countDocuments(query);

    const categories = await Category.find(query)
      .sort({
        sortOrder: 1,
      })
      .skip(skip)
      .limit(limit);

    return Response.json({
      success: true,
      data: categories,
      pagination: {
        total: totalCategories,
        page,
        limit,
        totalPages: Math.ceil(totalCategories / limit),
        hasNextPage: page < Math.ceil(totalCategories / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return Response.json(
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

// CREATE CATEGORY

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const imageFile = formData.get('image');
    let image = null;

    // Image upload to Cloudinary
    if (imageFile && typeof imageFile !== 'string') {
      image = await singleFileToCloudinary(imageFile, 'categories');
    }

    const keywords = formData.get('keywords');

    const category = await Category.create({
      name: formData.get('name'),
      slug: formData.get('slug'),
      alt: formData.get('alt'),
      description: formData.get('description'),
      keywords: keywords
        ? keywords
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
        : [],

      status: formData.get('status'),
      featured: formData.get('featured') === 'true',
      sortOrder: Number(formData.get('sortOrder')) || 0,
      seoTitle: formData.get('seoTitle'),
      seoDescription: formData.get('seoDescription'),
      image,
    });


    return NextResponse.json(
      {
        success: true,
        category,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log('CATEGORY CREATE ERROR:', error);

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
