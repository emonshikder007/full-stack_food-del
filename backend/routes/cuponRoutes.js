import express from "express";
import { addCoupon, expireCoupon, validateCoupon } from '../controllers/cuponController.js';

const router = express.Router();

router.post("/add", addCoupon);
router.post("/expire", expireCoupon);
router.post("/validate", validateCoupon);

export default router;