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
      required: true,
      default: 1,
      min: 1,
    },
  },
  {
    _id: false,
  },
);

const CartSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
      required: true,
      unique: true,
      index: true,
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
