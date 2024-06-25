/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_imageId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "emailVerified",
DROP COLUMN "imageId";
