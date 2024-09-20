"use client";
import { ColumnDef } from "@tanstack/react-table";
import FournisseurListActions from "../../Categories/Actions/FournisseurListActions";


export type Fournisseur = {
    id: number;
    nom: string;
    telephpone:string,
    email:string,
    adresse:string,
}

export const columns: ColumnDef<Fournisseur>[] = [
    {
      accessorKey: "id",
      header: "id",
    },
    
    {
      accessorKey: "nom",
      header: "Nom Fournisseur",
    },
    {
      accessorKey: "telephone",
      header: "Telephone",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "adresse",
      header: "Adresse",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return(
            <FournisseurListActions row={row}/>
        )
      },
    },
  ];
  