"use client";
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ajouterCategorie, modifierCategorie, modifierFournisseur } from "@/actions/actions";
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


const phoneRegex = new RegExp(/^([+]?[s0-9]+)([ ])?(d{3}|[0-9]+)([s]?[0-9])+$/);
const formSchema = z.object({
  fournisseurNom: z.string().min(2, {
    message: "Le nom du commune doit avoir au moins 2 characters.",
  }),
  fournisseurTel: z
    .string()
    .regex(phoneRegex, {
      message: "Le numero de telephone doit etre valide.",
    })
    .min(10, {
      message: "Le telephone doit avoir au moins 10 chiffres.",
    }),

  fournisseurAdr: z.string({
    required_error: "Veuillez saisir une adresse.",
  }),
  fournisseurEmail: z.string().email({
    message: "Veuillez saisir un email valide.",
  }),
});


export default function ModifierFournisseurForm(props: any) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fournisseurNom: props.fournisseur.getValue('nom'),
      fournisseurTel: props.fournisseur.getValue('telephone'),
      fournisseurAdr: props.fournisseur.getValue('adresse'),
      fournisseurEmail: props.fournisseur.getValue('email'),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const response = await modifierFournisseur(props.fournisseur.getValue('id'),values);
      if (response.success) {
        toast({
          title: "Succès",
          description: "Fournisseur modifié avec succès",
        });
        window.location.reload();
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            response.error || "Erreur lors de la modfiication du Fournisseur",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de la modification du Fournisseur",
      });
      console.error(e);
    }
  }
  return (
    <div className="flex flex-col ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4 mx-9 m-10">
            <FormField
              control={form.control}
              name="fournisseurNom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom Fournisseur</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fournisseurTel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fournisseur telephone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fournisseurEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fournisseur Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fournisseurAdr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fournisseur adresse</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end mt-12 px-12">
            <Button type="submit" className="w-auto justify-end">
              Modifier Fournisseur
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
