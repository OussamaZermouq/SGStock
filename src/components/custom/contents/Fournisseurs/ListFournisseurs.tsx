import * as React from 'react';
import { DataTable } from "@/common/DataTable"
import { columns } from './FournisseurData/Fournisseur';
import { getFrounisseurs } from '@/actions/actions';

export default async function ListFournisseurs(){
    const fournisseursData = await getFrounisseurs();
    return (
        <div>
          {fournisseursData ? <DataTable columns={columns} data={fournisseursData} buttonTitle='Ajouter Fournisseur'  />:
          <h3 className='text-red-500'>Erreur lors de chargement de la liste des fournisseur</h3>
          }
        </div>
      )

}