import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';
import cloudinary from '@/lib/cloudinary';
import { singleFileToCloudinary } from '@/lib/singleFileToCloudinary';
import { deleteFromCloudinary } from '@/lib/deleteFromCloudinary';

export async function GET(req, { params }) {
  try {
    await connectDB();

    // const { id } = await params;
    const { id } = params;

    console.log('Category ID:', id);

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: 'Category not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

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

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    // const { id } = await params;
    const { id } = params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: 'Category not found',
        },
        {
          status: 404,
        },
      );
    }

    // console.log('CATEGORY IMAGE:', category.image);

    if (category.image?.public_id) {
      const result = await cloudinary.uploader.destroy(
        category.image.public_id,
      );

      // console.log('Cloudinary Delete Result:', result);
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: 'Category deleted successfully',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log('DELETE CATEGORY ERROR:', error);

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

    // const { id } = await context.params;
    const { id } = context.params;

    const formData = await req.formData();

    const imageFile = formData.get('image');

    const oldCategory = await Category.findById(id);

    if (!oldCategory) {
      return NextResponse.json(
        {
          success: false,
          message: 'Category not found',
        },
        {
          status: 404,
        },
      );
    }

    let image = oldCategory.image;

    // Agar new image upload hui hai
    if (imageFile && typeof imageFile !== 'string') {
      // New image Cloudinary upload
      const uploadedImage = await singleFileToCloudinary(
        imageFile,
        'categories',
      );

      // Old image delete
      if (oldCategory.image?.public_id) {
        await deleteFromCloudinary(oldCategory.image.public_id);
      }

      image = uploadedImage;
    }

    const keywords = formData.get('keywords');

    const updateData = {
      name: formData.get('name'),

      slug: formData.get('slug'),

      alt: formData.get('alt'),

      description: formData.get('description'),

      keywords: keywords
        ? keywords
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
        : [],

      status: formData.get('status'),

      featured: formData.get('featured') === 'true',

      sortOrder: Number(formData.get('sortOrder')) || 0,

      seoTitle: formData.get('seoTitle'),

      seoDescription: formData.get('seoDescription'),

      image,
    };

    const category = await Category.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      },
    );

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log('CATEGORY UPDATE ERROR:', error);

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
