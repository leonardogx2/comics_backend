/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "paymentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_orderId_key" ON "payment"("orderId");
