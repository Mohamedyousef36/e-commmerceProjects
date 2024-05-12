import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Coupon name required"],
      unique: [true, "Coupon must be unique"],
    },
    expireDate: {
      type: Date,
      required: [true, "Coupon expireDate required"],
    },
    discount: {
      type: Number,
      required: [true, "Coupon discount required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Coupon',CouponSchema)