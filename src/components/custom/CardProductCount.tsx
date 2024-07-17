import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import { Separator } from "../ui/separator";

export function CardProductCount() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row">
          <AppsSharpIcon className=".MuiIcon-fontSizeLarge row-span-3" />
          <div className="mx-10">
            <CardTitle className="">Produits</CardTitle>
            <div className=" text-4xl">
              31
            </div>
          </div>
        </div>
        <Separator />
        <CardFooter className="text-xs text-zinc-500" >
            Le nombre de tous les produits dans notre systeme
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
