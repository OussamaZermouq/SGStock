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
import { ajouterClientCommune } from "@/actions/actions";
const phoneRegex = new RegExp(/^([+]?[s0-9]+)([ ])?(d{3}|[0-9]+)([s]?[0-9])+$/);
const formSchema = z.object({
  communeNom: z.string().min(2, {
    message: "Le nom du commune doit avoir au moins 2 characters.",
  }),
  communeTel: z
    .string()
    .regex(phoneRegex, {
      message: "Le numero de telephone doit etre valide.",
    })
    .min(10, {
      message: "Le telephone doit avoir au moins 10 chiffres.",
    }),

    communeAdr: z.string({
    required_error: "Veuillez saisir une adresse.",
  }),
  communeEmail: z.string().email({
    message: "Veuillez saisir un email valide.",
  }),
  communeCity: z.string({
    required_error: "Veuillez saisir une ville.",
  }),
});

export default function AjouterClientForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communeNom: "",
      communeTel: "",
      communeAdr: "",
      communeEmail: "",
      communeCity: "",
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await ajouterClientCommune(values);
      console.log(response);
      if (response.success) {
        
        toast({
          title: "Succès",
          description: "Client ajouté avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: response.error || "Erreur lors de l'ajout du client",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de l'ajout du client",
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
              name="communeNom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom Commune</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="communeTel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Telephone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="communeAdr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse commune</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="communeEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commune email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="communeCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commune ville</FormLabel>
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
              Ajouter client
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
