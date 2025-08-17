/*
  Warnings:

  - You are about to drop the `Attributes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AttributeValue" DROP CONSTRAINT "AttributeValue_attributeId_fkey";

-- AlterTable
ALTER TABLE "public"."AttributeValue" ADD CONSTRAINT "AttributeValue_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "public"."AttributeValue_id_key";

-- AlterTable
ALTER TABLE "public"."Store" ADD CONSTRAINT "Store_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "public"."Store_id_key";

-- AlterTable
ALTER TABLE "public"."Warehouse" ADD CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "public"."Warehouse_id_key";

-- DropTable
DROP TABLE "public"."Attributes";

-- CreateTable
CREATE TABLE "public"."Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "sku" TEXT,
    "itemCode" TEXT,
    "quantityAlert" INTEGER,
    "manufacturedDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "description" TEXT,
    "storeId" INTEGER NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "subCategoryId" INTEGER,
    "subSubCategoryId" INTEGER,
    "brandId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ProductAttributes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductAttributes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "public"."Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_key" ON "public"."Attribute"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "public"."Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "public"."Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_itemCode_key" ON "public"."Product"("itemCode");

-- CreateIndex
CREATE INDEX "_ProductAttributes_B_index" ON "public"."_ProductAttributes"("B");

-- AddForeignKey
ALTER TABLE "public"."AttributeValue" ADD CONSTRAINT "AttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "public"."Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "public"."SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_subSubCategoryId_fkey" FOREIGN KEY ("subSubCategoryId") REFERENCES "public"."SubSubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductAttributes" ADD CONSTRAINT "_ProductAttributes_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."AttributeValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductAttributes" ADD CONSTRAINT "_ProductAttributes_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
