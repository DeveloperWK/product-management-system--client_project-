/*
  Warnings:

  - A unique constraint covering the columns `[couponId]` on the table `Sales` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Sales" ADD COLUMN     "couponId" TEXT,
ADD COLUMN     "discountAmount" DOUBLE PRECISION,
ADD COLUMN     "finalAmount" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Sales_couponId_key" ON "public"."Sales"("couponId");

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "public"."Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
