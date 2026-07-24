import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';

// GET SINGLE ORDER
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// UPDATE ORDER
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const order = await Order.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      data: order,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE ORDER
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}


// PATCH ORDER
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const {
      orderStatus,
      paymentStatus,
    } = body;


    const updateData = {};


    // Order Status Validation
    if (orderStatus) {
      const allowedOrderStatus = [
        'pending',
        'confirmed',
        'shipped',
        'delivered',
        'cancelled',
        'returned',
      ];

      if (!allowedOrderStatus.includes(orderStatus)) {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid order status',
          },
          {
            status: 400,
          }
        );
      }

      updateData.orderStatus = orderStatus;
    }


    // Payment Status Validation
    if (paymentStatus) {
      const allowedPaymentStatus = [
        'pending',
        'paid',
        'failed',
        'refunded',
      ];

      if (!allowedPaymentStatus.includes(paymentStatus)) {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid payment status',
          },
          {
            status: 400,
          }
        );
      }

      updateData.paymentStatus = paymentStatus;
    }


    // No Data Received
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No status provided for update',
        },
        {
          status: 400,
        }
      );
    }


    const order = await Order.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        {
          status: 404,
        }
      );
    }


    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully',
      data: order,
    });


  } catch (error) {

    console.log('UPDATE ORDER STATUS ERROR ==> ', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}