/*
  Warnings:

  - A unique constraint covering the columns `[ICE]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('Societe', 'Commune');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "ICE" TEXT,
ADD COLUMN     "adresse" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "city" TEXT DEFAULT '',
ADD COLUMN     "nomSociete" TEXT DEFAULT '',
ADD COLUMN     "type" "ClientType" NOT NULL DEFAULT 'Commune',
ADD COLUMN     "webSite" TEXT DEFAULT '',
ALTER COLUMN "telephone" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Client_ICE_key" ON "Client"("ICE");
