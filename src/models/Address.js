import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
      required: true,
    },

    fullName: String,

    phone: String,

    email: String,

    country: String,

    city: String,

    area: String,

    address: String,

    postalCode: String,

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Address ||
  mongoose.model('Address', AddressSchema);
