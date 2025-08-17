-- CreateEnum
CREATE TYPE "public"."RoleType" AS ENUM ('ADMIN', 'USER', 'ADMINISTRATOR', 'MODERATOR');

-- CreateTable
CREATE TABLE "public"."Store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Warehouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubSubCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "SubSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Attributes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."AttributeValue" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "attributeId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "roles" "public"."RoleType"[] DEFAULT ARRAY['USER']::"public"."RoleType"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RefreshToken" (
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_id_key" ON "public"."Store"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "public"."Store"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_id_key" ON "public"."Warehouse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_name_key" ON "public"."Warehouse"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "public"."Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Attributes_id_key" ON "public"."Attributes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AttributeValue_id_key" ON "public"."AttributeValue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_key" ON "public"."RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "public"."RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "public"."SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubSubCategory" ADD CONSTRAINT "SubSubCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "public"."SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AttributeValue" ADD CONSTRAINT "AttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "public"."Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
