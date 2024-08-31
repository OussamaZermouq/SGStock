import * as React from "react";
import { useParams } from "next/navigation";
import { getClientById } from "@/actions/actions";
import SideNavBar from "@/components/custom/SideNavBar";
import Header from "@/custom/Header";
import { Separator } from "@/components/ui/separator";
import ModifierClientCommuneForm from "@/components/custom/contents/Clients/modifierClientCommuneForm";
import ModifierClientSocieteForm from "@/components/custom/contents/Clients/modifierClientSocieteForm";
import { Client } from "@/components/custom/contents/Clients/ClientData/Client";
import ModifierClientForm from "@/components/custom/contents/Clients/modifierClientForm";
import ModifierCommandeForm from "@/components/custom/contents/Commande/ModifierCommandeForm";
import ModifierCommandeMiddleware from "@/components/custom/contents/Commande/ModifierCommandeMiddleware";

export default function Page() {
  return (
    <section className="p-4 m-10 overflow-auto w-fit justify-self-center">
      <div className="col-span-3 ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
          Modifier une commande
        </h3>
        <ModifierCommandeMiddleware />
      </div>
    </section>
  );
}
