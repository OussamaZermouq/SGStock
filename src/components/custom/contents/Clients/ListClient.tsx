import { Client, columns } from "./ClientData/Client"
import { DataTable } from "./ClientData/DataTable"
import { getClients } from "@/actions/actions"

export default async function ListClient() {
  const data = await getClients()
  return (
    <div>
      {data ? <DataTable columns={columns} data={data}  />:
      <h3>Erreur lors de chargement de la liste des clients</h3>
      }
    </div>
  )
}

