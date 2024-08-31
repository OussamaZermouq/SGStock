import * as React from "react";
import SideNavBar from "@/components/custom/SideNavBar";
import Header from "@/custom/Header";
import ListClient from "@/custom/contents/Clients/ListClient";
import { Separator } from "@/components/ui/separator";
import ListProduit from "@/components/custom/contents/Produits/ListProduits";
import ListCommande from "@/components/custom/contents/Commande/ListCommande";

export default async function Home() {
  return (
    <section className="p-4 m-10 overflow-auto">
      <div className="col-span-3">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
          Liste des Commandes
        </h3>
        <ListCommande />
      </div>
    </section>
  );
}
