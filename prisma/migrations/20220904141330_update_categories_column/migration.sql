/*
  Warnings:

  - You are about to drop the `Tree` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tree" DROP CONSTRAINT "Tree_categoriesId_fkey";

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "categoriesId" SERIAL NOT NULL;

-- DropTable
DROP TABLE "Tree";

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
