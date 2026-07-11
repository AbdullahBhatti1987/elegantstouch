import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
    },

    userId: {
      type: String,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Cart ||
  mongoose.model('Cart', CartSchema);
