"use client";
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { modifierMatiere } from "@/actions/actions";
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


const formSchema = z.object({
  nom: z.string().min(2, {
    message: "Le nom de la matiere doit avoir au moins 2 characters.",
  }),
  
  unite: z.string({
    required_error: "Veuillez saisir une unite.",
  }),
  
});

export default function ModifierMatierePremiereForm(props: any) {
  
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: props.matiere.getValue('nom'),
      unite: props.matiere.getValue('unite'),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await modifierMatiere(values,props.matiere.getValue('id'));
      if (response.success) {
        window.location.reload();
        toast({
          title: "Succès",
          description: "Categorie modifié avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Erreur lors de la modfiication de la categorie",
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
            Modifier matiere
          </Button>
        </div>
      </form>
    </Form>
  </div>
  );
}
