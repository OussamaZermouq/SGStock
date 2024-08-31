import * as React from "react";
import AjouterCommandeForm from "@/components/custom/contents/Commande/AjouterCommandeForm";

export default async function Home() {
  return (
    <section className="p-4 m-10 overflow-auto">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
        Ajouter Commande
      </h3>
      <AjouterCommandeForm />
    </section>
  );
}
