import { getCategories } from "@/actions/actions"
import { columns } from "./CategoryData/Category"
import { DataTable } from "./CategoryData/DataTable"
export default async function ListCategories() {
    const data = await getCategories();
    return (
      <div>
        <DataTable columns={columns} data={data}  />
      </div>
    )
  }
  
  