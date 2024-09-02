import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { getProduits } from "@/actions/actions";
import { Produit } from "@prisma/client";
import ProduitCard from "../Produits/ProduitCard";


interface AjouterProduitDialogProps {
  sendDataToParent: (data: any) => void;
  preSelectedProducts?: any[];
}

const AjouterProduitDialog: React.FC<AjouterProduitDialogProps> = ({
  sendDataToParent,
  preSelectedProducts,
}) => {
  const [produits, setProduits] = useState<Produit[] | null>(null);
  const [originalProducts, setOriginalProducts] = useState<Produit[] | null>(
    null
  );


  const [selectedProducts, setSelectedProducts] = useState<Produit[]>([]);
  const [search, setSearch] = useState("");
  // variable isSelected should be called isNotSelected
  const handleCheckboxChange = (produit: Produit, isSelected: boolean) => {
    if (isSelected) {
      if (selectedProducts){
        setSelectedProducts((prev) => [...prev, produit]);

      }
      
      setSelectedProducts((prev) => [produit]);
    } else {
      setSelectedProducts((prev) =>
        prev.filter((selectedProduct) => selectedProduct.id !== produit.id)
      );
    }
  };

  useEffect(() => {
    setSelectedProducts(preSelectedProducts)
    const fetchData = async () => {
      const produitData = await getProduits();
      setProduits(produitData);
      setOriginalProducts(produitData);
    };
    fetchData();
  }, [preSelectedProducts]);

  function handleValueInputSearchChange(e: any) {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    if (searchValue === "") {
      setProduits(originalProducts);
      return;
    }

    const filteredProduits = originalProducts?.filter((prod) =>
      prod.nomProduit.toLowerCase().startsWith(searchValue)
    );
    setProduits(filteredProduits);
  }
  function handleClick() {
    sendDataToParent(selectedProducts);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="w-fit self-center mt-5">
          {" "}
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>Ajouter des produits</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-3 gap-4 pt-10">
              <div>
                <Input
                  className="shadow-lg"
                  placeholder="Chercher un produit"
                  onChange={handleValueInputSearchChange}
                  value={search}
                />
              </div>
              <div className="col-span-2">
                {produits &&
                  produits.map((prod) => (
                    <ProduitCard
                      produit={{
                        ...prod,
                        isSelected:
                          selectedProducts?.some(
                            (selectedProduct) => selectedProduct.id === prod.id
                          ) 
                      }}
                      key={prod.id}
                      onCheckBoxChange={handleCheckboxChange}
                    />
                  ))}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"} onClick={handleClick}>
              Confirmer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AjouterProduitDialog;
