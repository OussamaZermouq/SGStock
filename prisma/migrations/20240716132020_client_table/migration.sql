/*
  Warnings:

  - You are about to drop the column `name` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `nomSociete` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "name",
DROP COLUMN "nomSociete",
ADD COLUMN     "nom" TEXT DEFAULT '';
