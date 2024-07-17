import { Client, columns } from "./ClientData/Client"
import { DataTable } from "./ClientData/DataTable"
import { Prisma, PrismaClient } from "@prisma/client"


async function getData(): Promise<Client[]> {
  const prisma = new PrismaClient();
  try {
    const clients = await prisma.client.findMany();
    return clients;
  } finally {
    await prisma.$disconnect();
  }
}

export default async function ListClient() {
    const data = await getData()
    return (
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    )
  }

