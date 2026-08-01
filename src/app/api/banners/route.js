import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { singleFileToCloudinary } from '@/lib/singleFileToCloudinary';
// import { bannerFileToCloudinary } from '@/lib/bannerFileToCloudinary';

export async function GET() {
  try {
    await connectDB();

    const banners = await Banner.find({
      status: 'active',
    }).sort({ order: 1 });

    return NextResponse.json({
      success: true,
      banners,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const imageFile = formData.get('image');

    let image = null;

    if (imageFile && imageFile.size > 0) {
      image = await singleFileToCloudinary(
        // image = await bannerFileToCloudinary(
        imageFile,
        'elegantstouch/banner',
      );
    }

    const banner = await Banner.create({
      subtitle: formData.get('subtitle'),

      title: formData.get('title'),

      description: formData.get('description'),

      image,

      alt: formData.get('alt'),

      primaryBtnText: formData.get('primaryBtnText'),

      primaryBtnLink: formData.get('primaryBtnLink'),

      secondaryBtnText: formData.get('secondaryBtnText'),

      secondaryBtnLink: formData.get('secondaryBtnLink'),

      status: formData.get('status'),

      order: Number(formData.get('order')) || 0,
    });

    return NextResponse.json({
      success: true,

      banner,
    });
  } catch (error) {
    console.log('BANNER CREATE ERROR:', error);

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
