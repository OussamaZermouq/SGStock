"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateClientSociete } from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";

const phoneRegex = new RegExp(/^([+]?[s0-9]+)([ ])?(d{3}|[0-9]+)([s]?[0-9])+$/);
const formSchema = z.object({
  nom: z.string().min(2, {
    message: "Le nom de la societe doit avoir au moins 2 caractères.",
  }),
  telephone: z
    .string()
    .regex(phoneRegex, {
      message: "Le numéro de téléphone doit être valide.",
    })
    .min(10, {
      message: "Le téléphone doit avoir au moins 10 chiffres.",
    }),
  adresse: z.string().min(5, {
    message: "L'adresse doit avoir au moins 5 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez saisir un email valide.",
  }),
  ICE: z.string({
    message: "Veuillez saisir un ICE valide.",
  }),
  webSite: z.string().optional(),
});

export default function ModifierClientSocieteForm(props: any) {
  const { toast } = useToast();
  const { client } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: client.nom,
      telephone: client.telephone,
      adresse: client.adresse,
      email: client.email,
      ICE: client.ICE,
      webSite: client.webSite,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await updateClientSociete(client.id, values);
      console.log(response);
      if (response.success) {
        toast({
          title: "Succès",
          description: "Client modifié avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: response.error || "Erreur lors de la modification du client",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de la modification du client",
      });
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4 mx-9">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom Societe</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Societe Téléphone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Societe Adresse</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Societe Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ICE"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ICE de la societe</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="webSite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site web de la societe</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end mt-12 px-12">
            <Button type="submit" className="w-32 justify-end">
              Modifier client
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
