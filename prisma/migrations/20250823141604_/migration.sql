/*
  Warnings:

  - You are about to drop the `_PurchaseAttributes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attributeValueId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."discountAndTaxType" AS ENUM ('PERCENTAGE', 'CASH');

-- DropForeignKey
ALTER TABLE "public"."_PurchaseAttributes" DROP CONSTRAINT "_PurchaseAttributes_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PurchaseAttributes" DROP CONSTRAINT "_PurchaseAttributes_B_fkey";

-- AlterTable
ALTER TABLE "public"."Purchase" ADD COLUMN     "attributeValueId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."_PurchaseAttributes";

-- CreateTable
CREATE TABLE "public"."Sales" (
    "id" TEXT NOT NULL,
    "cutomerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productKey" TEXT NOT NULL,
    "variantValueId" TEXT NOT NULL,
    "exchangeCal" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "discountType" "public"."discountAndTaxType" NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "taxType" "public"."discountAndTaxType" NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_attributeValueId_fkey" FOREIGN KEY ("attributeValueId") REFERENCES "public"."AttributeValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_variantValueId_fkey" FOREIGN KEY ("variantValueId") REFERENCES "public"."AttributeValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_cutomerId_fkey" FOREIGN KEY ("cutomerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_productKey_fkey" FOREIGN KEY ("productKey") REFERENCES "public"."Product"("sku") ON DELETE RESTRICT ON UPDATE CASCADE;
