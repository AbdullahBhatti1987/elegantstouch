import { NextResponse } from 'next/server';
import { multipleFilesToCloudinary } from '@/lib/multipleFilesToCloudinary';

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

    const images = await multipleFilesToCloudinary(files, folder);

    return NextResponse.json({
      success: true,
      images,
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
