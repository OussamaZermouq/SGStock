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

export type Commande = {
    id: number;
    codeCommande: string | null;
    status: string;
    client: Client | null;
    livraison: Livraison;
    commandeProduit: ligneCommande
};

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
        accessorKey: "livraison",
        header: "Status Livraison",
        cell: ({row})=><> {row.getValue('livraison').status}</>
    },
    {
        accessorKey: "quantiteProduit",
        header: "Quantitee",
        cell: ({ row }) => <Badge>{row.getValue("quantiteProduit")}</Badge>,
    },
];
