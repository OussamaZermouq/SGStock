import * as React from "react";
import SideNavBar from "@/components/custom/SideNavBar";
import Header from "@/custom/Header";
import ListClient from "@/custom/contents/Clients/ListClient";
import { Separator } from "@/components/ui/separator";
import DeleteDialog from "@/components/custom/DeleteDialog";
// const prisma = new PrismaClient();

// async function insertClient() {
//   await prisma.client.create({
//     data: {
//       name: "Test",
//       email: "22222@test.com",
//       telephone: 222222,
//     },
//   });
// }

// async function getClients() {
//   const clients = await prisma.client.findMany();
//   return clients;
// }

export default async function Home() {
  // const clients = await getClients();
  // console.table(clients);
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
              Liste des Clients
            </h3>
            <ListClient />
          </div>
        </section>
      </div>
    </main>
  );
}
