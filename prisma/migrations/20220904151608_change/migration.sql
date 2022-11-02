/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `Categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_categoriesId_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "categoriesId";
