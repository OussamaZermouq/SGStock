'use client'
import { getCommandeById } from "@/actions/actions";
import { Commande } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ModifierCommandeForm from "./ModifierCommandeForm";


export default function ModifierCommandeMiddleware(){

    const params = useParams<{ id: string }>();
    const [commande, setCommnade] = useState<Commande | null>(null);
    useEffect(() => {
      async function fetchCommande(id: number) {
        const commandeData = await getCommandeById(id);
        setCommnade(commandeData);
      }
      if (params?.id) {
        fetchCommande(parseInt(params.id));
      }
    }, [params?.id]);
    return(
        <>
        {commande && <ModifierCommandeForm commande={commande} />}
        </>
    )
  
}