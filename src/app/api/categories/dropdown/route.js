// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongodb';
// import Category from '@/models/Category';

// export async function GET() {
//   try {
//     await connectDB();

//     const categories = await Category.find(
//       {
//         status: 'active',
//       },
//       '_id name',
//     ).sort({
//       sortOrder: 1,
//     });

//     return NextResponse.json({
//       success: true,
//       count: categories.length,
//       data: categories,
//     });
//   } catch (error) {
//     console.log('CATEGORY DROPDOWN ERROR:', error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message,
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }

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
      '_id name image.thumbnail',
    ).sort({
      sortOrder: 1,
    });

    const formattedCategories = categories.map((category) => ({
      _id: category._id,
      name: category.name,
      image: category.image?.thumbnail || '',
    }));

    return NextResponse.json({
      success: true,
      count: formattedCategories.length,
      data: formattedCategories,
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
