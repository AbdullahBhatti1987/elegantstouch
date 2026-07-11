import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
{
  code:{
    type:String,
    unique:true
  },

  discountType:{
    type:String,
    enum:["fixed","percentage"]
  },

  value:Number,

  minOrderAmount:Number,

  usageLimit:Number,

  usedCount:{
    type:Number,
    default:0
  },

  expiryDate:Date,

  status:{
    type:String,
    default:"active"
  }
},
{
  timestamps:true
}
);

export default mongoose.models.Coupon ||
mongoose.model("Coupon",CouponSchema);