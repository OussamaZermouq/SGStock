"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Client, Produit } from "@prisma/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ajouterCommande, getClients, getProduits } from "@/actions/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ProduitCard from "../Produits/ProduitCard";
import CommmandeProduitOverviewTable from "./CommandeProduitOverviewTable";
import AjouterProduitDialog from "./AjouterProduitDialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { DatePickerWithPresets } from "@/components/ui/DatePicker";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
const formSchema = z.object({
  dateCommande: z.date({
    required_error: "Veuillez specifier la date de la commande",
  }),
  codeCommande: z.string().nonempty({
    message:"Veuillez specifier le code de la commande"
  }),
  clientId: z.string().nonempty({
    message: "Veuillez specifier le client",
  }),
  status: z.string().nonempty({
    message: "Veuillez specifier le status de la commande",
  }),
  dateLivraison: z.date().optional(),
  statusLivraison: z.string().optional(),
});

export default function AjouterCommandeForm() {
  const [client, setClient] = useState<Client[] | null>();
  const [livraisonEnabled, setLivraisonEnabled] = useState<Boolean>(false);
  const [qteCommande, setQteCommande] = useState();
  const { toast } = useToast();

  function handleDataFromProductTable(data: any) {
    setQteCommande(data);
  }
  //
  const [selectedProducts, setSelectedProducts] = useState<any[]>();
  function handleDataFromChild(data: any) {
    setSelectedProducts(data);
  }

  //
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codeCommande: undefined,
      dateCommande: undefined,
      clientId: undefined,
      status: undefined,
      dateLivraison: undefined,
      statusLivraison: undefined,
    },
  });

  function switchLivraison() {
    setLivraisonEnabled(!livraisonEnabled);
  }

  useEffect(() => {
    const fetchData = async () => {
      const clientData = await getClients();
      setClient(clientData);
    };
    fetchData();
  }, []);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    let output;
    if (!livraisonEnabled) {
      delete values.dateLivraison;
      delete values.statusLivraison;
      output = await ajouterCommande({...values,qteCommande});
    } 
    else {
      if (values.dateLivraison && values.statusLivraison) {
        output = await ajouterCommande({...values,qteCommande});
        return
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in the date and status of delivery",
      });
    }
    if (output?.success){
      toast({
        title: "Succès",
        description: "La commande a ete cree",
      });
    }
    else{
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produit",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 shadow-xl p-5 rounded-xl">
          <h4 className="font-bold">Information Commande</h4>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="codeCommande"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Commande</FormLabel>
                  <FormControl>
                    <Input placeholder="CMD-XXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateCommande"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2 self-end">
                  <FormLabel className="mb-1">Date Commande</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>Veuillez choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="List client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Commune</SelectLabel>
                        {/* i hate mapping twice on the same array object but i can use this while i think of a better way for it  */}
                        {client &&
                          client.map((map) => {
                            if (map.type == "Commune") {
                              return (
                                <SelectItem
                                  key={map.id}
                                  value={map.id.toString()}
                                >
                                  {map.nom}
                                </SelectItem>
                              );
                            }
                          })}
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>Societe</SelectLabel>
                        {client &&
                          client.map((map) => {
                            if (map.type == "Societe") {
                              return (
                                <SelectItem
                                  key={map.id}
                                  value={map.id.toString()}
                                >
                                  {map.nom}
                                </SelectItem>
                              );
                            }
                          })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Commande</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Specifier le status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Annule">Annule</SelectItem>
                      <SelectItem value="EnLivraison">
                        En cours de livraison
                      </SelectItem>
                      <SelectItem value="Complet">Complet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="col-span-2 my-5" />
            <h4 className="font-bold col-span-2">Information Produit</h4>
            <div className="grid col-span-2">
              <div className="flex flex-col justify-start">
                <CommmandeProduitOverviewTable
                  selectedProducts={selectedProducts}
                  onQuantitiesChange={handleDataFromProductTable}
                />
                <AjouterProduitDialog sendDataToParent={handleDataFromChild} />
              </div>
            </div>
            <Separator className="col-span-2 my-5" />
            <h4 className="font-bold col-span-2">Information Livraison</h4>
            <div className="col-span-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="airplane-mode"
                  checked={livraisonEnabled}
                  onCheckedChange={switchLivraison}
                />
                <Label htmlFor="airplane-mode">
                  Livraison pour cette commande
                </Label>
              </div>
            </div>

            <FormField
              control={form.control}
              name="dateLivraison"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2 self-end">
                  <FormLabel className="mb-1">Date Livraison</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={!livraisonEnabled}
                          variant={"outline"}
                          className={cn(
                            "text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>Veuillez choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statusLivraison"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Livraison</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Specifier le status de livraison" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Annule">Annule</SelectItem>
                      <SelectItem value="EnAttenteConfirmation">
                        En attent de confirmation
                      </SelectItem>
                      <SelectItem value="EnLivraison">
                        En cours de livraison
                      </SelectItem>
                      <SelectItem value="Complet">Livre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h6 className="muted">
                <p className="text-sm text-muted-foreground">
                  <HelpOutlineIcon /> L`&apos;`adresse de la livraison sera
                  automatiquement associee avec l`&apos;`adresse du client.
                </p>
              </h6>
            </div>
          </div>
          <div className="flex justify-end mt-12 px-12">
            <Button type="submit" className="w-fit justify-end">
              Ajouter Commande
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
