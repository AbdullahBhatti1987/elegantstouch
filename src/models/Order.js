import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
{
  orderNumber:{
    type:String,
    required:true,
    unique:true
  },

  customerName:String,

  email:String,

  phone:String,

  userId:String,

  items:[
    {
      productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
      },

      name:String,

      image:String,

      price:Number,

      quantity:Number,

      total:Number
    }
  ],

  subtotal:Number,

  shippingCost:Number,

  discount:Number,

  grandTotal:Number,

  paymentMethod:String,

  paymentStatus:{
    type:String,
    default:"pending"
  },

  orderStatus:{
    type:String,
    default:"pending"
  },

  shippingAddress:{
    fullName:String,
    phone:String,
    city:String,
    area:String,
    address:String
  },

  notes:String
},
{
  timestamps:true
}
);

export default mongoose.models.Order ||
mongoose.model("Order",OrderSchema);