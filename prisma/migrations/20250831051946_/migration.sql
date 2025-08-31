-- AlterTable
ALTER TABLE "public"."Purchase" ADD COLUMN     "expenseAmount" DOUBLE PRECISION,
ADD COLUMN     "expenseId" TEXT;

-- AlterTable
ALTER TABLE "public"."Sales" ALTER COLUMN "exchangeCal" DROP NOT NULL,
ALTER COLUMN "unitPrice" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "public"."Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
