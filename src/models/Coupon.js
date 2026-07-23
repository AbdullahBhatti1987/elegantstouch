import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },

    discountType: {
      type: String,
      enum: ['fixed', 'percentage'],
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },

    maxDiscount: {
      type: Number,
      default: null,
    },

    // Coupon kis cheez par apply hoga
    applyType: {
      type: String,
      enum: ['all', 'products', 'categories'],
      default: 'all',
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },

    minOrderAmount: {
      type: Number,
      default: 0,
    },

    usageLimit: {
      type: Number,
      default: null,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    expiryDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Coupon ||
  mongoose.model('Coupon', CouponSchema);
