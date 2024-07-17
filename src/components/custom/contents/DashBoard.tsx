import * as React from "react";
import { CardProductCount } from "../CardProductCount";
import { CardClientCount } from "../CardClientCount";
import { ProduitCategorieChart } from "../Charts/ProduitCategorieChart";
export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <CardProductCount />
      </div>
      <div>
        <CardClientCount />
      </div>
      <div>
        <CardProductCount />
      </div>
      <div className="col-span-2">
        <ProduitCategorieChart />
      </div>
      <div>
        <CardProductCount />
      </div>
    </div>
  );
}
