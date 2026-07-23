// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema(
// {
//   orderNumber:{
//     type:String,
//     required:true,
//     unique:true
//   },

//   customerName:String,

//   email:String,

//   phone:String,

//   guestId:String,

//   items:[
//     {
//       productId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Product"
//       },

//       name:String,

//       image:String,

//       price:Number,

//       quantity:Number,

//       total:Number
//     }
//   ],

//   subtotal:Number,

//   shippingCost:Number,

//   discount:Number,

//   grandTotal:Number,

//   paymentMethod:String,

//   paymentStatus:{
//     type:String,
//     default:"pending"
//   },

//   orderStatus:{
//     type:String,
//     default:"pending"
//   },

//   shippingAddress:{
//     fullName:String,
//     phone:String,
//     city:String,
//     area:String,
//     address:String
//   },

//   notes:String
// },
// {
//   timestamps:true
// }
// );

// export default mongoose.models.Order ||
// mongoose.model("Order",OrderSchema);

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },

        name: String,

        price: Number,

        quantity: Number,

        image: String,
      },
    ],

    subtotal: Number,

    discount: {
      type: Number,
      default: 0,
    },

    shipping: {
      type: Number,
      default: 0,
    },

    total: Number,

    coupon: {
      code: String,
      discount: Number,
    },

    customer: {
      name: String,
      phone: String,
      email: String,

      address: String,
      city: String,
      postalCode: String,
    },

    paymentMethod: {
      type: String,
      enum: ['cod', 'card', 'easypaisa', 'jazzcash'],
      default: 'cod',
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },

    orderStatus: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'shipped',
        'delivered',
        'cancelled',
      ],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order ||
  mongoose.model('Order', OrderSchema);
