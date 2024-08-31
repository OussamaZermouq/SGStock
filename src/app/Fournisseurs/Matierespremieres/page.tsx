import * as React from "react";
import SideNavBar from "@/components/custom/SideNavBar";
import Header from "@/custom/Header";
import { Separator } from "@/components/ui/separator";
import ListMatieresPremieres from "@/components/custom/contents/MatieresPremieres/ListMatierePremieres";

export default async function Home() {
  return (
    <section className="p-4 m-10 overflow-auto">
      <div className="col-span-3">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
          Liste des Matieres Premieres
        </h3>
        <ListMatieresPremieres />
      </div>
    </section>
  );
}
