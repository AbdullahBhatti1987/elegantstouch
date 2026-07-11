import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Setting from '@/models/Setting';

// GET SETTINGS
export async function GET() {
  try {
    await connectDB();

    const settings = await Setting.findOne();

    return NextResponse.json({
      success: true,
      data: settings,
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

// CREATE SETTINGS
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const exists = await Setting.findOne();

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: 'Settings already exist',
        },
        { status: 400 },
      );
    }

    const settings = await Setting.create(body);

    return NextResponse.json({
      success: true,
      message: 'Settings created successfully',
      data: settings,
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

// UPDATE SETTINGS
export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();

    const settings = await Setting.findOne();

    if (!settings) {
      return NextResponse.json(
        {
          success: false,
          message: 'Settings not found',
        },
        { status: 404 },
      );
    }

    const updatedSettings = await Setting.findByIdAndUpdate(
      settings._id,
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedSettings,
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
