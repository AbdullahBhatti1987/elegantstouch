import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    image: {
      url: String,
      public_id: String,
      thumbnail: String,
    },

    alt: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    keywords: [
      {
        type: String,
        trim: true,
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

    sortOrder: {
      type: Number,
      default: 0,
    },

    seoTitle: {
      type: String,
      default: '',
    },

    seoDescription: {
      type: String,
      default: '',
    },

    productCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Category ||
  mongoose.model('Category', CategorySchema);
