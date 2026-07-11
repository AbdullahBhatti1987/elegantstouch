// import mongoose from "mongoose";

// const SettingSchema = new mongoose.Schema(
//   {
//     storeName: String,
//     storeEmail: String,
//     storePhone: String,
//     storeAddress: String,

//     logo: String,
//     favicon: String,

//     defaultSeoTitle: String,
//     defaultSeoDescription: String,
//     defaultSeoKeywords: String,

//     googleVerificationCode: String,
//     bingVerificationCode: String,

//     googleAnalyticsId: String,
//     googleTagManagerId: String,
//     facebookPixelId: String,

//     facebookUrl: String,
//     instagramUrl: String,
//     youtubeUrl: String,
//     tiktokUrl: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.models.Setting ||
//   mongoose.model("Setting", SettingSchema);

import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema(
  {
    storeName: String,

    storeEmail: String,

    storePhone: String,

    storeAddress: String,

    logo: String,

    favicon: String,

    currency: {
      type: String,
      default: 'PKR',
    },

    googleAnalyticsId: String,

    googleTagManagerId: String,

    facebookPixelId: String,

    googleVerificationCode: String,

    bingVerificationCode: String,

    metaTitle: String,

    metaDescription: String,

    metaKeywords: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Setting ||
  mongoose.model('Setting', SettingSchema);
