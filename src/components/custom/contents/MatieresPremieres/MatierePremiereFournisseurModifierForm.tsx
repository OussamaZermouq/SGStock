"use client";
import {
    deleteFournisseurMatiere,
    modifierQuantiteMatiereFour,
} from "@/actions/actions";
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
import { Label } from "@/components/ui/label";
import { PopoverContent } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function MatierePremiereFournisseurModifierForm(props: any) {
    const { toast } = useToast();
    const formSchema = z.object({
        quantitee: z.number({
            coerce: true,
            required_error: "Veuillez saisir une quantitee.",
            message: "Veuillez saisir un nombre",
        }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantitee: props.row.quantitee,
        },
    });
    async function onDeleteClick() {
        try {
            const resp = await deleteFournisseurMatiere(
                props.row.matierePremiereId,
                props.row.fournisseurId
            );
            if (resp.success) {
                window.location.reload();
                toast({
                    title: "Succès",
                    description: "Matiere modifié avec succès",
                });
            } else {
                console.log(resp.message);
            }
        } catch (error) {}
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const fournisseurId = props.row.fournisseurId;
        const matiereId = props.row.matierePremiereId;
        const resp = await modifierQuantiteMatiereFour(
            values,
            fournisseurId,
            matiereId
        );
        if (resp.success) {
            toast({
                title: "Succès",
                description: "Fournisseur supprimé avec succès",
            });
            console.log(resp.message)
        } else {
            console.log(resp.message);
        }
    }
    return (
        <PopoverContent className="w-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                                Modifier
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Modifier la quantité commandée par le
                                fournisseur
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-1 items-center gap-4">
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
                        <Button variant={"destructive"} onClick={onDeleteClick}>
                            Supprimer Fournisseur
                        </Button>
                        <Button
                            variant={"outline"}
                            type="submit"
                            className="w-auto justify-end"
                        >
                            Modifier quantitee
                        </Button>
                    </div>
                </form>
            </Form>
        </PopoverContent>
    );
}
