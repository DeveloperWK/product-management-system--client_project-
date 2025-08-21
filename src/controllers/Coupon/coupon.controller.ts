import { Request, Response, Router } from 'express';
import Coupon from '../../DB/Coupon';


const router = Router();

const createCoupon = async (req: Request, res: Response) => {
  try {

    const newCoupon = {
      code:req.body.code,
      discount:req.body.discount,
      discountType:req.body.discountType,
      expiresAt:req.body.expiresAt,
      isActive:req.body.isActive,
      minimumPurchaseAmount:req.body.minimumPurchaseAmount,
      products:req.body.products,
    }
    const coupon = await Coupon.create(newCoupon);
    res.status(201).json({ success: true, data: coupon });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
}
const getCouponById = async (req: Request, res: Response) => {
  try {
    const {id}=req.params;
    const coupon = await Coupon.getCouponById(id);
    if (!coupon) return res.status(404).json({ success: false, error: "Coupon not found" });
    res.json({ success: true, data: coupon });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
}
const updateCoupon = async (req: Request, res: Response) => {
  try {
    const {id}=req.params;
    const updateData = {
      ...(req.body.code && {code:req.body.code}),
      ...(req.body.discount && {discount:req.body.discount})  ,
      ...(req.body.discountType && {discountType:req.body.discountType}),
      ...(req.body.expiresAt && {expiresAt:req.body.expiresAt}),
      ...(req.body.isActive && {isActive:req.body.isActive}),
      ...(req.body.minimumPurchaseAmount && {minimumPurchaseAmount:req.body.minimumPurchaseAmount}),
      ...(req.body.products && {products:req.body.products}),
    };
    const coupon = await Coupon.updateCoupon(id, updateData);
    res.json({ success: true, data: coupon });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
}
const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const {id}=req.params;
    await Coupon.deleteCoupon(id);
    res.json({ success: true, message: "Coupon deleted" });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
}
const getCouponByCode = async (req: Request, res: Response) => {
  try {
    const {code}=req.params;
    const coupon = await Coupon.getCouponByCode(code);
    if (!coupon) return res.status(404).json({ success: false, error: "Coupon not found" });
    res.json({ success: true, data: coupon });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
}
const getCouponByProductId = async (req: Request, res: Response) => {
  try {
    const {productId}=req.params;
    const coupons = await Coupon.getCouponByProductId(productId);
    res.json({ success: true, data: coupons });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
}
const getCouponWithFilter = async (req: Request, res: Response) => {
  try {
    const filters = {
      search: req.query.search as string,
      isActive: req.query.isActive ? req.query.isActive === "true" : undefined,
      discountType: req.query.discountType as "PERCENTAGE" | "FIXED",
      minDiscount: req.query.minDiscount ? Number(req.query.minDiscount) : undefined,
      maxDiscount: req.query.maxDiscount ? Number(req.query.maxDiscount) : undefined,
      validOnly: req.query.validOnly ? req.query.validOnly === "true" : undefined,
      skip: req.query.skip ? Number(req.query.skip) : 0,
      take: req.query.take ? Number(req.query.take) : 10,
    };

    const coupons = await Coupon.getCouponWithFilter(filters);
    res.json({ success: true, data: coupons });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export {
  createCoupon,
  deleteCoupon,
  getCouponById,
  getCouponByCode,
  getCouponByProductId,
  getCouponWithFilter,
  updateCoupon,
};
