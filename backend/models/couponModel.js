import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  isExpired: { type: Boolean, default: false },
});

export default mongoose.model("Coupon", couponSchema);
