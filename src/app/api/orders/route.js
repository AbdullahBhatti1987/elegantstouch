import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import { generateOrderNumber } from '@/lib/generateOrderNumber';

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        orders,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('GET ORDERS ERROR:', error);

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

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      guestId,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      discount,
      total,
      coupon,
      saveInfo,
    } = body;

    // Validation

    if (!guestId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Guest ID required',
        },
        {
          status: 400,
        },
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Cart is empty',
        },
        {
          status: 400,
        },
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        {
          success: false,
          message: 'Shipping address required',
        },
        {
          status: 400,
        },
      );
    }

    console.log('ORDER SHIPPING ADDRESS:', shippingAddress);

    const orderItems = items.map((item) => ({
      productId: item.productId._id || item.productId,

      name: item.productId.name,

      image: item.productId.images?.[0]?.thumbnail || '',

      price: item.productId.salePrice || item.productId.price,

      quantity: item.quantity,
    }));

    const {
      firstName,
      lastName,
      email,
      mobile,
      address,
      landmark,
      city,
      province,
      postalCode,
    } = shippingAddress;

    console.log('ORDER OBJECT:', {
      firstName,
      lastName,
      email,
      mobile,
      address,
      landmark,
      city,
      province,
      postalCode,
    });

    const totalOrders = await Order.countDocuments();
    const orderNumber = generateOrderNumber(totalOrders + 1);

    const order = await Order.create({
      orderNumber,
      guestId,
      items: orderItems,
      shippingAddress: {
        firstName: firstName,
        lastName: lastName,
        email: email || '',
        mobile: mobile,
        address: address,
        landmark: landmark,
        city: city,
        province: province,
        postalCode: postalCode || '',
      },
      paymentMethod,
      subtotal,
      shipping,
      discount: discount || 0,
      coupon: coupon || null,
      total,
      saveInfo: saveInfo || false,
    });

    // Convert Cart

    await Cart.findOneAndUpdate(
      {
        guestId,
      },
      {
        status: 'converted',
      },
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        data: order,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error('ORDER CREATE ERROR:', error);

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
