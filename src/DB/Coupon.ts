import { Prisma } from '@prisma/client';
import { prisma } from '../config/db.config';

const Coupon = {
  create: async (data: Prisma.CouponCreateInput) => {
    try {
      return await prisma.coupon.create({ data });
    } catch (error) {
      console.error("Error creating coupon:", error);
      throw new Error("Failed to create coupon");
    }
  },
  getCouponById:async(id:string)=>{
    try {
      return await prisma.coupon.findUnique({
        where: { id },
        include: { products: { include: { product: true } } },
      });
    } catch (error) {
      console.error("Error fetching coupon by ID:", error);
      throw new Error("Failed to fetch coupon by ID");
    }
  },
  updateCoupon:async(id: string, data: Prisma.CouponUpdateInput)=>{
    try {
      return await prisma.coupon.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error("Error updating coupon:", error);
      throw new Error("Failed to update coupon");
    }
  },
  deleteCoupon:async(id:string)=>{
    try {
      return await prisma.coupon.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting coupon:", error);
      throw new Error("Failed to delete coupon");
    }
  },
  getCouponByCode:async(code:string)=>{
    try {
      return await prisma.coupon.findUnique({
        where: { code },
        include: { products: { include: { product: true } } },
      });
    } catch (error) {
      console.error("Error fetching coupon by code:", error);
      throw new Error("Failed to fetch coupon by code");
    }
  },
  getCouponByProductId:async(productId:string)=>{
    try {
      return await prisma.coupon.findMany({
        where: {
          products: {
            some: { productId },
          },
        },
        include: { products: { include: { product: true } } },
      });
    } catch (error) {
      console.error("Error fetching coupon by product ID:", error);
      throw new Error("Failed to fetch coupon by product ID");
    }
  },
  getCouponWithFilter:async(params: {
    search?: string;
    isActive?: boolean;
    discountType?: "PERCENTAGE" | "FIXED";
    minDiscount?: number;
    maxDiscount?: number;
    validOnly?: boolean;
    skip?: number;
    take?: number;
  })=>{
    try {
      const {
        search,
        isActive,
        discountType,
        minDiscount,
        maxDiscount,
        validOnly,
        skip = 0,
        take = 10,
      } = params;

      return await prisma.coupon.findMany({
        where: {
          AND: [
            search ? { code: { contains: search, mode: "insensitive" } } : {},
            isActive !== undefined ? { isActive } : {},
            discountType ? { discountType } : {},
            minDiscount ? { discount: { gte: minDiscount } } : {},
            maxDiscount ? { discount: { lte: maxDiscount } } : {},
            validOnly ? { expiresAt: { gt: new Date() } } : {},
          ],
        },
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: { products: { include: { product: true } } },
      });
    } catch (error) {
      console.error("Error filtering coupons:", error);
      throw new Error("Failed to fetch coupons with filter");
    }

  }
}
export default Coupon;