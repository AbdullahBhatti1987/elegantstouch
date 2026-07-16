import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';
import cloudinary from '@/lib/cloudinary';
import { deleteFromCloudinary } from '@/lib/deleteFromCloudinary';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    console.log('Category ID:', id);

    const category = await Category.findById(id);

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

    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

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

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const category = await Category.findById(id);

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

    console.log('CATEGORY IMAGE:', category.image);

    if (category.image?.public_id) {
      const result = await cloudinary.uploader.destroy(
        category.image.public_id,
      );

      console.log('Cloudinary Delete Result:', result);
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: 'Category deleted successfully',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('DELETE CATEGORY ERROR:', error);

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



export async function PUT(req, context) {
  try {
    await connectDB();

    const body = await req.json();

    const { id } = await context.params;

    // Get old category first
    const oldCategory = await Category.findById(id);

    if (!oldCategory) {
      return Response.json(
        {
          success: false,
          message: 'Category not found',
        },
        {
          status: 404,
        },
      );
    }

    // Delete old cloudinary image if replaced
    if (
      body.image?.public_id &&
      body.image.public_id !== oldCategory.image?.public_id
    ) {
      await deleteFromCloudinary(oldCategory.image.public_id);
    }

    // Update category
    const category = await Category.findByIdAndUpdate(id, body, {
      new: true,
    });

    return Response.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);

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
