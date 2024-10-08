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
import HideImageIcon from "@mui/icons-material/HideImage";
import { ImageOff } from "lucide-react";

export type Commande = {
  id: number;
  codeCommande: string | null;
  status: string;
  client: Client | null;
  livraison: Livraison;
  produits: Produit[];
  dateCommande: Date;
};
function ResolveClient(clientId: number) {
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
      const ligneCommande: any[] = row.getValue("produits");

      return (
        <div className="grid grid-cols-2 gap-1">
          {ligneCommande.map((lc, index) => {
            if (lc.produit.imageProduit) {
              return (
                <CldImage
                  key={index}
                  className="rounded-lg shadow-md"
                  width="50"
                  height="50"
                  src={lc.produit.imageProduit}
                  alt="Image Produit"
                />
              );
            } else {
              return(
              <div key={index}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <ImageOff className="text-5xl" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Aucune photo pour ce produit</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>)
            }
          })}
        </div>
      );
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
    cell: ({ row }) => <Badge>{ResolveClient(row.getValue("clientId"))}</Badge>,
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
