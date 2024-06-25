-- AlterTable
ALTER TABLE "image" ADD COLUMN     "local" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "url" TEXT;
