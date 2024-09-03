import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function CommmandeProduitOverviewTable(
  props: any
) {
  const { selectedProducts, onQuantitiesChange } = props;
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const newQuantities = { ...quantities };
    if (selectedProducts) {
      selectedProducts.forEach((prod: any) => {
        if (newQuantities[prod.id] === undefined) {
          newQuantities[prod.id] = prod.orderedQuantity || 1;
        }
      });
    }

    setQuantities(newQuantities);
  }, [selectedProducts]);


  useEffect(() => {
    onQuantitiesChange(quantities);
  }, [quantities, onQuantitiesChange]);

  function handleValueChange(e: any, prodId: string) {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [prodId]: parseInt(e.target.value),
    }));
  }

  return (
    <Table className="border-slate-900 border-solid rounded-xl">
      <TableCaption>List de tous les produits dans cette commande</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Code Produit</TableHead>
          <TableHead>Nom Produit</TableHead>
          <TableHead>Quantitee Stock</TableHead>
          <TableHead>Prix unitaire</TableHead>
          <TableHead className="w-[200px]">Quantitee Commande</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedProducts &&
          selectedProducts.map((prod: any) => (
            <TableRow key={prod.id}>
              <TableCell className="font-medium">{prod.codeProduit}</TableCell>
              <TableCell>{prod.nomProduit}</TableCell>
              <TableCell>{prod.quantiteProduit}</TableCell>
              <TableCell>{prod.prixProduit} MAD</TableCell>
              <TableCell className="w-[200px]">
                <Input
                  type="number"
                  min={1}
                  value={quantities[prod.id] || 1} // Fallback to 1 if undefined
                  onChange={(e) => handleValueChange(e, prod.id)}
                  max={prod.quantiteProduit}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}