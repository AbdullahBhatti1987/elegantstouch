import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { singleFileToCloudinary } from '@/lib/singleFileToCloudinary';
import { deleteFromCloudinary } from '@/lib/deleteFromCloudinary';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return NextResponse.json(
        {
          success: false,
          message: 'Banner not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.log('GET SINGLE BANNER ERROR:', error);

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

export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const formData = await req.formData();

    const oldBanner = await Banner.findById(id);

    if (!oldBanner) {
      return NextResponse.json(
        {
          success: false,
          message: 'Banner not found',
        },
        {
          status: 404,
        },
      );
    }

    let image = oldBanner.image;

    const imageFile = formData.get('image');

    // New image upload

    if (imageFile && typeof imageFile !== 'string') {
      const uploadedImage = await singleFileToCloudinary(
        imageFile,
        'elegantstouch/banner',
      );

      // delete old image

      if (oldBanner.image?.public_id) {
        await deleteFromCloudinary(oldBanner.image.public_id);
      }

      image = {
        url: uploadedImage.url,

        thumbnail: uploadedImage.thumbnail,

        public_id: uploadedImage.public_id,
      };
    } else {
      // only alt update

      image = {
        ...oldBanner.image,
      };
    }

  
    const updateData = {
      subtitle: formData.get('subtitle'),

      title: formData.get('title'),

      description: formData.get('description'),

      alt: formData.get('alt'),

      primaryBtnText: formData.get('primaryBtnText'),

      primaryBtnLink: formData.get('primaryBtnLink'),

      secondaryBtnText: formData.get('secondaryBtnText'),

      secondaryBtnLink: formData.get('secondaryBtnLink'),

      status: formData.get('status'),

      order: Number(formData.get('order')) || 0,

      image,
    };


    //   console.log('ALT FROM FORM DATA ==> ', formData.get('alt'));

    // console.log('UPDATE DATA ==> ', updateData);

    
    const banner = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({
      success: true,

      message: 'Banner updated successfully',

      data: banner,
    });
  } catch (error) {
    console.log('BANNER UPDATE ERROR:', error);

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

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    await Banner.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Banner deleted',
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
