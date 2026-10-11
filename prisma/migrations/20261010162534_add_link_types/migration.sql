/*
  Warnings:

  - You are about to drop the column `icon` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,platform]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('LINK', 'SOCIAL');

-- DropIndex
DROP INDEX "Link_userId_idx";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "icon",
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "type" "LinkType" NOT NULL DEFAULT 'LINK',
ALTER COLUMN "title" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Link_userId_type_order_idx" ON "Link"("userId", "type", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Link_userId_platform_key" ON "Link"("userId", "platform");
