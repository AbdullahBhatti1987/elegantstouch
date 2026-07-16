import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search') || '';

    const page = Number(searchParams.get('page')) || 1;

    const limit = Number(searchParams.get('limit')) || 4;

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

    const body = await request.json();

  
    console.log('Cloudinary Image==>', body);

    const category = await Category.create({
      ...body,
      image: body.image,
    });

    return Response.json({
      success: true,
      category,
      
      status: 201,
    });
  } catch (error) {
    console.log('CATEGORY CREATE ERROR:', error);

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
