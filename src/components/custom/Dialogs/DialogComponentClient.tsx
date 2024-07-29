"use client";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { deleteClient } from "@/actions/actions";
import { useRouter } from "next/navigation";

async function onDeleteClient(email: string) {
  const resp = await deleteClient(email);
  //please god forgive me for i have sinned to the lord i am only a humain.
  if (resp.success) {
    window.location.reload();
  }
}

export default function DialogComponent(props: any) {
  const client = props.row.original;
  const router = useRouter();
  const hanldeUpdateClick = () => {
    console.log("test")
    router.push(`/Clients/modifierClient/${client.id}`);
  };
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
            {<ContentPasteIcon fontSize="small" className="mr-2" />} Copy email
            client
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={hanldeUpdateClick}
          >
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
            <span className="text-red-600">
              La suppression de ce client supprimera également toutes les
              commandes qui lui sont associées!
            </span>
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
          <Button
            onClick={() => {
              onDeleteClient(client.email);
            }}
            variant={"destructive"}
          >
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
