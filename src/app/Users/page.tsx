import * as React from "react";
import SideNavBar from "@/components/custom/SideNavBar";
import Header from "@/custom/Header";
import { Separator } from "@/components/ui/separator";
import ListUsers from "@/components/custom/contents/Users/ListUsers";
import { auth } from "../../../auth";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default async function Home() {
  const session = await auth()
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
          <div className="col-span-3 ">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
              <div className="flex flex-row gap-5 items-center">
                Liste des Utilisateurs

              </div>

            </h3>
            <div>
            {session?.user.role === "ADMIN" ? <ListUsers />: 
            <div>
              <p className="text-lg font-bold">Vous n'avez pas l'autorisation de voir cette page </p>
            </div>
            }
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
