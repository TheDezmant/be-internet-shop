/*
  Warnings:

  - The `img` column on the `Device` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "img",
ADD COLUMN     "img" TEXT[];
