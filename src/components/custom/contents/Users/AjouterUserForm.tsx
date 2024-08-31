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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Plus } from "lucide-react";
import { ajouterUtlisateur } from "@/actions/actions";
import { toast, useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
const bcrypt = require('bcryptjs')
const formSchema = z.object({
  nom: z.string().min(1, {
    message: "Veuillez specifier un nom.",
  }),
  email: z.string().email({
    message: "Veuillez saisir un email valide.",
  }),
  role: z.string({
    message: "Veuillez specifier un role.",
  }),

  password: z.string().min(6, {
    message: "Le mot de passe doit avoir au moins 6 characteres",
  }),
  
  passwordMatch: z.string().min(6, {
    message: "Le mot de passe doit avoir au moins 6 characteres",
  }),
});

export default function AjouterUserForm() {
  const { toast } = useToast();
  const [image, setImage] = useState(undefined);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      role: "",
      password: "",
      passwordMatch:""
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.passwordMatch){
        toast({
            title: "Erreur",
            description: "Les mots de passe ne correspondent pas",
            variant:"destructive"
        })
        return
    }
    try {
      const formData = {
        ...values,
        image,
      };
      console.log(formData)
      
      var hash = bcrypt.hashSync(formData.password);
      formData.password = hash;
      console.log(formData)
      const response = await ajouterUtlisateur(formData);
      if (response.success) {
        toast({
          title: "Sucess",
          description: "L'utilisateur a été ajouté avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            response.message || "Erreur lors de l'ajout de l'utilisateur",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de l'ajout de l'utilisateur",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4 mx-9">
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom Complet</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoComplete="false" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Veuillez choisir un role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USER">Utilisateur</SelectItem>
                    <SelectItem value="ADMIN">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <CldUploadWidget
            uploadPreset="SGStock"
            onSuccess={(result) => {
              setImage(result.info.secure_url);
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                open();
              }
              return (
                <Button
                  className="w-fit my-2 self-end justify-self-center"
                  onClick={handleOnClick}
                >
                  <Plus size={19} /> Ajouter une photo de profile (Optionnel)
                </Button>
              );
            }}
          </CldUploadWidget>
          <Separator className="col-span-2 m-10" />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de Passe </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="false"
                    type="password"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="passwordMatch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de Passe </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="false"
                    type="password"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </div>
        <div className="flex justify-end mt-12 px-12">
          <Button type="submit" className="w-fit justify-end">
            Ajouter Utlisateur
          </Button>
        </div>
      </form>
    </Form>
  );
}
