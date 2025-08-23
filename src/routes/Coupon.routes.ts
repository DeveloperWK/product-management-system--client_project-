import { Router } from "express";
import {
  createCoupon,
  deleteCoupon,
  getCouponByCode,
  getCouponById,
  getCouponByProductId,
  getCouponWithFilter,
  updateCoupon,
} from "../controllers/Coupon/coupon.controller";

const router = Router();

router
  .post("", createCoupon)
  .get("", getCouponWithFilter)
  .get("/:id", getCouponById)
  .get("/code/:code", getCouponByCode)
  .get("/product/:productId", getCouponByProductId)
  .patch("/:id", updateCoupon)
  .delete("/:id", deleteCoupon);

export default router;
