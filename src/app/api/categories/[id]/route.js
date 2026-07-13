import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';

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

    const category = await Category.findByIdAndUpdate(id, body, {
      returnDocument: 'after',
    });

    if (!category) {
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

    return Response.json({
      success: true,
      data: category,
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
