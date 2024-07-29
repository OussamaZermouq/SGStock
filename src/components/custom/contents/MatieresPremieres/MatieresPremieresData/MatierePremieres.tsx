"use client";

import { ClientType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteClient } from "@/actions/actions";
import { Badge } from "@/components/ui/badge";
import DialogComponent from "@/components/custom/Dialogs/DialogComponentClient";
import { Fournisseur } from "../../Fournisseurs/FournisseurData/Fournisseur";
import MatieresPremieresListActions from "../Actions/MatierePremiereListActions";
export type MatieresPremieres = {
  id: number;
  nom: string | null;
  quantitee: number;
  fournisseur: Fournisseur;
};


export const columns: ColumnDef<MatieresPremieres>[] = [
  {
    accessorKey: "id",
    header: "Id Matiere",
  },
  {
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "quantitee",
    header: "Quantitee",
  },
  {
    accessorKey: "unite",
    header: "Unite",
  },
  {
    accessorKey: "fournisseurs",
    header: "Fournisseur",
    cell: ({ row }) => {
      const fournisseurs: Fournisseur[] = row.getValue("fournisseurs");
      return (
        <div>
          {fournisseurs.map((f, index) => (
            <Badge key={index}>{f.nom}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <MatieresPremieresListActions row={row} />;
    },
  },
];
