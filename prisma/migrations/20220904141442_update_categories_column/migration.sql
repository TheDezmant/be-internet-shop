-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "categoriesId" SET DEFAULT 0,
ALTER COLUMN "categoriesId" DROP DEFAULT;
DROP SEQUENCE "Categories_categoriesId_seq";
