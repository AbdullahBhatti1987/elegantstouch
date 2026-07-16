import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    brand: {
      type: String,
      default: '',
    },

    collection: {
      type: String,
      default: '',
    },

    price: {
      type: Number,
      required: true,
    },

    salePrice: {
      type: Number,
      default: null,
    },

    currency: {
      type: String,
      default: 'PKR',
    },

    stock: {
      type: Number,
      default: 0,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    badge: {
      type: String,
      default: '',
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    thumbnail: {
      url: String,
      public_id: String,
    },

    shortDescription: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    features: {
      type: String,
      default: '',
    },

    material: {
      type: String,
      default: '',
    },

    color: {
      type: String,
      default: '',
    },

    ageGroup: {
      type: String,
      default: '',
    },

    weight: {
      type: String,
      default: '',
    },

    tags: [
      {
        type: String,
      },
    ],

    seoTitle: {
      type: String,
      default: '',
    },

    seoDescription: {
      type: String,
      default: '',
    },

    keywords: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
