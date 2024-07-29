"use client";
import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
import { ajouterMatiere, getFrounisseurs } from "@/actions/actions";
import { Fournisseur } from "@prisma/client";

const formSchema = z.object({
  nom: z.string().min(2, {
    message: "Le nom de la matiere doit avoir au moins 2 characters.",
  }),

  quantitee: z.number({
    coerce:true,
    required_error: "Veuillez saisir une quantitee.",
    message:"Veuillez saisir un nombre"
  })
  .int({
      message:"La quantitee doit etre un nombre propre"
    })
  .positive({
    message: "La quantitee doit etre positive",
  }),
  unite: z.string({
    required_error: "Veuillez saisir une unite.",
  }),
  fournisseurId: z.string({
    required_error:"Veuillez specifier un fournisseur"
  })
});

export default function AjouterMatiereForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      quantitee: 0,
      unite: "",
      fournisseurId:""
    },
  });
  const [fournisseurList,setFournisseurList] = React.useState<Fournisseur[]>();
  React.useEffect(() => {
    const fetchFournisseurs = async() =>{
      getFrounisseurs().then((fournisseurs)=>{
          setFournisseurList(fournisseurs);
      })
    }
    fetchFournisseurs();
  }, []);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const response = await ajouterMatiere({
        nom: values.nom,
        quantitee: values.quantitee,
        unite: values.unite,
      },
      values.fournisseurId
    );
  
      console.log(response);
      if (response && typeof response === 'object' && response.success) {
        toast({
          title: "Succès",
          description: "Matiere ajouté avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: response?.error || "Erreur lors de l'ajout du matiere",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de l'ajout du matiere",
      });
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4 mx-9">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Libelle Matiere</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantitee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantitee Matiere</FormLabel>
                  <FormControl>
                    <Input {...field} type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fournisseurId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fournisseur</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectioner un fournisseur" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fournisseurList?.map((fournisseur)=>
                          <SelectItem key={fournisseur.id} value={fournisseur.id.toString()}>{fournisseur.nom}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unite matiere</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectioner une unite" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Kg">Kg</SelectItem>
                        <SelectItem value="l">l (litre)</SelectItem>
                        <SelectItem value="m2">m2</SelectItem>
                        <SelectItem value="m">m</SelectItem>

                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end mt-12 px-12">
            <Button type="submit" className="w-auto justify-end">
              Ajouter matiere
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
