import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    _id: true,
  },
);

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    items: [CartItemSchema],

    status: {
      type: String,
      enum: ['active', 'converted', 'abandoned'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Cart ||
  mongoose.model('Cart', CartSchema);
