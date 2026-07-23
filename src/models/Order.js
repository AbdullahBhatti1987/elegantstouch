import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },

  name: String,

  image: String,

  price: Number,

  quantity: Number,
});

const AddressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    default: '',
  },

  mobile: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  landmark: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  province: {
    type: String,
    required: true,
  },

  postalCode: {
    type: String,
    default: '',
  },
});

const OrderSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
      required: true,
      index: true,
    },

    items: [OrderItemSchema],

    shippingAddress: AddressSchema,

    paymentMethod: {
      type: String,
      enum: ['cod', 'bank'],
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

    subtotal: Number,

    shipping: Number,

    discount: {
      type: Number,
      default: 0,
    },

    total: Number,

    coupon: {
      code: String,
      discount: Number,
    },
    saveInfo: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order ||
  mongoose.model('Order', OrderSchema);
