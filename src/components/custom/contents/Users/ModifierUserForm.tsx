"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
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
import { useState, useEffect } from "react";
import { Plus, User as UserIcon } from "lucide-react";
import { getUserById, updateUser } from "@/actions/actions";
import { toast, useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CldImage, CldUploadWidget } from "next-cloudinary";

// Define your schema with conditional validation for password fields
const formSchema = z
  .object({
    nom: z.string().min(1, {
      message: "Veuillez specifier un nom.",
    }),
    email: z.string().email({
      message: "Veuillez saisir un email valide.",
    }),
    role: z.string({
      message: "Veuillez specifier un role.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères.",
      })
      .optional(),
    passwordMatch: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordMatch, {
    path: ["passwordMatch"],
    message: "Les mots de passe ne correspondent pas.",
  });

export default function ModifierUserForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [image, setImage] = useState<string | null>();
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [changePasswordSwitch, setChangePasswordSwitch] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const switchState = useWatch({
    control: form.control,
    name: "changePasswordSwitch",
  });

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserById(params.id);
      if (userData) {
        setUser(userData);
        setImage(userData.image);
        form.reset({
          nom: userData.name || "",
          email: userData.email || "",
          role: userData.role || "",
        });
        setLoading(false);
      }
    }
    if (params?.id) {
      fetchData();
    } else {
      router.push("/Users");
    }
  }, [params?.id, form, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let formData
    const userId = {id:params?.id}
    try {
      formData = {
        ...values,
        image,
        userId,
      };
      if (!changePasswordSwitch) {
        delete formData.password;
        delete formData.passwordMatch;
      }
      
      if (changePasswordSwitch && !!!formData.password) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Veuillez specifier un mot de passe",
        });
        return;
      }
      console.log(formData)
      const response = await updateUser(formData);
      if (response.success) {
        toast({
          title: "Sucess",
          description: "L'utilisateur a été modifié avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            response.message || "Erreur lors de la modification de l'utilisateur",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de la modification de l'utilisateur",
      });
    }
  };

  return (
    <div>
      {!user ? (
        <div className="grid grid-cols-3 gap-4 place-items-center">
          {/* Skeleton Loader Code */}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-4 gap-4">
              <div className="justify-self-center ">
                {image ? (
                  <CldImage
                    className="rounded-xl shadow-lg"
                    src={image}
                    width={250}
                    height={250}
                    alt={"user-image"}
                  />
                ) : (
                  <UserIcon size={250} />
                )}
              </div>
              <div className="grid grid-cols-2 col-span-3 gap-4 mx-9">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom Complet</FormLabel>
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input autoComplete="false" {...field} />
                      </FormControl>
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
                        onSubmit=""
                        className="w-fit my-2 place-self-end justify-self-center"
                        onClick={handleOnClick}
                      >
                        <Plus size={20} /> Ajouter une photo de profile
                        (Optionnel)
                      </Button>
                    );
                  }}
                </CldUploadWidget>
                <Separator
                  orientation="horizontal"
                  className="col-span-2 m-5"
                />
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="changePasswordSwitch"
                    render={() => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="change-password-switch"
                            checked={changePasswordSwitch}
                            onCheckedChange={setChangePasswordSwitch}
                          />
                          <Label htmlFor="change-password-switch">
                            Changer le mot de passe
                          </Label>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de Passe</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={!changePasswordSwitch}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordMatch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={!changePasswordSwitch}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end col-span-2 mt-12 px-12">
                  <Button type="submit" className="w-fit justify-end">
                    Modifier Utilisateur
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
