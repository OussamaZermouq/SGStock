-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "codeProduit" TEXT NOT NULL,
    "nomProduit" TEXT NOT NULL,
    "prixProduit" INTEGER NOT NULL,
    "quantiteProduit" INTEGER NOT NULL,
    "noteProduit" TEXT,
    "imageProduit" TEXT,
    "categorieId" INTEGER NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
