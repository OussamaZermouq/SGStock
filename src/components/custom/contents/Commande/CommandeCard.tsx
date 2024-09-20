import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function CommandeCard(props:{type:string, commandeCount:Number, color:string}) {
  return (
    <Card className={cn("w-[350px] shadow-xl py-5 px-3 bg-muted/40")}>
      <CardHeader>
        {props.type==="EnAttenteConfirmation" && <CardTitle>En attente de confirmation</CardTitle>}
        {props.type==="EnLivraison" && <CardTitle>En cours de livraison</CardTitle>}
        {props.type==="Complet" && <CardTitle>Complet</CardTitle>}
        {props.type==="Annule" && <CardTitle>Annule</CardTitle>}

      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-4 gap-4 w-full justify-items-end place-content-end ">
            <div className="col-start-4 font-bold text-2xl">
                {props.commandeCount.toString()}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
