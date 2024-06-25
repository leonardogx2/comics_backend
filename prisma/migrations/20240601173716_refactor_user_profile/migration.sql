/*
  Warnings:

  - You are about to drop the column `profile` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "profile",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSeller" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "profile";
