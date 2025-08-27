/*
  Warnings:

  - You are about to drop the column `unitPrice` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `cutomerId` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `productKey` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseId` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesPrice` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Sales" DROP CONSTRAINT "Sales_cutomerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Sales" DROP CONSTRAINT "Sales_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Sales" DROP CONSTRAINT "Sales_productKey_fkey";

-- AlterTable
ALTER TABLE "public"."Purchase" DROP COLUMN "unitPrice";

-- AlterTable
ALTER TABLE "public"."Sales" DROP COLUMN "cutomerId",
DROP COLUMN "productId",
DROP COLUMN "productKey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "purchaseId" TEXT NOT NULL,
ADD COLUMN     "salesPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."Order";

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "public"."Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
