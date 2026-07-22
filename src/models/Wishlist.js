import mongoose from 'mongoose';

const WishlistItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    _id: false,
  },
);

const WishlistSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    items: [WishlistItemSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Wishlist ||
  mongoose.model('Wishlist', WishlistSchema);
