import * as React from "react";
import Dashboard from "@/components/custom/contents/DashBoard";
import SideNavBar from "@/components/custom/SideNavBar";
import Header from "@/custom/Header";
import AjouterClientForm from "@/custom/contents/Clients/ajouterClientForm";
import { Separator } from "@/components/ui/separator";
import AjouterProduitForm from "@/components/custom/contents/Produits/AjouterProduitForm";

export default async function Home() {
  return (
    <section className="p-4 m-10 overflow-auto">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
        Ajouter Produit
      </h3>
      <AjouterProduitForm />
    </section>
  );
}
