import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema(
  {
    subtitle: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      url: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
      },

      public_id: {
        type: String,
      },
    },

    primaryBtnText: {
      type: String,
      default: 'Shop Now',
    },

    primaryBtnLink: {
      type: String,
      default: '/products',
    },

    secondaryBtnText: {
      type: String,
      default: 'Explore',
    },

    secondaryBtnLink: {
      type: String,
      default: '/categories',
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Banner ||
  mongoose.model('Banner', BannerSchema);
