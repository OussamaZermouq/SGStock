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
import { useReducer, useState } from "react";

export default function ProduitCommandeDetailsPreviewTable(produits: any) {
  // Calculate total outside the map
  let calculatedTotal = 0;
  produits.produits.forEach((prod) => {
    calculatedTotal += parseFloat(prod.produit.prixProduit * prod.quantite);
  });

  return (
    <>
      <Table>
        <TableCaption>
          Liste des produits present dans cette commande.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Code Produit</TableHead>
            <TableHead className="w-1/5">Nom Produit</TableHead>
            <TableHead className="w-1/5">Prix unitaire</TableHead>
            <TableHead className="text-center w-1/5">Qte Stock</TableHead>
            <TableHead className="text-right w-1/5">Prix Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produits.produits.map((prod: any) => {
            return (
              <TableRow key={prod.produit.id}>
                <TableCell className="font-medium w-1/5">
                  {prod.produit.codeProduit}
                </TableCell>
                <TableCell className="font-medium w-1/5">
                  {prod.produit.nomProduit}
                </TableCell>
                <TableCell className="w-1/5">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "MAD",
                  }).format(parseFloat(prod.produit.prixProduit))}
                </TableCell>
                <TableCell className="text-center w-1/5">
                  {prod.produit.quantiteProduit}
                </TableCell>
                <TableCell className="text-right w-1/5">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "MAD",
                  }).format(
                    parseFloat(prod.produit.prixProduit * prod.quantite)
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total Commande</TableCell>
            <TableCell className="text-right font-extrabold">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "MAD",
              }).format(parseFloat(calculatedTotal))}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
