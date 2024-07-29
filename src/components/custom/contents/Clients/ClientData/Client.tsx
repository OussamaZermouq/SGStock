"use client";

import { ClientType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteClient } from "@/actions/actions";
import { Badge } from "@/components/ui/badge";
import DialogComponent from "@/components/custom/Dialogs/DialogComponentClient";
export type Client = {
  id: number;
  nom: string | null;
  adresse: string;
  email: string;
  telephone: string;
  webSite: string | null;
  city: string | null;
  type: ClientType;
  ICE: string | null;
};

export const columns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "adresse",
    header: "Adresse",
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
    accessorKey: "webSite",
    header: "Site Web",
  },
  {
    accessorKey: "type",
    header: "Societe / Commune",
    cell: ({ row }) => {
      const type:any = row.getValue("type");
      return <Badge>{type}</Badge>;
    },
  },
  {
    accessorKey: "ICE",
    header: "ICE",
  },
  {
    accessorKey: "city",
    header: "Ville",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return(
        <DialogComponent row={row}/>
      )
    },
  },
];
