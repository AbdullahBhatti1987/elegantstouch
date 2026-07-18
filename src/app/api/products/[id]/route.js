// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongodb';
// import Product from '@/models/Product';
// import { cloudinary } from '@/lib/cloudinary';

// // GET SINGLE PRODUCT
// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = await params;

//     const product = await Product.findById(id)
//       .populate('categoryId')
//       .lean();

//     if (!product) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Product not found',
//         },
//         {
//           status: 404,
//         },
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         data: product,
//       },
//       {
//         status: 200,
//       },
//     );
//   } catch (error) {
//     console.log('GET PRODUCT ERROR:', error);

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

// // UPDATE PRODUCT
// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = await params;

//     const body = await req.json();

//     const product = await Product.findByIdAndUpdate(
//       id,
//       {
//         ...body,

//         price: Number(body.price),

//         salePrice: body.salePrice ? Number(body.salePrice) : null,

//         stock: Number(body.stock),

//         tags: Array.isArray(body.tags)
//           ? body.tags
//           : body.tags
//             ? body.tags.split(',').map((item) => item.trim())
//             : [],

//         keywords: Array.isArray(body.keywords)
//           ? body.keywords
//           : body.keywords
//             ? body.keywords.split(',').map((item) => item.trim())
//             : [],
//       },
//       {
//         new: true,
//         runValidators: true,
//       },
//     );

//     if (!product) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Product not found',
//         },
//         {
//           status: 404,
//         },
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         data: product,
//         message: 'Product updated successfully',
//       },
//       {
//         status: 200,
//       },
//     );
//   } catch (error) {
//     console.log('UPDATE PRODUCT ERROR:', error);

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

// // DELETE PRODUCT
// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = await params;

//     const product = await Product.findById(id);

//     if (!product) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Product not found',
//         },
//         {
//           status: 404,
//         },
//       );
//     }

//     // Single Image Delete karne kay liye cloudinary se
//     // if (product.image?.public_id) {
//     //   await cloudinary.uploader.destroy(product.image.public_id);
//     // }

//     // Multiple Images Delete karne kay liye cloudinary se
//     for (const image of product.images) {
//       if (image.public_id) {
//         await cloudinary.uploader.destroy(image.public_id);
//       }
//     }

//     await Product.findByIdAndDelete(id);

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Product deleted successfully',
//       },
//       {
//         status: 200,
//       },
//     );
//   } catch (error) {
//     console.log('DELETE PRODUCT ERROR:', error);

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
import Product from '@/models/Product';
import cloudinary from '@/lib/cloudinary';
import { deleteFromCloudinary } from '@/lib/deleteFromCloudinary';

// GET SINGLE PRODUCT
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id)
      .populate('categoryId')
      .lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
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

// UPDATE PRODUCT
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const oldProduct = await Product.findById(id);

    if (!oldProduct) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product not found',
        },
        {
          status: 404,
        },
      );
    }

    // Remove deleted images from Cloudinary

    if (body.images) {
      const removedImages = oldProduct.images.filter(
        (oldImage) =>
          !body.images.some(
            (newImage) => newImage.public_id === oldImage.public_id,
          ),
      );

      for (const image of removedImages) {
        await deleteFromCloudinary(image.public_id);
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        ...body,
        price: Number(body.price),
        salePrice: body.salePrice ? Number(body.salePrice) : null,
        stock: Number(body.stock),
        tags: Array.isArray(body.tags)
          ? body.tags
          : body.tags
            ? body.tags.split(',').map((i) => i.trim())
            : [],

        keywords: Array.isArray(body.keywords)
          ? body.keywords
          : body.keywords
            ? body.keywords.split(',').map((i) => i.trim())
            : [],
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return NextResponse.json({
      success: true,

      data: product,

      message: 'Product updated successfully',
    });
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

// DELETE PRODUCT
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product not found',
        },
        {
          status: 404,
        },
      );
    }

    for (const image of product.images) {
      if (image.public_id) {
        await deleteFromCloudinary(image.public_id);
      }
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,

      message: 'Product deleted successfully',
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
