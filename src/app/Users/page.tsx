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
  const session = await auth();
  return (
    <section className="p-4 m-10 overflow-auto">
      <div className="col-span-3 ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
          <div className="flex flex-row gap-5 items-center">
            Liste des Utilisateurs
          </div>
        </h3>
        <div>
          {session?.user.role === "ADMIN" ? (
            <ListUsers />
          ) : (
            <div>
              <p className="text-lg font-bold">
                Vous n'avez pas l'autorisation de voir cette page{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
