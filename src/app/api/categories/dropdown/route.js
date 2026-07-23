import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find(
      {
        status: 'active',
      },
      '_id name',
    ).sort({
      sortOrder: 1,
    });

    return NextResponse.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.log('CATEGORY DROPDOWN ERROR:', error);

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
