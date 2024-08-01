import * as React from "react";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Edit from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ModifierMatierePremiereForm from "../MatierePremiereModifierForm";
import { deleteCategorie, deleteMatiere } from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";

export default function MatieresPremieresListActions(props: any) {
  const { toast } = useToast();
  async function onDeleteClick(id: number) {
    const out = await deleteMatiere(id);
    if (out.success) {
      window.location.reload();
      toast({
        title: "Succès",
        description: "Matiere supprimé avec succès",
      });
    }
    else{
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Erreur lors de la suppression de la matiere",
      });
    }

  }

  return (
    <div className="flex space-x-4">
      <Dialog>
        <DialogTrigger>{<DeleteForever />}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Etes vous sure?</DialogTitle>
            <DialogDescription>
              Voulez vous vraiment supprimer cette matiere
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="destructive" onClick={()=>{onDeleteClick(props.row.getValue('id'))}}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Drawer>
        <DrawerTrigger>{<Edit />}</DrawerTrigger>
        <DrawerContent className="flex justify-center content-center">
          <DrawerHeader>
            <DrawerTitle>Modifier cette matiere</DrawerTitle>
            <DrawerDescription>
              <ModifierMatierePremiereForm matiere={props.row} />
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
