import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
{
  guestId:{
    type:String
  },

  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
  }
},
{
  timestamps:true
}
);

export default mongoose.models.Wishlist ||
mongoose.model("Wishlist",WishlistSchema);