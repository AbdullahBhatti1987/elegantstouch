import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({
      status: 'active',
      images: { $exists: true, $ne: [] },
    })
      .select('images thumbnail')
      .limit(20)
      .lean();

    const sliderImages = products.map((product) => ({
      id: product._id,
      image:
        product.thumbnail ||
        product.images?.[0]?.url ||
        '/images/placeholder.png',
    }));

    return NextResponse.json({
      success: true,
      data: sliderImages,
    });
  } catch (error) {
    console.log('Slider Images Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch slider images',
      },
      {
        status: 500,
      },
    );
  }
}
