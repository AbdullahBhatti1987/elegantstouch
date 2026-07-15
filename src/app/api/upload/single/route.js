import { NextResponse } from 'next/server';
import { singleFileToCloudinary } from '@/lib/singleFileToCloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get('file');
    const folder = formData.get('folder');

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: 'No file found',
        },
        {
          status: 400,
        },
      );
    }

    const image = await singleFileToCloudinary(file, folder);

    return NextResponse.json({
      success: true,
      image,
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
