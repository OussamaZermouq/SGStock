"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Categorie } from "../../Categories/CategoryData/Category";
import { MatieresPremieres } from "../../MatieresPremieres/MatieresPremieresData/MatierePremieres";
import { CldImage } from "next-cloudinary";
import HideImageIcon from "@mui/icons-material/HideImage";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import ProduitListActions from "../Actions/ProduitListActions";

export type Produit = {
    id: number;
    codeProduit: string | null;
    nomProduit: string | null;
    prixProduit: number;
    quantiteProduit: number;
    noteProduit: string;
    imageProduit: string;
    categorieProduit: Categorie;
    dateCreation: Date;
    matierePremiere: MatieresPremieres;
};

export const columns: ColumnDef<Produit>[] = [
    
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "id",
        header: "ID Produit",
    },
    {
        accessorKey: "codeProduit",
        header: "Code Produit",
    },
    {
        accessorKey: "nomProduit",
        header: "Nom Produit",
    },

    {
        accessorKey: "prixProduit",
        header: "Prix Produit",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("prixProduit"));
            const formatted = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "MAD",
            }).format(amount);

            return <div className="text-left font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "quantiteProduit",
        header: "Quantitee",
        cell: ({ row }) => <Badge>{row.getValue("quantiteProduit")}</Badge>,
    },
    {
        accessorKey: "noteProduit",
        header: "Description",
    },
    {
        accessorKey: "imageProduit",
        header: "Image",
        cell: ({ row }) => {
            if (row.getValue("imageProduit")) {
                return (
                    <CldImage
                    className="rounded-xl"
                        width="60"
                        height="60"
                        src={row.getValue("imageProduit")}
                        sizes="20vw"
                        alt={row.getValue("nomProduit")}
                    />
                );
            } else {
                return (
                    <div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HideImageIcon
                                        className="text-5xl"
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Aucune photo pour ce produit</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                );
            }
        },
    },
    {
        accessorKey: "categorieProduit",
        header: "Categorie",
        cell: ({ row }) => {
            const categorie = row.getValue("categorieProduit");
            return <Badge>{categorie.nom}</Badge>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date d'ajout",
        cell: ({ row }) => {
            return (
                <p suppressHydrationWarning>
                    {row.getValue("createdAt").toLocaleDateString()}
                </p>
            );
        },
    },
    {
        id: "actions",
        header:"Actions",
        cell: ({ row }) => {
          return <ProduitListActions row={row} />;
        },
    }
];
