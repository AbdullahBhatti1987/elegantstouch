import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { multipleFilesToCloudinary } from '@/lib/multipleFilesToCloudinary';
import mongoose from 'mongoose';

// GET ALL PRODUCTS

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('category') || '';
    // const categoryParam = searchParams.get('category') || '';

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 8;
    const skip = (page - 1) * limit;

    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');

    const featured = searchParams.get('featured');
    const status = searchParams.get('status');

    const sort = searchParams.get('sort') || 'latest';

    let query = {};

    // Search
    if (search) {
      const matchedCategories = await Category.find({
        name: {
          $regex: search,
          $options: 'i',
        },
      }).select('_id');

      query.$or = [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          slug: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          brand: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          sku: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          tags: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          keywords: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          categoryId: {
            $in: matchedCategories.map((cat) => cat._id),
          },
        },
      ];
    }

    // const searchedProducts = await Product.aggregate([
    //   {
    //     $lookup: {
    //       from: 'categories',
    //       localField: 'categoryId',
    //       foreignField: '_id',
    //       as: 'category',
    //     },
    //   },
    //   {
    //     $unwind: '$category',
    //   },
    //   {
    //     $match: {
    //       $or: [
    //         {
    //           name: {
    //             $regex: search,
    //             $options: 'i',
    //           },
    //         },
    //         {
    //           slug: {
    //             $regex: search,
    //             $options: 'i',
    //           },
    //         },
    //         {
    //           brand: {
    //             $regex: search,
    //             $options: 'i',
    //           },
    //         },
    //         {
    //           'category.name': {
    //             $regex: search,
    //             $options: 'i',
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ]);

    // Category Filter

    if (categoryId) {
      let category;

      if (mongoose.Types.ObjectId.isValid(categoryId)) {
        category = await Category.findById(categoryId);
      } else {
        category = await Category.findOne({
          slug: categoryId,
        });
      }
      // console.log("category==>", category)
      // console.log("categorySlug==>", categorySlug)
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

      query.categoryId = category._id;
    }

    // Price Filter (Sale Price + Regular Price)
    if (priceMin || priceMax) {
      const min = Number(priceMin) || 0;
      const max = Number(priceMax) || 999999;

      query.$expr = {
        $and: [
          {
            $gte: [
              {
                $ifNull: ['$salePrice', '$price'],
              },
              min,
            ],
          },
          {
            $lte: [
              {
                $ifNull: ['$salePrice', '$price'],
              },
              max,
            ],
          },
        ],
      };
    }

    // Featured Filter
    if (featured === 'true') {
      query.featured = true;
    }

    if (featured === 'false') {
      query.featured = false;
    }

    // Status Filter
    if (status) {
      query.status = status;
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case 'price-low-high':
        sortOption = {
          salePrice: 1,
          price: 1,
        };
        break;

      case 'price-high-low':
        sortOption = {
          salePrice: -1,
          price: -1,
        };
        break;

      case 'name-a-z':
        sortOption = {
          name: 1,
        };
        break;

      case 'name-z-a':
        sortOption = {
          name: -1,
        };
        break;

      case 'oldest':
        sortOption = {
          createdAt: 1,
        };
        break;

      default:
        sortOption = {
          createdAt: -1,
        };
    }

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate('categoryId')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,

      data: products,

      pagination: {
        total: totalProducts,
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit),
        hasNextPage: page < Math.ceil(totalProducts / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error(error);

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
// POST PRODUCT

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Images receive
    const files = formData
      .getAll('images')
      .filter((file) => file && file.size > 0);

    if (!files.length) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product images are required',
        },
        {
          status: 400,
        },
      );
    }

    const uploadedImages = await multipleFilesToCloudinary(
      files,
      'products',
    );

    const tags = formData.get('tags');

    const keywords = formData.get('keywords');

    const product = await Product.create({
      sku: formData.get('sku'),

      name: formData.get('name'),

      slug: formData.get('slug'),

      categoryId: formData.get('categoryId'),

      brand: formData.get('brand'),

      collectionName: formData.get('collectionName'),

      price: Number(formData.get('price')) || 0,

      salePrice: formData.get('salePrice')
        ? Number(formData.get('salePrice'))
        : null,

      currency: formData.get('currency'),

      images: uploadedImages,

      stock: Number(formData.get('stock')) || 0,

      inStock: formData.get('inStock') === 'true',

      badge: formData.get('badge'),

      shortDescription: formData.get('shortDescription'),

      description: formData.get('description'),

      features: formData.get('features'),

      material: formData.get('material'),

      color: formData.get('color'),

      ageGroup: formData.get('ageGroup'),

      weight: formData.get('weight'),

      tags: tags ? tags.split(',').map((item) => item.trim()) : [],

      keywords: keywords
        ? keywords.split(',').map((item) => item.trim())
        : [],

      seoTitle: formData.get('seoTitle'),

      seoDescription: formData.get('seoDescription'),
    });

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: 'Product created successfully',
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log('PRODUCT CREATE ERROR:', error);

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
