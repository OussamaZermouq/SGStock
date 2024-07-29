"use client";
import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { useToast } from "@/components/ui/use-toast";
import { ajouterFournisseur } from "@/actions/actions";

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

export default function AjouterFournisseurForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fournisseurNom: "",
      fournisseurTel: "",
      fournisseurAdr: "",
      fournisseurEmail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        console.log(values)
      const response = await ajouterFournisseur({
        nom: values.fournisseurNom,
        telephone: values.fournisseurTel,
        adresse: values.fournisseurAdr,
        email: values.fournisseurEmail,

      });
      console.log(response);
      if (response.success) {
        toast({
          title: "Succès",
          description: "Fournisseur ajouté avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: response.error || "Erreur lors de l'ajout du Fournisseur",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de l'ajout du Fournisseur",
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
                  <FormLabel>Fournisseur Telephone</FormLabel>
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
                  <FormLabel>Adresse Fournisseur</FormLabel>
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
                  <FormLabel>Fournisseur email</FormLabel>
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
              Ajouter fournisseur
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
