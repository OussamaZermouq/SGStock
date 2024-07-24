"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
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
import AjouterCategorieForm from "../AjouterCategorieForm";
import ModifierCategorieForm from "../ModifierCategorieForm";
import { deleteCategorie } from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";
export type Categorie = {
  id: number;
  nom: string;
  description: string;
};

export async function onDeleteClick(id:number){
  const {toast} = useToast();
  const out = await deleteCategorie(id);
  if (out.success){
    window.location.reload();
  }
  toast({
    title: "Succès",
    description: "Categorie supprimé avec succès",
  });
}
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
        <div className="flex space-x-4">
          <Dialog>
            <DialogTrigger>{<DeleteForever />}</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Etes vous sure?</DialogTitle>
                <DialogDescription>
                  Voulez vous vraiment supprimer cette categorie
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <Button type="button" variant="destructive" >
                  Confirmer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Drawer>
            <DrawerTrigger>
              {<Edit />}
            </DrawerTrigger>
            <DrawerContent className="flex justify-center content-center">
              <DrawerHeader>
                <DrawerTitle>Modifier cette categorie</DrawerTitle>
                <DrawerDescription>
                  <ModifierCategorieForm categorie={row}/>
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
      );
    },
  },
];



// <div className="mx-auto w-full max-w-sm">
//           <DrawerHeader>
//             <DrawerTitle>Move Goal</DrawerTitle>
//             <DrawerDescription>Set your daily activity goal.</DrawerDescription>
//           </DrawerHeader>
//           <div className="p-4 pb-0">
//             <div className="flex items-center justify-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 shrink-0 rounded-full"
//                 onClick={() => onClick(-10)}
//                 disabled={goal <= 200}
//               >
//                 <MinusIcon className="h-4 w-4" />
//                 <span className="sr-only">Decrease</span>
//               </Button>
//               <div className="flex-1 text-center">
//                 <div className="text-7xl font-bold tracking-tighter">
//                   {goal}
//                 </div>
//                 <div className="text-[0.70rem] uppercase text-muted-foreground">
//                   Calories/day
//                 </div>
//               </div>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 shrink-0 rounded-full"
//                 onClick={() => onClick(10)}
//                 disabled={goal >= 400}
//               >
//                 <PlusIcon className="h-4 w-4" />
//                 <span className="sr-only">Increase</span>
//               </Button>
//             </div>
//             <div className="mt-3 h-[120px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={data}>
//                   <Bar
//                     dataKey="goal"
//                     style={
//                       {
//                         fill: "hsl(var(--foreground))",
//                         opacity: 0.9,
//                       } as React.CSSProperties
//                     }
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//           <DrawerFooter>
//             <Button>Submit</Button>
//             <DrawerClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>