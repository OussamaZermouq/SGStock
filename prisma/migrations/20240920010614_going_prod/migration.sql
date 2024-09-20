/*
  Warnings:

  - The values [EnAttente] on the enum `LivraisonStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `quantitee` on the `MatierePremiere` table. All the data in the column will be lost.
  - You are about to drop the `_FournisseurToMatierePremiere` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MatierePremiereToProduit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unite` to the `MatierePremiere` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "commandeStatus" AS ENUM ('Annule', 'EnAttenteConfirmation', 'EnLivraison', 'Complet');

-- AlterEnum
BEGIN;
CREATE TYPE "LivraisonStatus_new" AS ENUM ('EnCours', 'Livre', 'Annule');
ALTER TABLE "Livraison" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Livraison" ALTER COLUMN "status" TYPE "LivraisonStatus_new" USING ("status"::text::"LivraisonStatus_new");
ALTER TYPE "LivraisonStatus" RENAME TO "LivraisonStatus_old";
ALTER TYPE "LivraisonStatus_new" RENAME TO "LivraisonStatus";
DROP TYPE "LivraisonStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_FournisseurToMatierePremiere" DROP CONSTRAINT "_FournisseurToMatierePremiere_A_fkey";

-- DropForeignKey
ALTER TABLE "_FournisseurToMatierePremiere" DROP CONSTRAINT "_FournisseurToMatierePremiere_B_fkey";

-- DropForeignKey
ALTER TABLE "_MatierePremiereToProduit" DROP CONSTRAINT "_MatierePremiereToProduit_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatierePremiereToProduit" DROP CONSTRAINT "_MatierePremiereToProduit_B_fkey";

-- AlterTable
ALTER TABLE "Commande" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "status" "commandeStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Livraison" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MatierePremiere" DROP COLUMN "quantitee",
ADD COLUMN     "quantiteeMatiere" INTEGER,
ADD COLUMN     "unite" TEXT NOT NULL;

-- DropTable
DROP TABLE "_FournisseurToMatierePremiere";

-- DropTable
DROP TABLE "_MatierePremiereToProduit";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProduitMatiere" (
    "produitId" INTEGER NOT NULL,
    "matiereId" INTEGER NOT NULL,
    "quantitee" INTEGER NOT NULL,

    CONSTRAINT "ProduitMatiere_pkey" PRIMARY KEY ("matiereId","produitId")
);

-- CreateTable
CREATE TABLE "FournisseurMatierePremiere" (
    "fournisseurId" INTEGER NOT NULL,
    "matierePremiereId" INTEGER NOT NULL,
    "quantitee" INTEGER NOT NULL,

    CONSTRAINT "FournisseurMatierePremiere_pkey" PRIMARY KEY ("fournisseurId","matierePremiereId")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "role" TEXT,
    "image" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "ProduitMatiere" ADD CONSTRAINT "ProduitMatiere_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES "MatierePremiere"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProduitMatiere" ADD CONSTRAINT "ProduitMatiere_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FournisseurMatierePremiere" ADD CONSTRAINT "FournisseurMatierePremiere_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FournisseurMatierePremiere" ADD CONSTRAINT "FournisseurMatierePremiere_matierePremiereId_fkey" FOREIGN KEY ("matierePremiereId") REFERENCES "MatierePremiere"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
