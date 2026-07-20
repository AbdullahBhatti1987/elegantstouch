// import { NextResponse } from 'next/server';

// import Category from '@/models/Category';
// import Product from '@/models/Product';
// // import User from '@/models/User';
// // import Customer from '@/models/Customer';
// // import Order from '@/models/Order';
// import Cart from '@/models/Cart';

// export async function GET() {
//   try {
//     const [
//       categories,
//       products,
//       users,
//       // customers,
//       // orders,
//       carts,
//     ] = await Promise.all([
//       Category.countDocuments(),

//       Product.countDocuments(),

//       // User.countDocuments(),

//       // Customer.countDocuments(),

//       // Order.countDocuments(),

//       Cart.countDocuments(),
//     ]);

//     return NextResponse.json({
//       success: true,

//       data: {
//         categories,
//         products,
//         users: users || 0,
//         customers: 0,
//         orders: 0,
//         carts: 0,
//       },
//     });
//   } catch (error) {
//     console.log('COUNT API ERROR:', error);

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

export async function GET() {
  try {
    await connectDB();

    const [categories, products, carts, categoryWiseProducts] =
      await Promise.all([
        Category.countDocuments(),

        Product.countDocuments(),

        Cart.countDocuments(),

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
