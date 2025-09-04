/*
  Warnings:

  - You are about to drop the column `due` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `salesId` on the `SalesDuePayment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `SalesDuePayment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."SalesDuePayment" DROP CONSTRAINT "SalesDuePayment_salesId_fkey";

-- AlterTable
ALTER TABLE "public"."Sales" DROP COLUMN "due";

-- AlterTable
ALTER TABLE "public"."SalesDuePayment" DROP COLUMN "salesId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."PaymentAndDue" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "due" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentAndDue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Settings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "cover" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentAndDue_customerId_key" ON "public"."PaymentAndDue"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_phone_key" ON "public"."Customer"("email", "phone");

-- AddForeignKey
ALTER TABLE "public"."SalesDuePayment" ADD CONSTRAINT "SalesDuePayment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PaymentAndDue" ADD CONSTRAINT "PaymentAndDue_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
