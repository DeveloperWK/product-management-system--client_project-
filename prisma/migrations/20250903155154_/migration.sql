/*
  Warnings:

  - Added the required column `purchaseTotalAmount` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Purchase" ADD COLUMN     "purchaseTotalAmount" DOUBLE PRECISION NOT NULL;
