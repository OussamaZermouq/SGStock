import { Commande, columns } from "./CommandeData/Commande";
import { DataTable } from "@/common/DataTable";
import { getCommandes, getProduits } from "@/actions/actions";
import { CommandeCard } from "./CommandeCard";

export default async function ListCommande() {
  const data = await getCommandes();
  return (
    <div>
      <div className="flex flex-row justify-between space-x-5">
        <CommandeCard
          type="Annule"
          commandeCount={
            data.filter(function (item) {
              return item.status.toString() === "Annule";
            }).length
          }
          color="from-red-100"
        />
        <CommandeCard
          type="EnAttenteConfirmation"
          commandeCount={
            data.filter(function (item) {
              return item.status.toString() === "EnAttenteConfirmation";
            }).length
          }
          color="from-orange-100"
        />
        <CommandeCard
          type="EnLivraison"
          commandeCount={
            data.filter(function (item) {
              return item.status.toString() === "EnLivraison";
            }).length
          }
          color="from-yellow-100"
        />
        <CommandeCard
          type="Complet"
          commandeCount={
            data.filter(function (item) {
              return item.status.toString() === "Complet";
            }).length
          }
          color="from-teal-100"
        />
      </div>
      <div className="shadow-lg rounded-lg p-5">
        {data ? (
          <DataTable
            columns={columns}
            data={data}
            buttonTitle="Ajouter Commande"
          />
        ) : (
          <h3>Erreur lors de chargement de la liste des commandes</h3>
        )}
      </div>
    </div>
  );
}
