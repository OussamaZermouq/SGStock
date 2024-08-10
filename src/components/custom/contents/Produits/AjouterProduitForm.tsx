"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ajouterProduit,
  getCategories,
  getMatieresDispo,
} from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  nomProduit: z.string().min(2, {
    message: "Le nom du produit doit avoir au moins 2 caractères.",
  }),
  codeProduit: z.string({
    required_error: "Le code du produit est requis.",
  }),
  prixProduit: z.number({
    coerce: true,
    required_error: "Le prix du produit est requis.",
  }),
  quantiteeProduit: z.number({
    coerce: true,
    required_error: "La quantité du produit est requise.",
  }),
  noteProduit: z.string({
    required_error: "La note du produit est requise.",
  }),
  categorieId: z.string({
    required_error: "La catégorie du produit est requise.",
  }),
});

export default function AjouterClientSocieteForm() {
  const { toast } = useToast();
  const [resource, setResource] = React.useState();
  const [imageUploaded, setImageUploaded] = React.useState(null);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [matieres, setMatieres] = React.useState<any[]>([]);
  const [matiereP, setMatiereP] = React.useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomProduit: "",
      codeProduit: "",
      prixProduit: 0,
      quantiteeProduit: 0,
      noteProduit: "",
      categorieId: "",
    },
  });

  React.useEffect(() => {
    const fetchCategories = async () => {
      const out = await getCategories();
      const mp = await getMatieresDispo();
      setCategories(out);
      setMatieres(mp);
      console.log(mp);
    };
    fetchCategories();
  }, []);

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setMatiereP([...matiereP, { id, quantity: 1 }]);
    } else {
      setMatiereP(matiereP.filter((item) => item.id !== id));
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setMatiereP(
      matiereP.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      matiereP,
    };
    console.log("Form values:", formData);
    try {
      let response;
      if (resource) {
        response = await ajouterProduit(formData, resource.public_id);
      } else {
        response = await ajouterProduit(formData);
      }
      if (response.success) {
        toast({
          title: "Succès",
          description: "Produit ajouté avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: response.message || "Erreur lors de l'ajout du Produit",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de l'ajout du Produit",
      });
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col border-2 drop-shadow-4xl rounded-xl p-2 bg-gradient-to-b from-zinc-900 border-zinc-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4 mx-9">
            <FormField
              control={form.control}
              name="codeProduit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Produit</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative">
              <p className="text-sm">Image Produit (Optionnel)</p>
              <div className="absolute inset-x-0 bottom-0">
                <CldUploadWidget
                  uploadPreset="SGStock"
                  onSuccess={(result, { widget }) => {
                    setImageUploaded(true);
                    setResource(result?.info);
                    widget.close();
                  }}
                >
                  {({ open }) => {
                    function handleOnClick() {
                      setResource(undefined);
                      open();
                    }
                    return (
                      <Button variant={"secondary"} onClick={handleOnClick}>Upload an Image</Button>
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>
            <FormField
              control={form.control}
              name="nomProduit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom Produit</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prixProduit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix Produit</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantiteeProduit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantitee Produit</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categorieId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorie Produit</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectioner une categorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="noteProduit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrption Produit</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="col-span-2" />
            <div className="flex flex-col space-y-5 ">

              <div >
                <div className="mb-4">
                  <FormLabel className="text-base">Matiere Premiere</FormLabel>
                  <FormDescription>
                  Préciser les éléments utilisés pour la fabrication de ce produit

                  </FormDescription>
                </div>
                {matieres.map((matiere) => {
                  const item = matiereP.find((item) => item.id === matiere.id);
                  return (
                    <div
                      key={matiere.id}
                      className="grid grid-cols-3 gap-1 w-80 justify-center content-center my-7"
                    >
                      <Checkbox
                      className="self-center"
                        checked={!!item}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(matiere.id, checked)
                        }
                      />
                      <FormLabel className="font-normal self-center">
                        {matiere.nom}
                      </FormLabel>
                      {item && (
                        <Input
                          className="self-center fquantity-input "
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10);
                            handleQuantityChange(matiere.id, newQuantity);
                          }}
                          min="1"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-12 px-12">
            <Button type="submit" className="w-32 justify-end">
              Ajouter Produit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
