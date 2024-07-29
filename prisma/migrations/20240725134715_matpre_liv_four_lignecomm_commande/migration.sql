-- CreateEnum
CREATE TYPE "LivraisonStatus" AS ENUM ('EnAttente', 'Livre', 'Annule');

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "dateCommande" TIMESTAMP(3) NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livraison" (
    "id" SERIAL NOT NULL,
    "dateLivraison" TIMESTAMP(3) NOT NULL,
    "status" "LivraisonStatus" NOT NULL DEFAULT 'EnAttente',
    "commnadeId" INTEGER NOT NULL,

    CONSTRAINT "Livraison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ligneCommande" (
    "commandeId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "ligneCommande_pkey" PRIMARY KEY ("commandeId","produitId")
);

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nom" TEXT NOT NULL,
    "telephone" TEXT,
    "adresse" TEXT,
    "email" TEXT,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatierePremiere" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nom" TEXT NOT NULL,
    "quantitee" INTEGER NOT NULL,

    CONSTRAINT "MatierePremiere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FournisseurToMatierePremiere" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Livraison_commnadeId_key" ON "Livraison"("commnadeId");

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_nom_key" ON "Fournisseur"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "MatierePremiere_nom_key" ON "MatierePremiere"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "_FournisseurToMatierePremiere_AB_unique" ON "_FournisseurToMatierePremiere"("A", "B");

-- CreateIndex
CREATE INDEX "_FournisseurToMatierePremiere_B_index" ON "_FournisseurToMatierePremiere"("B");

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livraison" ADD CONSTRAINT "Livraison_commnadeId_fkey" FOREIGN KEY ("commnadeId") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ligneCommande" ADD CONSTRAINT "ligneCommande_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ligneCommande" ADD CONSTRAINT "ligneCommande_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FournisseurToMatierePremiere" ADD CONSTRAINT "_FournisseurToMatierePremiere_A_fkey" FOREIGN KEY ("A") REFERENCES "Fournisseur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FournisseurToMatierePremiere" ADD CONSTRAINT "_FournisseurToMatierePremiere_B_fkey" FOREIGN KEY ("B") REFERENCES "MatierePremiere"("id") ON DELETE CASCADE ON UPDATE CASCADE;
