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
        { status: 404 },
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
      { status: 500 },
    );
  }
}

// UPDATE COMPLETE ORDER
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const order = await Order.findByIdAndUpdate(id, body, {
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

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      data: order,
    });
  } catch (error) {
    console.log('PUT ORDER ERROR ==> ', error);

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

// PATCH ORDER
// Update order status, payment status, single item status
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const {
      orderStatus,
      paymentStatus,
      itemId,
      itemStatus,
      returnReason,
    } = body;

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

    /*
      UPDATE SINGLE PRODUCT STATUS
    */

    if (itemId && itemStatus) {
      const allowedItemStatus = [
        'pending',
        'confirmed',
        'shipped',
        'delivered',
        'cancelled',
        'returned',
      ];

      if (!allowedItemStatus.includes(itemStatus)) {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid item status',
          },
          {
            status: 400,
          },
        );
      }

      const item = order.items.id(itemId);

      if (!item) {
        return NextResponse.json(
          {
            success: false,
            message: 'Product not found in order',
          },
          {
            status: 404,
          },
        );
      }

      item.itemStatus = itemStatus;

      if (returnReason) {
        item.returnReason = returnReason;
      }

      // Automatically refund if returned

      if (itemStatus === 'returned') {
        order.paymentStatus = 'refunded';
      }
    }

    /*
      UPDATE ORDER STATUS
    */

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
          },
        );
      }

      order.orderStatus = orderStatus;
    }

    /*
      UPDATE PAYMENT STATUS
    */

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
          },
        );
      }

      order.paymentStatus = paymentStatus;
    }

    /*
      RECALCULATE TOTAL
      Remove cancelled & returned products
    */

    const activeItems = order.items.filter(
      (item) =>
        item.itemStatus !== 'cancelled' &&
        item.itemStatus !== 'returned',
    );

    const newSubtotal = activeItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    order.subtotal = newSubtotal;

    order.total =
      newSubtotal + (order.shipping || 0) - (order.discount || 0);

    await order.save();

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      data: order,
    });
  } catch (error) {
    console.log('PATCH ORDER ERROR ==> ', error);

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

    const { id } = await params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 },
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
      { status: 500 },
    );
  }
}
