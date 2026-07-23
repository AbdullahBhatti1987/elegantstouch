// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongodb';
// import Coupon from '@/models/Coupon';

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { code, subtotal } = await req.json();

//     if (!code || !subtotal) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Coupon code and subtotal required',
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     const coupon = await Coupon.findOne({
//       code: code.toUpperCase(),
//     });

//     if (!coupon) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Invalid coupon',
//         },
//         {
//           status: 404,
//         },
//       );
//     }

//     // status check

//     if (coupon.status !== 'active') {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Coupon is inactive',
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     // expiry check

//     if (new Date() > coupon.expiryDate) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Coupon expired',
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     // minimum order check

//     if (subtotal < coupon.minOrderAmount) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: `Minimum order Rs ${coupon.minOrderAmount} required`,
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     let discount = 0;

//     // Percentage discount

//     if (coupon.discountType === 'percentage') {
//       discount = (subtotal * coupon.value) / 100;

//       // maximum discount limit

//       if (coupon.maxDiscount && discount > coupon.maxDiscount) {
//         discount = coupon.maxDiscount;
//       }
//     }

//     // Fixed discount

//     if (coupon.discountType === 'fixed') {
//       discount = coupon.value;
//     }

//     return NextResponse.json({
//       success: true,

//       message: 'Coupon applied successfully',

//       data: {
//         code: coupon.code,

//         discountType: coupon.discountType,

//         discount,
//       },
//     });
//   } catch (error) {
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
import Coupon from '@/models/Coupon';

export async function POST(req) {
  try {
    await connectDB();

    const { code, subtotal } = await req.json();

    if (!code || !subtotal) {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon code and subtotal required',
        },
        {
          status: 400,
        },
      );
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    });

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid coupon code',
        },
        {
          status: 404,
        },
      );
    }

    // Status check

    if (coupon.status !== 'active') {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon is inactive',
        },
        {
          status: 400,
        },
      );
    }

    // Expiry check

    if (new Date() > new Date(coupon.expiryDate)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon expired',
        },
        {
          status: 400,
        },
      );
    }

    // Usage limit check

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json(
        {
          success: false,
          message: 'Coupon usage limit reached',
        },
        {
          status: 400,
        },
      );
    }

    // Minimum order amount

    if (Number(subtotal) < Number(coupon.minOrderAmount)) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum order Rs ${coupon.minOrderAmount} required`,
        },
        {
          status: 400,
        },
      );
    }

    let discount = 0;

    // Percentage

    if (coupon.discountType === 'percentage') {
      discount = (Number(subtotal) * Number(coupon.value)) / 100;

      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }

    // Fixed amount

    if (coupon.discountType === 'fixed') {
      discount = Number(coupon.value);
    }

    return NextResponse.json({
      success: true,

      message: 'Coupon applied successfully',

      data: {
        code: coupon.code,

        discountType: coupon.discountType,

        discount,

        finalAmount: Number(subtotal) - discount,
      },
    });
  } catch (error) {
    console.log('COUPON APPLY ERROR:', error);

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
