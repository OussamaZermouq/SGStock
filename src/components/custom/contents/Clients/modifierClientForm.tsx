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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useRouter } from "next/navigation";

const phoneRegex = new RegExp(/^([+]?[s0-9]+)([ ])?(d{3}|[0-9]+)([s]?[0-9])+$/);
const formSchema = z.object({
  clientName: z.string().min(2, {
    message: "Le nom du client doit avoir au moins 2 characters.",
  }),
  clientPrenom: z.string().min(2, {
    message: "Le prenom du client doit avoir au moins 2 characters.",
  }),
  clientTel: z
    .string()
    .regex(phoneRegex, {
      message: "Le numero de telephone doit etre valide.",
    })
    .min(10, {
      message: "Le telephone doit avoir au moins 10 chiffres.",
    }),
  typeClient: z.string({
    required_error: "Veuillez choisir un type.",
  }),
  clientadr: z.string({
    required_error: "Veuillez saisir une adresse.",
  }),
  clientemail: z.string().email({
    message: "Veuillez saisir un email valide.",
  }),
  societe: z.string({
    required_error: "Veuillez saisir une societe.",
  }),
});

export default function ModifierClientForm() {
  const router =useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientPrenom: "",
      clientTel: "",
      clientadr: "",
      clientemail: "",
      societe:"",
      typeClient: "",
    },
  });
  console.log(router.query)
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex flex-col">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4 mx-9">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Nom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientPrenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Prenom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="societe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la societe</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientTel"
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
            name="clientadr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client adresse</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientemail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeClient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Le Type du client.</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Choisir le type du client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type client</SelectLabel>
                      <SelectItem value="Morale">Morale</SelectItem>
                      <SelectItem value="Physique">Physique</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

        </div>
      </form>
    </Form>
    <div className="flex justify-end mt-12 px-12">

    <Button type="submit" className="w-32 justify-end">
            Modifier client
          </Button>
          </div>
    </div>
  );
}
