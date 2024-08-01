"use client";

import { useState, useEffect } from "react";
import { ClientType, FournisseurMatierePremiere } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteClient, getFrounisseursById } from "@/actions/actions";
import { Badge } from "@/components/ui/badge";
import DialogComponent from "@/components/custom/Dialogs/DialogComponentClient";
import { Fournisseur } from "../../Fournisseurs/FournisseurData/Fournisseur";
import MatieresPremieresListActions from "../Actions/MatierePremiereListActions";
import AddIcon from "@mui/icons-material/Add";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MatierePremiereFournisseurModifierForm from "../MatierePremiereFournisseurModifierForm";
import AjouterFournisseurMatiereForm from "../ajouterFournisseurMatiereForm";

export type MatieresPremieres = {
  id: number;
  nom: string | null;
  quantitee: number;
  fournisseur: Fournisseur;
  FournisseurMatierePremiere: FournisseurMatierePremiere[];
};

export function useFournisseur(id: number) {
  const [nom, setNom] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFournisseur() {
      const nomFournisseur = await getFrounisseursById(id);
      setNom(nomFournisseur || "Unknown");
    }
    fetchFournisseur();
  }, [id]);

  return nom;
}

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
    id: "FournisseurMatierePremiere",
    accessorKey: "FournisseurMatierePremiere",
    header: "Quantitee",
    cell: ({ row }) => {
      const linkData: FournisseurMatierePremiere[] =
        row.getValue("fournisseurs");
      let sum = 0;
      {
        linkData.map((item) => (sum += item.quantitee));
      }
      return (
        <div>
          <Badge color="success">{sum}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "unite",
    header: "Unite",
  },
  {
    accessorKey: "fournisseurs",
    header: "Fournisseur",
    cell: ({ row }) => {
      const linkData: FournisseurMatierePremiere[] =
        row.getValue("fournisseurs");
      return (
        <div className="flex gap-2">
          {linkData.map((item, index) => (
            <Popover key={index}>
              <PopoverTrigger>
                <Badge key={index}>{useFournisseur(item.fournisseurId)}</Badge>
              </PopoverTrigger>
              <MatierePremiereFournisseurModifierForm row={item} />
            </Popover>
          ))}
          <Popover>
            <PopoverTrigger>
              <Badge variant={"outline"}>
                <AddIcon className="size-5" />
              </Badge>
            </PopoverTrigger>
            <AjouterFournisseurMatiereForm row={row}/>
          </Popover>
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
