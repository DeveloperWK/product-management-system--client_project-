-- AlterTable
ALTER TABLE "public"."Supplier" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Warranty" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."PurchaseDuePayment" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseDuePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SalesDuePayment" (
    "id" TEXT NOT NULL,
    "salesId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalesDuePayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PurchaseDuePayment" ADD CONSTRAINT "PurchaseDuePayment_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "public"."Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SalesDuePayment" ADD CONSTRAINT "SalesDuePayment_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "public"."Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
