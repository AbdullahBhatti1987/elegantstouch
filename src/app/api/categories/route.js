import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';

// GET ALL + SEARCH CATEGORIES
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search') || '';

    let query = {};

    if (search) {
      query = {
        name: {
          $regex: search,
          $options: 'i',
        },
      };
    }

    const categories = await Category.find(query).sort({
      sortOrder: 1,
    });

    return Response.json({
      success: true,
      data: categories,
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

    const category = await Category.create(body);

    return Response.json(
      {
        success: true,
        data: category,
      },
      {
        status: 201,
      },
    );
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
