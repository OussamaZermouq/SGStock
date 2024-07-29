-- CreateTable
CREATE TABLE "_MatierePremiereToProduit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MatierePremiereToProduit_AB_unique" ON "_MatierePremiereToProduit"("A", "B");

-- CreateIndex
CREATE INDEX "_MatierePremiereToProduit_B_index" ON "_MatierePremiereToProduit"("B");

-- AddForeignKey
ALTER TABLE "_MatierePremiereToProduit" ADD CONSTRAINT "_MatierePremiereToProduit_A_fkey" FOREIGN KEY ("A") REFERENCES "MatierePremiere"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatierePremiereToProduit" ADD CONSTRAINT "_MatierePremiereToProduit_B_fkey" FOREIGN KEY ("B") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
