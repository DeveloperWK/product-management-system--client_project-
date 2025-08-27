/*
  Warnings:

  - You are about to drop the column `warrantyId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_warrantyId_fkey";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "warrantyId";

-- AlterTable
ALTER TABLE "public"."Purchase" ADD COLUMN     "warrantyId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "public"."Warranty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
