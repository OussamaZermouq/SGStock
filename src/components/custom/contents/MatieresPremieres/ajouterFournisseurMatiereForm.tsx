"use client";
import { ajouterFournisseurMaitere, getFrounisseurs } from "@/actions/actions";
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
import { PopoverContent } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { Fournisseur } from "@prisma/client";

export default function AjouterFournisseurMatiereForm(props: any) {
    const [fournisseurDispo, setFournisseurDispo] = React.useState<
        Fournisseur[]
    >([]);

    React.useEffect(() => {
        async function fetchFournisseur() {
            try {
                const fournisseurs = await getFrounisseurs(
                    props.row.getValue("id")
                );
                setFournisseurDispo(fournisseurs || []);
            } catch (error) {
                console.error("Failed to fetch fournisseurs", error);
            }
        }
        fetchFournisseur();
    }, [props.row]);

    const { toast } = useToast();

    const formSchema = z.object({
        fournisseurId: z.string({
            required_error: "Veuillez specifier un fournisseur",
        }),
        quantitee: z
            .number({
                coerce: true,
                required_error: "Veuillez saisir une quantitee.",
            })
            .min(1, "Veuillez saisir une quantitee positive."),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantitee: 0,
            fournisseurId: "",
        },
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        try {
            const resp = await ajouterFournisseurMaitere(values,props.row.getValue('id'));
            if (resp.success) {
                window.location.reload();
                toast({
                    title: "Succès",
                    description: "Matiere modifié avec succès",
                });
            } else {
                console.log(resp.message);
            }
        } catch (error) {
            console.error("Failed to add fournisseur", error);
        }
    }

    return (
        <PopoverContent className="w-180">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                                Ajouter
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Ajouter un fournisseur à cette matière
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="fournisseurId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fournisseur</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Fournisseur" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {fournisseurDispo.map(
                                                            (f) => (
                                                                <SelectItem
                                                                    key={f.id}
                                                                    value={f.id.toString()}
                                                                >
                                                                    {f.nom}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4 w-36">
                                <FormField
                                    control={form.control}
                                    name="quantitee"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantitee</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-5">
                        <Button
                            variant={"outline"}
                            type="submit"
                            className="w-auto justify-end"
                        >
                            Ajouter fournisseur
                        </Button>
                    </div>
                </form>
            </Form>
        </PopoverContent>
    );
}
