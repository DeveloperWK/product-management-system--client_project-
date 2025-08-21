import { Router } from 'express';
import {
  createCoupon,
  deleteCoupon,
  getCouponByCode,
  getCouponById,
  getCouponByProductId,
  getCouponWithFilter,
  updateCoupon,
} from '../controllers/Coupon/coupon.controller';

const router = Router();

router.post('', createCoupon);
router.get('', getCouponWithFilter);
router.get('/:id', getCouponById);
router.get('/code/:code', getCouponByCode);
router.get('/product/:productId', getCouponByProductId);
router.patch('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

export default router;
