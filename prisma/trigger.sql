--BEGIN TRIGGER CODE
CREATE OR REPLACE FUNCTION update_matiere_premiere_quantity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "MatierePremiere"
  SET "quantiteeMatiere" = "quantiteeMatiere" + NEW.quantitee
  WHERE "id" = NEW."matierePremiereId";

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER quantityMatierePremiere
AFTER INSERT OR UPDATE ON "FournisseurMatierePremiere"
FOR EACH ROW
EXECUTE FUNCTION update_matiere_premiere_quantity();

--

CREATE OR REPLACE FUNCTION restore_quantity_matiere_premiere()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "MatierePremiere"
  SET "quantiteeMatiere" = "quantiteeMatiere" + OLD."quantitee"
  WHERE "id" = OLD."matiereId";

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER restoreQuantityMatierePremiere
  AFTER DELETE ON "ProduitMatiere"
  FOR EACH ROW
  EXECUTE FUNCTION restore_quantity_matiere_premiere();



ALTER TABLE "FournisseurMatierePremiere"
ENABLE TRIGGER quantityMatierePremiere

--END TRIGGER CODE

--BEGIN CONSTRAINT CHECK CODE
ALTER TABLE public."MatierePremiere"
ADD CONSTRAINT "QUANNTITYCHECK" CHECK ("quantiteeMatiere">=0)
--END CONSTRAITN CHECK CODE




--BEGIN TESTS
Insert into "FournisseurMatierePremiere" values (2,6,50)


SELECT * FROM "MatierePremiere"

--END TESTS

