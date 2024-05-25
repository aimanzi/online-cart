import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productname: {
      type: String,
      require: true,
    },
    productcategory: {
      type: String,
      require: true,
    },
    productbarcode: {
      type: String,
      require: true,
    },
    productimg: {
      type: String,
      require: true,
    },
    productPrice: {
      type: String,
      require: true,
    },
    note: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

// date: { type: Date, default: Date.now },

export default mongoose.model("ProductInfo", ProductSchema);
