import mongoose from "mongoose";


const OrderItemSchema = new mongoose.Schema({

 productId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Product",
  required:true
 },

 name:String,

 image:String,

 price:Number,

 quantity:Number,

});


const AddressSchema = new mongoose.Schema({

 fullName:{
  type:String,
  required:true
 },

 mobile:{
  type:String,
  required:true
 },

 email:String,

 address:{
  type:String,
  required:true
 },

 city:{
  type:String,
  required:true
 },

 province:{
  type:String,
  required:true
 },

 postalCode:String,

});


const OrderSchema = new mongoose.Schema({

 guestId:{
  type:String,
  required:true,
  index:true
 },


 items:[
  OrderItemSchema
 ],


 shippingAddress:
 AddressSchema,


 paymentMethod:{
  type:String,
  enum:[
   "cod",
   "easypaisa",
   "jazzcash"
  ],
  default:"cod"
 },


 paymentStatus:{
  type:String,
  enum:[
   "pending",
   "paid",
   "failed"
  ],
  default:"pending"
 },


 orderStatus:{
  type:String,
  enum:[
   "pending",
   "confirmed",
   "shipped",
   "delivered",
   "cancelled"
  ],
  default:"pending"
 },


 subtotal:Number,

 shipping:Number,

 discount:{
  type:Number,
  default:0
 },


 total:Number,


 coupon:{
  code:String,
  discount:Number
 }


},
{
 timestamps:true
});


export default mongoose.models.Order ||
mongoose.model("Order",OrderSchema);