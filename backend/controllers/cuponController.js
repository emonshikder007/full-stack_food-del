import Coupon from '../models/couponModel.js';

// Add new coupon
export const addCoupon = async (req, res) => {
  try {
    const { code, discount } = req.body;
    const newCoupon = new Coupon({ code, discount });
    await newCoupon.save();
    res.json({ success: true, message: "Coupon added" });
  } catch (err) {
    res.json({ success: false, message: "Error adding coupon" });
  }
};

// Expire coupon
export const expireCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    await Coupon.findOneAndUpdate({ code }, { isExpired: true });
    res.json({ success: true, message: "Coupon expired" });
  } catch (err) {
    res.json({ success: false, message: "Error expiring coupon" });
  }
};

// Validate coupon from frontend
export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code, isExpired: false });
    if (coupon) {
      res.json({ success: true, discount: coupon.discount });
    } else {
      res.json({ success: false, message: "Invalid or expired coupon" });
    }
  } catch (err) {
    res.json({ success: false, message: "Error validating coupon" });
  }
};