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

export default function Page() {
  return (
    <main className="h-screen grid grid-rows-[auto,1fr]">
      <header className="col-span-full">
        <div className="grid grid-cols-12 gap-4 justify-normal content-center m-2">
          <Header />
        </div>
        <Separator />
      </header>
      <div className="grid grid-cols-[auto,1fr] gap-4">
        <aside className="w-72">
          <SideNavBar />
        </aside>
        <section className="p-4 m-10 overflow-auto">
          <div className="col-span-3">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
              Modifier un client
            </h3>
            <ModifierClientForm />
          </div>
        </section>
      </div>
    </main>
  );
}
