import { getCategories } from "@/actions/actions"
import { columns } from "./CategoryData/Category"
import { DataTable } from "@/common/DataTable";
export default async function ListCategories() {
    const data = await getCategories();
    return (
      <div>
        <DataTable columns={columns} data={data} buttonTitle='Ajouter categorie' />
      </div>
    )
  }
  
  