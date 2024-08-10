import * as React from "react";
import Dashboard from "@/components/custom/contents/DashBoard";
import SideNavBar from "@/components/custom/SideNavBar";
import Header from "@/custom/Header";
import AjouterCategorieForm from "@/custom/contents/Categories/AjouterCategorieForm"
import { Separator } from "@/components/ui/separator";
import AjouterFournisseurForm from "@/components/custom/contents/Fournisseurs/ajouterFournisseurForm";

export default async function Home() {
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
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
            Ajouter Fournisseur
          </h3>
          <AjouterFournisseurForm />
        </section>
      </div>
    </main>
  );
}

