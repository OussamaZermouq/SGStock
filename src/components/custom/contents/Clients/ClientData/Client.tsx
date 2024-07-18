"use client";

import { ClientType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteClient } from "@/actions/actions";
export type Client = {
  nom: string | null;
  adresse: string;
  email: string;
  telephone: string;
  webSite: string | null;
  city: string | null;
  type: ClientType;
  ICE: string | null;
};

async function onDeleteClient(email: string) {
  deleteClient(email);
}

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
      const client = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel> Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(client.email)}
              >
                {<ContentPasteIcon fontSize="small" className="mr-2" />} Copy
                email client
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {<EditIcon className="mr-2" />} Modifier Client
              </DropdownMenuItem>

              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <small className="text-sm font-medium leading-none text-red-600">
                    {<DeleteForeverIcon className="mr-2" color="danger" />}{" "}
                    Supprimer client
                  </small>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Suppression du client</DialogTitle>
              <DialogDescription className="flex-row">
                Voulez vous vraiment supprimer ce client? 
                <span className="text-red-600">La suppression de ce client supprimera également toutes les commandes qui lui sont associées!</span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Client :
                </Label>
                <Label htmlFor="username" className="text-right">
                  {client.nom}
                </Label>
            </div>
            </div>
            <DialogFooter>
              <Button onClick={()=>{onDeleteClient(client.email)}} variant={'destructive'}>Confirmer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
