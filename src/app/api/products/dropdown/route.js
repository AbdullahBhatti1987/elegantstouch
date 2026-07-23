import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get('categoryId');

    let query = {
      status: 'active',
    };

    // Agar category select hai to sirf us category ke products
    if (categoryId) {
      query.categoryId = categoryId;
    }

    const products = await Product.find(query, '_id name').sort({
      name: 1,
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log('PRODUCT DROPDOWN ERROR:', error);

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
