/*
  Warnings:

  - You are about to drop the column `cartId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "book" DROP CONSTRAINT "book_cartId_fkey";

-- AlterTable
ALTER TABLE "book" DROP COLUMN "cartId";

-- CreateTable
CREATE TABLE "_BookToCart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToCart_AB_unique" ON "_BookToCart"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToCart_B_index" ON "_BookToCart"("B");

-- AddForeignKey
ALTER TABLE "_BookToCart" ADD CONSTRAINT "_BookToCart_A_fkey" FOREIGN KEY ("A") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCart" ADD CONSTRAINT "_BookToCart_B_fkey" FOREIGN KEY ("B") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
