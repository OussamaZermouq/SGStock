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
import { useParams } from "next/navigation";
import { Client } from "@prisma/client";
import { getClientById } from "@/actions/actions";
import ModifierClientCommuneForm from "./modifierClientCommuneForm";
import ModifierClientSocieteForm from "./modifierClientSocieteForm";
  
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

export default function ModifierClientForm(props:any) {

  const params = useParams<{ id: string }>();
  const [client, setClient] = React.useState<Client | null>(null);
  React.useEffect(() => {
    async function fetchClient(id: number) {
        const clientdata = await getClientById(id);
        setClient(clientdata);
    }
    if (params?.id) {
      fetchClient(parseInt(params.id));
    }
  }, [params?.id]);


  return (
    <div>
      {client?.type==='Commune'&& <ModifierClientCommuneForm client={client}/>}
      {client?.type==='Societe'&& <ModifierClientSocieteForm client={client}/>}
    </div>
  );
}
