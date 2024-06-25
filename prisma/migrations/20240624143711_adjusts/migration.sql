/*
  Warnings:

  - The values [FETLOCK] on the enum `payment_method` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `bookId` on the `order` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "payment_method_new" AS ENUM ('DEBITCARD', 'CREDITCARD', 'PIX');
ALTER TABLE "payment" ALTER COLUMN "method" TYPE "payment_method_new" USING ("method"::text::"payment_method_new");
ALTER TYPE "payment_method" RENAME TO "payment_method_old";
ALTER TYPE "payment_method_new" RENAME TO "payment_method";
DROP TYPE "payment_method_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_bookId_fkey";

-- DropIndex
DROP INDEX "order_bookId_key";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "bookId";

-- CreateTable
CREATE TABLE "_BookToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToOrder_AB_unique" ON "_BookToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToOrder_B_index" ON "_BookToOrder"("B");

-- AddForeignKey
ALTER TABLE "_BookToOrder" ADD CONSTRAINT "_BookToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToOrder" ADD CONSTRAINT "_BookToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
