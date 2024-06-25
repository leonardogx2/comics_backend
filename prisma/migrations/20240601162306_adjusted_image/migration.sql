/*
  Warnings:

  - You are about to drop the column `base64` on the `image` table. All the data in the column will be lost.
  - Added the required column `name` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "image" DROP COLUMN "base64",
ADD COLUMN     "name" TEXT NOT NULL;
