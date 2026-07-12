import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();

    const files = formData.getAll('files');

    const folder = formData.get('folder');

    if (!files.length) {
      return NextResponse.json(
        {
          success: false,
          message: 'No files found',
        },
        {
          status: 400,
        },
      );
    }

    const urls = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file, folder);

      urls.push(url);
    }

    return NextResponse.json({
      success: true,

      images: urls,
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
