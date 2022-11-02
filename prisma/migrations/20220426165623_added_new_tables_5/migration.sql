/*
  Warnings:

  - You are about to drop the column `rating` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the `DeviceInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeBrand` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,deviceId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deviceId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "rating",
ADD COLUMN     "brandId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "deviceRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "deviceId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "DeviceInfo";

-- DropTable
DROP TABLE "TypeBrand";

-- CreateTable
CREATE TABLE "TypeAndBrand" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "TypeAndBrand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeAndBrand_typeId_key" ON "TypeAndBrand"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "TypeAndBrand_brandId_key" ON "TypeAndBrand"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "TypeAndBrand_typeId_brandId_key" ON "TypeAndBrand"("typeId", "brandId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_deviceId_key" ON "Rating"("userId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_key" ON "Rating"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_deviceId_key" ON "Rating"("deviceId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeAndBrand" ADD CONSTRAINT "TypeAndBrand_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeAndBrand" ADD CONSTRAINT "TypeAndBrand_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
