import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import Cart from '@/models/Cart';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const order = await Order.create({
      guestId: body.guestId,

      items: body.items,

      shippingAddress: body.shippingAddress,

      paymentMethod: body.paymentMethod,

      subtotal: body.subtotal,

      shipping: body.shipping,

      discount: body.discount || 0,

      total: body.total,

      coupon: body.coupon,
    });

    // cart convert

    await Cart.findOneAndUpdate(
      {
        guestId: body.guestId,
      },

      {
        status: 'converted',
      },
    );

    return NextResponse.json({
      success: true,

      message: 'Order created',

      data: order,
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
