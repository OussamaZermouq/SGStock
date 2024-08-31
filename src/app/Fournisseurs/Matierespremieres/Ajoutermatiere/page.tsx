import * as React from "react";
import SideNavBar from "@/components/custom/SideNavBar";
import Header from "@/custom/Header";
import { Separator } from "@/components/ui/separator";
import ListMatieresPremieres from "@/components/custom/contents/MatieresPremieres/ListMatierePremieres";
import AjouterMatiereForm from "@/components/custom/contents/MatieresPremieres/ajouterMatiereForm";

export default async function Home() {
  return (
    <section className="p-4 m-10 overflow-auto">
      <div className="col-span-3">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
          Ajouter Matiere Premiere
        </h3>
        <AjouterMatiereForm />
      </div>
    </section>
  );
}
