import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';

// GET SINGLE ORDER
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        order,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('GET ORDER ERROR:', error);

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

// UPDATE COMPLETE ORDER
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const body = await req.json();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedOrder) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order updated successfully',
        order: updatedOrder,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('UPDATE ORDER ERROR:', error);

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

// CHANGE STATUS ONLY
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const body = await req.json();

    const { orderStatus, paymentStatus } = body;

    const updateData = {};

    if (orderStatus) {
      updateData.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    const order = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Status updated successfully',
        order,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('STATUS UPDATE ERROR:', error);

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

// DELETE ORDER
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order deleted successfully',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('DELETE ORDER ERROR:', error);

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
