"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Client, ligneCommande, Livraison, Produit } from "@prisma/client";
import { getClientById } from "@/actions/actions";
import { useEffect, useState } from "react";
import CommandeListActions from "../Actions/CommandeActionsList";
import { CldImage } from "next-cloudinary";
export type Commande = {
  id: number;
  codeCommande: string | null;
  status: string;
  client: Client | null;
  livraison: Livraison;
  produits: Produit[];
  dateCommande: Date;
};
function resolveClient(clientId: number) {
  const [client, setClient] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getClientById(clientId);
        if (result) {
          setClient(result.nom);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return client;
}
export const columns: ColumnDef<Produit>[] = [
  {
    accessorKey: "id",
    header: "ID Commande",
  },
  {
    accessorKey: "code",
    header: "Code Commande",
  },
  {
    accessorKey: "status",
    header: "Status Commande",
  },
  {
    accessorKey: "produits",
    id: "produits",
    header: "Produits",
    cell: ({ row }) => {
        const ligneCommande:any[] = row.getValue('produits');

        return (
        <div className="grid grid-cols-2 gap-1">
            {ligneCommande.map((lc)=>(
                <CldImage
                className="rounded-lg shadow-md"
                width="50"
                height="50"
                src={lc.produit.imageProduit}
                alt="Image Produit"
                />
            ))}
        </div>
      );
      //   return row.getValue("produits").map((prod) => {

      //   });
    },
  },
  {
    accessorKey: "livraison",
    header: "Status Livraison",
    cell: ({ row }) => (
      <>
        {" "}
        {row.getValue("livraison") ? (
          row.getValue("livraison").status
        ) : (
          <p> Livraison non active</p>
        )}{" "}
      </>
    ),
  },
  {
    accessorKey: "clientId",
    header: "Client",
    cell: ({ row }) => <Badge>{resolveClient(row.getValue("clientId"))}</Badge>,
  },
  {
    accessorKey: "dateCommande",
    header: "Date",
    cell: ({ row }) => {
      return (
        <p suppressHydrationWarning>
          {row.getValue("dateCommande").toLocaleDateString()}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <CommandeListActions row={row} />;
    },
  },
];
