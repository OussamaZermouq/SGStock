import { Produit, columns } from "./ProduitData/Produit"
import { DataTable } from "@/common/DataTable"
import { getProduits } from "@/actions/actions"

export default async function ListProduit() {
  const data = await getProduits()
  return (
    <div>
      {data ? <DataTable columns={columns} data={data} buttonTitle="Ajouter Produit" />:
      <h3>Erreur lors de chargement de la liste des produits</h3>
      }
    </div>
  )
}

