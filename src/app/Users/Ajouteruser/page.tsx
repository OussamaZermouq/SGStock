import * as React from "react";
import SideNavBar from "@/components/custom/SideNavBar";
import Header from "@/custom/Header";
import { Separator } from "@/components/ui/separator";
import ListUsers from "@/components/custom/contents/Users/ListUsers";
import { auth } from "../../../../auth";
import { Button } from "@/components/ui/button";
import AjouterUserForm from "@/components/custom/contents/Users/AjouterUserForm";

export default async function Home() {
  const session = await auth();
  return (
    <section className="p-4 m-10 overflow-auto">
      <div className="col-span-3">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
          Ajouter un utilisateur
        </h3>
        <div>
          {session?.user.role === "ADMIN" ? (
            <AjouterUserForm />
          ) : (
            <div>
              <p className="text-lg font-bold">
                Vous n`&apos;`avez pas l`&apos;`autorisation de voir cette page
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
