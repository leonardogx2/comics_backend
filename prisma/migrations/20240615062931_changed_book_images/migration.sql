/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_bookId_fkey";

-- AlterTable
ALTER TABLE "book" ADD COLUMN     "imageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "book_imageId_key" ON "book"("imageId");

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
