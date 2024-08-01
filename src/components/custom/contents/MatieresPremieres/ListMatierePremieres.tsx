
import { DataTable } from "@/common/DataTable"
import { getMatieres } from "@/actions/actions"
import { columns } from "./MatieresPremieresData/MatierePremieres"

export default async function ListMatieresPremieres() {
  const data = await getMatieres()
  console.log(data[1])
  return (
    <div>
      {data ? <DataTable columns={columns} data={data} buttonTitle="Ajouter une matiere premiere" />:
      <h3>Erreur lors de chargement de la liste des matieres</h3>
      }
    </div>
  )
}

