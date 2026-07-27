// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongodb';
// import Category from '@/models/Category';
// import Product from '@/models/Product';
// import Cart from '@/models/Cart';
// import Order from '@/models/Order';

// export async function GET() {
//   try {
//     await connectDB();

//     const [categories, products, carts, categoryWiseProducts] =
//       await Promise.all([
//         Category.countDocuments(),

//         Product.countDocuments(),

//         Cart.countDocuments(),

//         Order.countDocuments(),

//         Product.aggregate([
//           {
//             $group: {
//               _id: '$categoryId',
//               productCount: {
//                 $sum: 1,
//               },
//             },
//           },

//           {
//             $lookup: {
//               from: 'categories',
//               localField: '_id',
//               foreignField: '_id',
//               as: 'category',
//             },
//           },

//           {
//             $unwind: '$category',
//           },

//           {
//             $project: {
//               _id: 0,
//               categoryId: '$_id',
//               categoryName: '$category.name',
//               productCount: 1,
//             },
//           },
//         ]),
//       ]);

//     return NextResponse.json({
//       success: true,

//       data: {
//         categories,

//         products,

//         carts,

//         Orders,

//         categoryWiseProducts,
//       },
//     });
//   } catch (error) {
//     console.log('DASHBOARD STATUS ERROR:', error);

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
import Product from '@/models/Product';
import Cart from '@/models/Cart';
import Order from '@/models/Order';
import Banner from '@/models/Banner';
import Wishlist from '@/models/Wishlist';

export async function GET() {
  try {
    await connectDB();

    const [
      categories,
      products,
      carts,
      orders,
      banners,
      wishlists,
      categoryWiseProducts,
    ] = await Promise.all([
      Category.countDocuments(),

      Product.countDocuments(),

      Cart.countDocuments(),

      Order.countDocuments(),

      Banner.countDocuments(),

      Wishlist.countDocuments(),

      Product.aggregate([
        {
          $group: {
            _id: '$categoryId',

            productCount: {
              $sum: 1,
            },
          },
        },

        {
          $lookup: {
            from: 'categories',

            localField: '_id',

            foreignField: '_id',

            as: 'category',
          },
        },

        {
          $unwind: '$category',
        },

        {
          $project: {
            _id: 0,

            categoryId: '$_id',

            categoryName: '$category.name',

            productCount: 1,
          },
        },
      ]),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        categories,

        products,

        carts,

        orders,

        banners,

        wishlists,

        categoryWiseProducts,
      },
    });
  } catch (error) {
    console.log('DASHBOARD STATUS ERROR:', error);

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
