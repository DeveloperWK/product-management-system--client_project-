/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Sales" ADD COLUMN     "due" DOUBLE PRECISION,
ALTER COLUMN "discountType" DROP NOT NULL,
ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "taxType" DROP NOT NULL,
ALTER COLUMN "tax" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "public"."Customer"("phone");
