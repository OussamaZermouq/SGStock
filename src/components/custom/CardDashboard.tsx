import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";
import { Separator } from "../ui/separator";
import { Bookmark, UserRound, Users } from "lucide-react";
import { LayoutGrid } from "lucide-react";
export function CardDashboard(props: { item: string; count: number }) {
  return (
    <Card className="p-5 shad">
      <CardHeader>
        <div className="flex flex-row items-center">
          {props.item === "Produits" && (
            <LayoutGrid className="rounded-sm shadow-xl" size={40} />
          )}
          {props.item === "Clients" && (
            <Users className="rounded-sm shadow-xl" size={40} />
          )}
          {props.item === "Commandes" && (
            <Bookmark className="rounded-sm shadow-xl" size={40} />
          )}
          <div className="mx-10">
            <CardTitle className="text-muted-foreground text-xl">
              {props.item}
            </CardTitle>
            <div className="text-2xl">{props.count}</div>
          </div>
        </div>
        <Separator />
        <CardFooter className="text-xs text-muted-foreground lowercase">
          Le nombre de tous les {props.item} dans notre systeme
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
