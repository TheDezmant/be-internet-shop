/*
  Warnings:

  - You are about to drop the column `typeId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the `DeviceType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeAndBrand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_typeId_fkey";

-- DropForeignKey
ALTER TABLE "TypeAndBrand" DROP CONSTRAINT "TypeAndBrand_brandId_fkey";

-- DropForeignKey
ALTER TABLE "TypeAndBrand" DROP CONSTRAINT "TypeAndBrand_typeId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "typeId";

-- DropTable
DROP TABLE "DeviceType";

-- DropTable
DROP TABLE "TypeAndBrand";

-- CreateTable
CREATE TABLE "CategoriesAndBrand" (
    "id" SERIAL NOT NULL,
    "categoriesId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CategoriesAndBrand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesAndBrand_categoriesId_key" ON "CategoriesAndBrand"("categoriesId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesAndBrand_brandId_key" ON "CategoriesAndBrand"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesAndBrand_categoriesId_brandId_key" ON "CategoriesAndBrand"("categoriesId", "brandId");

-- AddForeignKey
ALTER TABLE "CategoriesAndBrand" ADD CONSTRAINT "CategoriesAndBrand_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesAndBrand" ADD CONSTRAINT "CategoriesAndBrand_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
