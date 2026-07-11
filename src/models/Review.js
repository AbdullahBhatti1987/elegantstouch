import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
{
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },

  customerName:String,

  rating:Number,

  review:String,

  approved:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
}
);

export default mongoose.models.Review ||
mongoose.model("Review",ReviewSchema);