"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
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
import {
  ajouterProduit,
  getCategories,
  getMatieresDispo,
  getProduitMatiere,
  modifierProduit,
} from "@/actions/actions";
import { CldImage } from "next-cloudinary";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Edit from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import HideImage from "@mui/icons-material/HideImage";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
const formSchema = z.object({
  nomProduit: z.string().min(2, {
    message: "Le nom du produit doit avoir au moins 2 caractères.",
  }),
  codeProduit: z.string({
    required_error: "Le code du produit est requis.",
  }),
  prixProduit: z.number({
    coerce: true,
    required_error: "Le prix du produit est requis.",
  }),
  quantiteeProduit: z.number({
    coerce: true,
    required_error: "La quantité du produit est requise.",
  }),
  noteProduit: z.string({
    required_error: "La note du produit est requise.",
  }),
  categorieId: z.string({
    required_error: "La catégorie du produit est requise.",
  }),
});
const generateSchema = (data: any) => {
  const schemaShape = data.reduce((acc: any, item: any) => {
    acc[item.id] = z.boolean();
    return acc;
  }, {});
  return z.object(schemaShape);
};

export default function ModifierProduitForm(props: any) {
  const [imageShow, setImageShow] = React.useState(
    props.produit.getValue("imageProduit")
  );
  const { toast } = useToast();
  const [resource, setResource] = React.useState();
  const [imageUploaded, setImageUploaded] = React.useState(null);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [matieres, setMatieres] = React.useState<any[]>([]);
  const [matiereP, setMatiereP] = React.useState([]);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [imageDataUri, setImageDataUri] = React.useState<string | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string|undefined>(
    props.produit.getValue("imageProduit")
  );
  const [matiereUtilise, setMatiereUtilise] = React.useState<any[]>();
  const [checkboxes, setCheckboxes] = React.useState([]);
  const [checkSchema, setCheckSchema] = React.useState(z.object({}));
  const [imageError, setImageError] = React.useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomProduit: props.produit.getValue("nomProduit"),
      codeProduit: props.produit.getValue("codeProduit"),
      prixProduit: props.produit.getValue("prixProduit"),
      quantiteeProduit: props.produit.getValue("quantiteProduit"),
      noteProduit: props.produit.getValue("noteProduit"),
      categorieId: props.produit.getValue("categorieProduit"),
      check: checkboxes.reduce((acc, item) => {
        acc[item.id] = item.checked;
        return acc;
      }, {}),
    },
  });

  React.useEffect(() => {
    const fetchCategories = async () => {
      const out = await getCategories();
      const mp = await getMatieresDispo();
      const mpUtilise = await getProduitMatiere(props.produit.getValue("id"));

      setCategories(out);
      setMatieres(mp);
      setMatiereUtilise(mpUtilise);

      // Initialize the matiereP state with matiereId and quantity
      const initialMatiereP = mpUtilise.map((matiere) => ({
        id: matiere.matiereId,
        quantity: matiere.quantitee, // Assuming this comes from the API
      }));

      setMatiereP(initialMatiereP);

      // Set checkboxes and schema based on fetched data
      setCheckboxes(mp);
      setCheckSchema(generateSchema(mp));
    };

    fetchCategories();
  }, [props.produit]);

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setMatiereP([...matiereP, { id, quantity: 1 }]);
    } else {
      setMatiereP(matiereP.filter((item) => item.id !== id));
    }
  };

  const handleQuantityChange = (id: any, quantity: any) => {
    setMatiereP(
      matiereP.map((item: any) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUri(reader.result as string);
        setImageError(undefined);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileUpload = async () => {
    if (imageDataUri) {
      try {
        const response = await axios.post("/api/upload-image", {
          image: imageDataUri,
        });
        setImageUrl(response.data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setImageError("Veuillez selectionner une image");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const produitId = props.produit.getValue("id");
    const formData = {
      ...values,
      produitId,
      matiereP,
      imageUrl,
    };

    try {
      const response = await modifierProduit(formData);
      if (response.success) {
        toast({
          title: "Succès",
          description: "Produit modifié avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: response.message || "Erreur lors de la modification du Produit",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de la modification du Produit",
      });
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col">
      <Sheet>
        <SheetTrigger>{<Edit />}</SheetTrigger>
        <SheetContent side={"right"} className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Modifier ce produit</SheetTitle>
            <SheetDescription>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="relative">
                      <p className="text-sm my-3">Image Produit (Optionnel)</p>
                      <div>
                        {imageDataUri ? (
                          <CldImage
                            className="rounded-xl"
                            width="660"
                            height="300"
                            src={imageDataUri}
                            sizes="60vw"
                            alt="Image Produit"
                          />
                        ) : imageShow ? (
                          <CldImage
                            className="rounded-xl"
                            width="660"
                            height="300"
                            src={imageShow}
                            sizes="60vw"
                            alt="Image Produit"
                          />
                        ) : (
                          <HideImage className="text-9xl place-self-center w-max" />
                        )}

                        <div className="my-5 flex flex-col">
                          <Input
                            id="picture"
                            type="file"
                            title="Veuillez choisir une image"
                            onChange={handleImageChange}
                          />

                          <div className="flex my-5 justify-center">
                            <Button
                              type="button"
                              variant={"secondary"}
                              onClick={handleFileUpload}
                            >
                              Modifier Image
                            </Button>
                            <Button
                              className="mx-2"
                              variant={"destructive"}
                              onClick={() => {
                                setResource(undefined);
                                setImageShow(null);
                                setImageDataUri(null);
                                setImageUrl(undefined);
                                setImageError(undefined);
                              }}
                            >
                              Supprimer image
                            </Button>
                          </div>
                        </div>
                      </div>
                      {imageError && (
                        <p className="font-bold content-center text-red-600">
                          Veuillez choisir une image.
                        </p>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="codeProduit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code Produit</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nomProduit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom Produit</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="prixProduit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix Produit</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quantiteeProduit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantitee Produit</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="categorieId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categorie Produit</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selectioner une categorie" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories?.map((cat) => (
                                  <SelectItem
                                    key={cat.id}
                                    value={cat.id.toString()}
                                  >
                                    {cat.nom}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="noteProduit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrption Produit</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator className="col-span-2" />
                    <div className="flex flex-col space-y-5">
                      <div>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Matiere Premiere
                          </FormLabel>
                          <FormDescription>
                            Préciser les éléments utilisés pour la fabrication
                            de ce produit
                          </FormDescription>
                        </div>
                        {matieres.map((matiere) => {
                          const item = matiereP.find(
                            (item) => item.id === matiere.id
                          );
                          return (
                            <div
                              key={matiere.id}
                              className="grid grid-cols-8 gap-1 my-7 justify-center"
                            >
                              <Checkbox
                                className="self-center"
                                checked={!!item} // Check if the item exists in matiereP
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(matiere.id, checked)
                                }
                              />
                              <FormLabel className="font-semibold self-center">
                                {matiere.nom}
                              </FormLabel>
                              {item && (
                                <Input
                                  className="self-center fquantity-input col-start-5 col-end-8"
                                  type="number"
                                  value={item.quantity || ""} // Auto-fill the quantity from matiereP
                                  onChange={(e) => {
                                    const newQuantity = parseInt(
                                      e.target.value,
                                      10
                                    );
                                    handleQuantityChange(
                                      matiere.id,
                                      newQuantity
                                    );
                                  }}
                                  min="1"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button type="submit" className="grow">
                        Enregistrer les modifications <SaveIcon />
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
