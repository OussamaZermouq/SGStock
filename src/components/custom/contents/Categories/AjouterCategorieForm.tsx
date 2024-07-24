"use client";
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ajouterCategorie } from "@/actions/actions";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea"
const formSchema = z.object({
  categorieNom: z.string().min(2, {
    message: "Le nom du la categorie doit avoir au moins 2 characters.",
  }),
  categorieDescription: z.string().min(2,{
    message: "Veuillez saisir un email valide.",
  }),
});

export default function AjouterCategorieForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categorieNom: "",
      categorieDescription: "",
    },
  });

  async function onSubmit(values:z.infer<typeof formSchema>){
    try {
        const response = await ajouterCategorie(values);
        if (response.success){
        toast({
            title: "Succès",
            description: "Categorie ajouté avec succès",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: response.error || "Erreur lors de l'ajout de la categorie",
          });
        }
  }
  catch (e) {
    toast({
      variant: "destructive",
      title: "Erreur",
      description: "Erreur lors de l'ajout du client",
    });
    console.error(e);
  }
    }   
return(
<div className="flex flex-col ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4 mx-9">
            <FormField
              control={form.control}
              name="categorieNom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom categorie</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>

            </div>

            <FormField
              control={form.control}
              name="categorieDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description categorie</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>
          <div className="flex justify-end mt-12 px-12">
            <Button type="submit" className="w-auto justify-end">
              Ajouter Categorie
            </Button>
          </div>
        </form>
      </Form>
    </div>
);
}



