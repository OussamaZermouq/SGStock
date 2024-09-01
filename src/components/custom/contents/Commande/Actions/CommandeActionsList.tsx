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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button } from "@/components/ui/button";
import {
  deleteCategorie,
  deleteMatiere,
  deleteProduit,
  getClientById,
} from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";
import ModifierCommandeForm from "../ModifierCommandeForm";
import { Client } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, Cross, X } from "lucide-react";
import { DataTable } from "../../common/DataTable";
import { columns } from "../../Produits/ProduitData/Produit";
import ProduitCommandeDetailsPreviewTable from "../ProduitCommandeDetailsPreviewTable";
import { useRouter } from "next/navigation";

export default function CommandeListActions(props: any) {
  const { toast } = useToast();
  const router = useRouter();
  const [client, setClient] = React.useState<Client>();
  React.useEffect(() => {
    const fetchClient = async () => {
      await getClientById(parseInt(props.row.getValue("clientId"))).then(
        (client) => {
          setClient(client);
        }
      );
    };
    fetchClient();
  }, [props.row.getValue("clientId")]);
  

  return (
    <div className="flex space-x-4">
      
      <div>
        <Dialog>
          <DialogTrigger>{<RemoveRedEyeIcon />}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{props.row.getValue("code")}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="size-fit w-[1000px]">
              <div className="flex flex-col gap-3">
                <div className="text-muted-foreground">
                  <p> Detail Commande </p>
                </div>
                <div className="grid grid-cols-2 gap-3 shadow-md border-solid border-2  rounded-lg p-3 py-5">
                  <div>Code Commande</div>
                  <div>{props.row.getValue("code")}</div>
                  <Separator className="col-span-2" />
                  <div>Client</div>
                  <div>{client?.nom}</div>
                  <Separator className="col-span-2" />
                  <div>Date Commande</div>
                  <div>
                    {props.row.getValue("dateCommande").toLocaleDateString()}
                  </div>

                  <Separator className="col-span-2" />
                  <div>Status Commande</div>
                  <div>{props.row.getValue("status")}</div>
                </div>
                <div className="text-muted-foreground">
                  <p> Detail Livraison </p>
                </div>
                {props.row.getValue("livraison") ? (
                  <div className="grid grid-cols-2 gap-3 shadow-md border-solid border-2  rounded-lg p-3">
                    <div>Livraison</div>
                    <div>
                      <Badge className="flex flex-row w-fit gap-2 bg-green-500">
                        <div>Active</div>
                        <div>
                          <Check
                            size={15}
                            className="rounded-xl border-2 border-solid"
                          />
                        </div>
                      </Badge>
                    </div>
                    <div>Status Livraison</div>
                    <div>{props.row.getValue("livraison").status}</div>
                    <Separator className="col-span-2" />
                    <div>Adresse Livraison</div>
                    <div>{client?.adresse}</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 shadow-md border-solid border-2  rounded-lg p-3">
                    <div>Livraison</div>
                    <div>
                      <Badge className="flex flex-row w-fit gap-2 bg-red-500">
                        <div>Desactive</div>
                        <div>
                          <X
                            size={15}
                            className="rounded-xl border-2 border-solid"
                          />
                        </div>
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
              <div className="my-5">
                <p className="text-muted-foreground">
                    Detail Produits
                </p>
              </div>
              <div className="border rounded-xl">
              <ProduitCommandeDetailsPreviewTable produits={props.row.getValue('produits')}/>

              </div>
            </div>
            <DialogFooter className="sm:justify-end">
                <Button onClick={()=>{router.push(`/Commande/Modifiercommande/${props.row.getValue("id")}`)}}>Modifier Commande</Button>
                <Button variant={'destructive'}>Supprimer Commande</Button>

            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
