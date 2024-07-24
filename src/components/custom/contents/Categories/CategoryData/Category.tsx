"use client";
import { ColumnDef } from "@tanstack/react-table";
import AjouterCategorieForm from "../AjouterCategorieForm";
import CategorieListActions from "../Actions/CategorieListActions";
export type Categorie = {
  id: number;
  nom: string;
  description: string;
};

export const columns: ColumnDef<Categorie>[] = [
  {
    accessorKey: "id",
    header: "Id category",
    enableResizing: true,
    size: 10,
  },
  {
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <CategorieListActions row={row}/>
      );
    },
  },
];
